# Syancy Innovations-website

A full-stack data science consultancy website built with **Next.js 15**, **Prisma**, **PostgreSQL**, and **NextAuth.js**. Features a public-facing marketing site, blog, careers portal, and a full admin panel with analytics.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | NextAuth.js (Credentials + JWT) |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion, AOS |
| Charts | Chart.js (react-chartjs-2) |
| File Uploads | UploadThing |
| Validation | Zod |
| Toasts | Sonner |

---

## Features Overview

### Public Pages

#### Homepage (`/`)
- Animated hero section with rotating text phrases (Framer Motion)
- Stats section with animated count-up numbers triggered on scroll
- Services accordion showcasing 10 data science categories
- Tech stack logo cloud (Python, R, Tableau, Power BI, Java)
- FAQ section with 6 real data-science Q&As and a "Submit Your Question" form
- CTA section with contact info

#### About (`/about`)
- Animated grid layout with images and stat cards
- Client count and project delivery metrics
- Company journey narrative

#### Services (`/services`)
- Overview page with 6 service cards and scroll animations
- 5 detailed sub-pages, each with features list and CTA:
  - `/services/data-engineering` — ETL, pipelines, cloud infrastructure
  - `/services/data-crunching` — Data cleaning, normalization, batch processing
  - `/services/data-analysis` — EDA, dashboards, A/B testing
  - `/services/data-science` — ML, NLP, computer vision, MLOps
  - `/services/data-mining` — Pattern recognition, clustering, text mining

#### Solutions (`/solutions`)
- Industry solutions fetched from database
- 5 detail pages with static fallback data (works even if DB is empty):
  - Healthcare, Finance, Retail & E-Commerce, Manufacturing, Energy
- Each shows overview, key capabilities, and contact CTA

#### Blog (`/blog`)
- Blog listing with category filtering, search (debounced), and pagination
- Blog detail page (`/blog/[slug]`) with custom Markdown renderer supporting:
  - Headings (h2, h3) with anchor IDs
  - **Markdown tables** with column alignment
  - Bold, italic, inline code, links
  - Bullet lists
  - Floating table of contents with active heading tracking (IntersectionObserver)

#### Careers (`/careers`)
- Job listings filterable by type (Full Time, Part Time, Contract, Internship)
- Job detail pages with Markdown-rendered descriptions
- Application form with:
  - Personal info (name, email, phone)
  - Education level + institution
  - Experience and LinkedIn URL
  - Cover letter
  - **Resume upload** (PDF via UploadThing, 4MB max)
- Duplicate application prevention (one per user per job)
- Auth-gated — redirects to login if not signed in

#### Case Studies (`/case-studies`)
- Static showcase of 3 case studies (e-commerce, supply chain, healthcare)
- Metric cards with icons and results

#### Contact (`/contact`)
- Contact form with fields: name, email, company size, industry, service interest, timeline, message
- CEO photo and quote section
- Submissions stored in DB with admin notification

#### FAQ Submission
- Users can submit questions from the homepage FAQ section
- Optional email field for follow-up
- Submissions create admin notifications

---

### Authentication System

| Feature | Details |
|---|---|
| Provider | Email/password (Credentials) |
| Sessions | JWT-based |
| Password hashing | bcryptjs |
| Roles | `ADMIN`, `APPLICANT` |
| Validation | Zod schemas |
| Login | Role-based redirect (Admin → `/admin`, User → `/dashboard`) |
| Registration | Auto-login after signup |
| Session sync | JWT callback re-fetches user data from DB |

#### Route Protection (`middleware.ts`)
- `/admin/*` — requires `ADMIN` role
- `/dashboard/*` — requires any authenticated user
- Non-admin users accessing `/admin` are redirected to `/dashboard`

---

### User Dashboard (`/dashboard`)

- Personalized greeting with user's name
- Stats cards: Total Applied, Under Review, Shortlisted, Selected
- List of submitted job applications with status badges and job links
- **Profile page** (`/dashboard/profile`):
  - Edit display name
  - Avatar upload via file picker (JPEG/PNG/WebP/GIF, 2MB max)
  - **Camera capture** — opens webcam for selfie-style photo upload
  - Remove avatar option
  - Session auto-refresh after save

---

### Admin Panel (`/admin`)

Full admin panel with sidebar navigation, dark mode support, and notification system.

#### Analytics Dashboard
- Overview stats: Users, Jobs, Applications, Blogs, Categories
- **Chart.js visualizations**:
  - Multi-line chart (Applications, Users, Blogs over time)
  - Pie chart (Applications by status)
  - Bar chart (Jobs by type)
  - Pie chart (Blogs by category)
- Configurable time period: 7 days, 30 days, 3/6/12 months, all time, custom range
- Per-job application filtering
- Recent applications table and top jobs list

#### Jobs Management
- Full CRUD for job listings
- Markdown-supported descriptions
- Skills tags, job type selector, active/inactive toggle

#### Applications Management
- Searchable, filterable table of all applications
- Inline status updates: `APPLIED` → `UNDER_REVIEW` → `SHORTLISTED` → `SELECTED` / `REJECTED`
- Expandable rows with full applicant details
- **Excel export** (`.xlsx`) of filtered applications

#### Blog Management
- Full CRUD for blog posts
- Category assignment, DRAFT/PUBLISHED status toggle
- Featured image URL with preview
- Markdown content editor
- SEO fields (meta title, meta description)

#### Categories
- Inline create and delete for blog categories
- Auto-generated slugs

#### Solutions Management
- Full CRUD for industry solutions
- Icon selection, features array editor
- Sort ordering and active/inactive toggle

#### Contacts
- View all contact form submissions
- Status management: `NEW` → `READ` → `RESPONDED`
- Expandable message view
- Delete submissions

