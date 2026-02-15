"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const technologies = [
  {
    slug: "python",
    name: "Python",
    category: "Language",
    image: "/techstack/python.svg",
    description:
      "The leading language for data science, machine learning, and AI. We use Python's rich ecosystem — Pandas, NumPy, Scikit-learn, and more — to build end-to-end data solutions.",
    tags: ["Data Science", "ML/AI", "Automation"],
  },
  {
    slug: "r",
    name: "R",
    category: "Language",
    image: "/techstack/R.svg",
    description:
      "A powerful language for statistical computing, data analysis, and visualization. Ideal for advanced research-grade analytics and scientific modeling.",
    tags: ["Statistics", "Visualization", "Research"],
  },
  {
    slug: "aws",
    name: "Amazon Web Services",
    category: "Cloud Platform",
    image: null,
    description:
      "Cloud-native data solutions built on AWS — S3, Redshift, SageMaker, Glue, and more — to scale your data infrastructure with reliability and speed.",
    tags: ["Cloud", "Infrastructure", "Scalability"],
  },
  {
    slug: "azure",
    name: "Microsoft Azure",
    category: "Cloud Platform",
    image: null,
    description:
      "Enterprise-grade analytics and AI powered by Azure Synapse, Databricks, Azure ML, and Cognitive Services for intelligent business solutions.",
    tags: ["Enterprise", "AI/ML", "Analytics"],
  },
  {
    slug: "power-bi",
    name: "Power BI",
    category: "Visualization",
    image: "/techstack/powerbi.svg",
    description:
      "Interactive dashboards and self-service business intelligence. We create compelling Power BI reports that turn complex data into clear, actionable insights.",
    tags: ["Dashboards", "Reporting", "BI"],
  },
  {
    slug: "tableau",
    name: "Tableau",
    category: "Visualization",
    image: "/techstack/tableau.svg",
    description:
      "Advanced data visualization and storytelling. Our Tableau experts build beautiful, interactive visual analytics that drive better decisions.",
    tags: ["Visualization", "Storytelling", "Analytics"],
  },
  {
    slug: "spark",
    name: "Apache Spark",
    category: "Big Data",
    image: null,
    description:
      "Distributed computing for massive-scale data processing. We leverage Spark for real-time streaming, ETL, and large-scale ML workloads.",
    tags: ["Big Data", "Streaming", "ETL"],
  },
  {
    slug: "tensorflow",
    name: "TensorFlow",
    category: "AI/ML Framework",
    image: null,
    description:
      "Google's open-source deep learning framework. We use TensorFlow and Keras to develop, train, and deploy neural networks for production AI systems.",
    tags: ["Deep Learning", "Neural Networks", "Production AI"],
  },
  {
    slug: "java",
    name: "Java",
    category: "Language",
    image: "/techstack/java.svg",
    description:
      "Enterprise-grade applications and big data systems. We use Java for building robust, high-performance data pipelines and distributed systems.",
    tags: ["Enterprise", "Big Data", "Backend"],
  },
]

/* Inline SVG fallback illustrations for items without images */
function CloudIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M60 45H18C10 45 4 38 4 30C4 22 10 16 18 16C18 8 24 2 33 2C40 2 46 6 48 12C50 11 52 10 55 10C63 10 70 17 70 25C76 26 80 31 80 37C80 43 75 48 68 48H60Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
      <path d="M30 30L38 38L50 22" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="40,5 48,30 75,30 52,48 60,75 40,58 20,75 28,48 5,30 32,30" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="40" cy="40" r="12" fill="#F59E0B"/>
      <circle cx="40" cy="40" r="6" fill="#FEF3C7"/>
    </svg>
  )
}

function TensorFlowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="10" width="60" height="60" rx="12" fill="#FFF3E0" stroke="#FF6F00" strokeWidth="2"/>
      <path d="M25 55V30L40 20L55 30V45" stroke="#FF6F00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 20V55" stroke="#FF6F00" strokeWidth="3" strokeLinecap="round"/>
      <path d="M40 38L55 30" stroke="#FF6F00" strokeWidth="3" strokeLinecap="round"/>
      <path d="M40 48L25 40" stroke="#FF6F00" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  )
}

const fallbackIcons: Record<string, React.FC<{ className?: string }>> = {
  aws: CloudIcon,
  azure: CloudIcon,
  spark: SparkIcon,
  tensorflow: TensorFlowIcon,
}

export default function TechnologiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4 text-center"
        >
          <Badge className="bg-white/10 text-white border-white/20 mb-4">Our Tech Stack</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Technologies We Work With</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            We leverage industry-leading tools and platforms to deliver powerful, scalable, and reliable data solutions.
          </p>
        </motion.div>
      </section>

      {/* Technology Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {technologies.map((tech) => {
            const FallbackIcon = fallbackIcons[tech.slug]
            return (
              <motion.div key={tech.slug} variants={fadeInUp}>
                <Link href={`/technologies/${tech.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {tech.image ? (
                            <img src={tech.image} alt={tech.name} className="w-12 h-12 object-contain" />
                          ) : FallbackIcon ? (
                            <FallbackIcon className="w-12 h-12" />
                          ) : (
                            <span className="text-blue-600 font-bold text-xl">{tech.name.slice(0, 2)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {tech.name}
                          </h3>
                          <Badge variant="secondary" className="text-[10px] mt-1">
                            {tech.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                        {tech.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tech.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] font-medium">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </main>
  )
}