#### FAQ Questions
- View all user-submitted questions
- Status management: `NEW` → `READ` → `ANSWERED`
- **Answer dialog** — write and save admin answers
- Delete questions

#### Notification System
- Bell icon in admin header with unread count badge
- Polls for new notifications every 30 seconds
- Notification types: New Application, New Contact, New FAQ Question
- Mark individual or all notifications as read
- Click-through links to relevant admin pages

---

## Database Models

| Model | Purpose |
|---|---|
| `User` | Accounts with role-based access (ADMIN / APPLICANT) |
| `Job` | Job listings with slug, description, skills, type, salary |
| `Application` | Job applications linked to User and Job (unique per user-job pair) |
| `Blog` | Blog posts with Markdown content, SEO fields, category, author |
| `Category` | Blog categories with unique name and slug |
| `Solution` | Industry solutions with features array and ordering |
| `ContactSubmission` | Contact form entries with status tracking |
| `FaqQuestion` | User-submitted questions with admin answer support |
| `Notification` | Admin notifications for applications, contacts, FAQ questions |

---

## API Endpoints

### Public
| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handlers |
| POST | `/api/auth/register` | User registration |
| GET | `/api/blogs` | List published blogs (paginated, filterable) |
| GET | `/api/blogs/[slug]` | Get blog by slug |
| GET | `/api/categories` | List categories with blog count |
| GET | `/api/jobs` | List active jobs |
| GET | `/api/jobs/[slug]` | Get job by slug |
| GET | `/api/solutions` | List active solutions |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/faq-questions` | Submit FAQ question |

### Authenticated
| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | `/api/applications` | User's applications / Apply to job |
| GET | `/api/applications/check` | Check if already applied |
| GET/PATCH | `/api/profile` | Get/update user profile |
| POST | `/api/upload` | Upload resume PDF (4MB max) |
| POST | `/api/upload/avatar` | Upload avatar image (2MB max) |

### Admin Only
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/analytics` | Dashboard analytics data |
| GET/POST | `/api/admin/jobs` | List/create jobs |
| GET/PATCH/DELETE | `/api/admin/jobs/[id]` | Manage individual job |
| GET/POST | `/api/admin/blogs` | List/create blogs |
| GET/PATCH/DELETE | `/api/admin/blogs/[id]` | Manage individual blog |
| GET | `/api/admin/applications` | List all applications |
| PATCH | `/api/admin/applications/[id]` | Update application status |
| GET/POST | `/api/admin/categories` | List/create categories |
| DELETE | `/api/admin/categories/[id]` | Delete category |
| GET/POST | `/api/admin/solutions` | List/create solutions |
| GET/PATCH/DELETE | `/api/admin/solutions/[id]` | Manage individual solution |
| GET | `/api/admin/contacts` | List contact submissions |
| PATCH/DELETE | `/api/admin/contacts/[id]` | Update/delete contact |
| GET | `/api/admin/faq-questions` | List FAQ questions |
| PATCH/DELETE | `/api/admin/faq-questions/[id]` | Update/delete FAQ question |
| GET | `/api/admin/notifications` | List notifications |
| PATCH | `/api/admin/notifications/[id]` | Mark notification as read |
| POST | `/api/admin/notifications/read-all` | Mark all as read |

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) serverless Postgres)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Data-Science-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL, NEXTAUTH_SECRET, UPLOADTHING_SECRET, etc.

# Push database schema
npm run db:push

# Seed the database (optional)
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for JWT signing |
| `NEXTAUTH_URL` | Base URL of the app |
| `UPLOADTHING_SECRET` | UploadThing API secret |
| `UPLOADTHING_APP_ID` | UploadThing app ID |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

---

## Project Structure

```
app/
├── page.tsx                    # Homepage
├── about/                      # About page
├── services/                   # Services overview + 5 sub-pages
├── solutions/                  # Solutions listing + [slug] detail
├── blog/                       # Blog listing + [slug] detail
├── careers/                    # Job listings + [slug] detail + apply
├── case-studies/               # Static case studies
├── contact/                    # Contact form
├── auth/                       # Login + Register
├── dashboard/                  # User dashboard + profile
├── admin/                      # Admin panel (8 sections)
└── api/                        # 34+ API routes

components/
├── navigation.tsx              # Main nav with mega-menus
├── hero-section.tsx            # Animated hero
├── services-section.tsx        # Services accordion
├── faq.tsx                     # FAQ + question submission
├── stats.tsx                   # Animated counter stats
├── footer.tsx                  # Site footer
├── site-shell.tsx              # Conditional nav/footer wrapper
├── admin/                      # Admin sidebar, header, notification bell
└── ui/                         # shadcn/ui components

prisma/
├── schema.prisma               # Database schema (9 models)
└── seed.ts                     # Database seeder

lib/
├── auth.ts                     # NextAuth config + helpers
├── prisma.ts                   # Prisma client singleton
├── utils.ts                    # Utility functions
└── validations/                # Zod schemas
```

---

## Key Technical Highlights

- **Custom Markdown Renderer** — Blog posts render tables, headings, bold/italic, code, links without external Markdown libraries
- **Camera API Integration** — Profile page supports webcam selfie capture for avatar
- **Excel Export** — Admin can export job applications to `.xlsx` spreadsheets
- **Real-time Notifications** — Admin notification bell polls every 30s for new submissions
- **Fallback Static Data** — Solution detail pages work even when the database is empty
- **Animated Count-Up** — Stats use `requestAnimationFrame` with eased curves
- **Role-Based Middleware** — JWT-based route protection at the middleware level
- **Dark Mode** — Full dark mode support via `next-themes` across admin panel