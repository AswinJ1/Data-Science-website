import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed admin user
  const hashedPassword = await bcrypt.hash("Admin@123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@syancy.com" },
    update: {},
    create: {
      email: "admin@syancy.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Seed HR user
  const hrPassword = await bcrypt.hash("Hr@12345", 12);
  const hr = await prisma.user.upsert({
    where: { email: "hr@syancy.com" },
    update: {},
    create: {
      email: "hr@syancy.com",
      name: "HR Manager",
      password: hrPassword,
      role: "HR",
    },
  });
  console.log("✅ HR user created:", hr.email);

  // Seed categories
  const categories = [
    { name: "AI & Machine Learning", slug: "ai-machine-learning" },
    { name: "Data Engineering", slug: "data-engineering" },
    { name: "Business Intelligence", slug: "business-intelligence" },
    { name: "Industry Insights", slug: "industry-insights" },
    { name: "Company News", slug: "company-news" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Categories seeded");

  // Seed solutions
  const solutions = [
    {
      title: "Healthcare Analytics",
      slug: "healthcare-analytics",
      industry: "Healthcare",
      description:
        "Leverage AI and advanced analytics to improve patient outcomes, optimize operations, and reduce costs across healthcare organizations. Our solutions include predictive diagnostics, patient flow optimization, and clinical decision support systems.",
      icon: "Heart",
      features: [
        "Predictive patient diagnostics",
        "Hospital resource optimization",
        "Clinical trial analytics",
        "Patient readmission prevention",
        "Medical imaging AI",
      ],
      order: 1,
    },
    {
      title: "Financial Intelligence",
      slug: "financial-intelligence",
      industry: "Finance",
      description:
        "Transform financial operations with intelligent automation, risk analytics, and real-time fraud detection. Our data-driven solutions help financial institutions make smarter decisions and stay compliant.",
      icon: "DollarSign",
      features: [
        "Real-time fraud detection",
        "Algorithmic trading insights",
        "Credit risk modeling",
        "Regulatory compliance automation",
        "Portfolio optimization",
      ],
      order: 2,
    },
    {
      title: "Retail & E-Commerce",
      slug: "retail-ecommerce",
      industry: "Retail",
      description:
        "Drive revenue growth with personalized customer experiences, demand forecasting, and supply chain optimization. Harness your data to understand customer behavior at scale.",
      icon: "ShoppingCart",
      features: [
        "Customer segmentation & personalization",
        "Demand forecasting",
        "Dynamic pricing optimization",
        "Inventory management AI",
        "Customer lifetime value prediction",
      ],
      order: 3,
    },
    {
      title: "Manufacturing Intelligence",
      slug: "manufacturing-intelligence",
      industry: "Manufacturing",
      description:
        "Optimize production processes, predict equipment failures, and improve quality control with AI-powered manufacturing analytics. Achieve operational excellence through data.",
      icon: "Factory",
      features: [
        "Predictive maintenance",
        "Quality control automation",
        "Supply chain optimization",
        "Production scheduling AI",
        "Energy consumption optimization",
      ],
      order: 4,
    },
    {
      title: "Energy & Utilities",
      slug: "energy-utilities",
      industry: "Energy",
      description:
        "Optimize energy production, distribution, and consumption with intelligent analytics. Transition to sustainable operations with data-driven insights.",
      icon: "Zap",
      features: [
        "Smart grid analytics",
        "Energy demand forecasting",
        "Renewable energy optimization",
        "Asset performance management",
        "Carbon footprint analytics",
      ],
      order: 5,
    },
  ];

  for (const sol of solutions) {
    await prisma.solution.upsert({
      where: { slug: sol.slug },
      update: {},
      create: sol,
    });
  }
  console.log("✅ Solutions seeded");

  // Seed sample jobs
  const jobs = [
    {
      title: "Senior Data Engineer",
      slug: "senior-data-engineer",
      description: `## About the Role\n\nWe're looking for an experienced Data Engineer to design and build scalable data pipelines and infrastructure.\n\n## Responsibilities\n\n- Design and implement scalable ETL/ELT pipelines\n- Build and maintain data warehouse architecture\n- Optimize data processing for performance and reliability\n- Collaborate with data scientists and analysts\n- Implement data quality monitoring\n\n## Requirements\n\n- 5+ years of experience in data engineering\n- Proficiency in Python, SQL, and Spark\n- Experience with cloud platforms (AWS/GCP/Azure)\n- Knowledge of data modeling and warehousing concepts\n- Experience with orchestration tools (Airflow, Dagster)`,
      location: "Remote",
      type: "FULL_TIME" as const,
      experience: "5+ years",
      skills: ["Python", "SQL", "Spark", "AWS", "Airflow", "Data Modeling"],
      salary: "₹10,00,000 - ₹15,00,000",
      salaryMin: 1000000,
      salaryMax: 1500000,
      salaryCurrency: "INR",
      openings: 2,
      mandatoryRequirements: [
        "5+ years of data engineering experience",
        "Proficiency in Python and SQL",
        "Experience with Spark or similar big data frameworks",
        "Cloud platform experience (AWS/GCP/Azure)",
      ],
      optionalRequirements: [
        "Experience with Airflow or Dagster",
        "Knowledge of streaming frameworks (Kafka, Flink)",
        "dbt experience",
      ],
    },
    {
      title: "Machine Learning Engineer",
      slug: "machine-learning-engineer",
      description: `## About the Role\n\nJoin our ML team to build and deploy production machine learning models that power our client solutions.\n\n## Responsibilities\n\n- Develop and deploy ML models at scale\n- Build ML pipelines and feature stores\n- Collaborate with stakeholders to identify ML opportunities\n- Monitor model performance and implement retraining\n- Research and implement state-of-the-art techniques\n\n## Requirements\n\n- 3+ years in machine learning engineering\n- Strong Python skills with PyTorch or TensorFlow\n- Experience with MLOps tools and practices\n- Understanding of statistical modeling\n- MS/PhD in Computer Science or related field preferred`,
      location: "Hybrid - Mumbai",
      type: "FULL_TIME" as const,
      experience: "3+ years",
      skills: ["Python", "PyTorch", "TensorFlow", "MLOps", "Docker", "Kubernetes"],
      salary: "₹8,00,000 - ₹12,00,000",
      salaryMin: 800000,
      salaryMax: 1200000,
      salaryCurrency: "INR",
      openings: 3,
      mandatoryRequirements: [
        "3+ years in ML engineering",
        "Strong Python skills",
        "Experience with PyTorch or TensorFlow",
        "MLOps experience",
      ],
      optionalRequirements: [
        "MS/PhD in Computer Science or related field",
        "Kubernetes experience",
        "Research publications",
      ],
    },
    {
      title: "Data Analyst Intern",
      slug: "data-analyst-intern",
      description: `## About the Role\n\nKickstart your career in data analytics with our internship program. Work alongside experienced analysts on real client projects.\n\n## Responsibilities\n\n- Assist in data collection and cleaning\n- Create dashboards and visualizations\n- Perform exploratory data analysis\n- Present findings to team members\n- Learn industry tools and best practices\n\n## Requirements\n\n- Currently pursuing a degree in Data Science, Statistics, or related field\n- Basic knowledge of SQL and Python\n- Familiarity with visualization tools (Tableau/Power BI)\n- Strong analytical and communication skills\n- Eagerness to learn and grow`,
      location: "Taloda, Maharashtra",
      type: "INTERNSHIP" as const,
      experience: "0-1 years",
      skills: ["SQL", "Python", "Tableau", "Excel", "Statistics"],
      salary: "₹15,000 - ₹25,000/month",
      salaryMin: 15000,
      salaryMax: 25000,
      salaryCurrency: "INR",
      openings: 5,
      mandatoryRequirements: [
        "Currently pursuing relevant degree",
        "Basic SQL and Python knowledge",
        "Strong communication skills",
      ],
      optionalRequirements: [
        "Familiarity with Tableau or Power BI",
        "Statistics coursework",
        "Prior project or internship experience",
      ],
    },
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      create: job,
    });
  }
  console.log("✅ Sample jobs seeded");

  // Seed sample blog posts
  const aiCategory = await prisma.category.findUnique({
    where: { slug: "ai-machine-learning" },
  });
  const deCategory = await prisma.category.findUnique({
    where: { slug: "data-engineering" },
  });

  if (aiCategory && deCategory) {
    const blogs = [
      {
        title: "The Future of AI in Enterprise Data Analytics",
        slug: "future-ai-enterprise-data-analytics",
        excerpt:
          "Explore how artificial intelligence is revolutionizing enterprise data analytics, from automated insights to predictive modeling at scale.",
        content: `## The AI Revolution in Enterprise Analytics\n\nArtificial intelligence is transforming how enterprises approach data analytics. From automated insight generation to predictive modeling, AI is enabling organizations to extract value from their data at unprecedented speed and scale.\n\n## Key Trends\n\n### 1. Automated Machine Learning (AutoML)\n\nAutoML platforms are democratizing access to advanced analytics, allowing business users to build and deploy models without deep technical expertise.\n\n### 2. Natural Language Processing for Data\n\nNLP-powered interfaces allow users to query data using natural language, making analytics accessible to everyone in the organization.\n\n### 3. Real-Time Predictive Analytics\n\nStream processing and edge computing are enabling real-time predictions, allowing businesses to act on insights as they emerge.\n\n## Conclusion\n\nThe convergence of AI and enterprise analytics represents one of the most significant opportunities for businesses today. Organizations that embrace these technologies will gain a decisive competitive advantage.`,
        featuredImage: "/blog/ai-analytics.jpg",
        metaTitle: "Future of AI in Enterprise Data Analytics | Syancy Innovations",
        metaDescription:
          "Discover how AI is revolutionizing enterprise data analytics with automated insights, predictive modeling, and NLP-powered interfaces.",
        status: "PUBLISHED" as const,
        authorId: admin.id,
        categoryId: aiCategory.id,
        publishedAt: new Date("2026-01-15"),
      },
      {
        title: "Building Scalable Data Pipelines with Modern Tools",
        slug: "building-scalable-data-pipelines",
        excerpt:
          "A comprehensive guide to designing and implementing data pipelines that scale with your organization's growing data needs.",
        content: `## Modern Data Pipeline Architecture\n\nAs data volumes grow exponentially, building scalable data pipelines has become critical for any data-driven organization.\n\n## Architecture Patterns\n\n### Lambda Architecture\n\nCombining batch and stream processing to provide both comprehensive and real-time views of your data.\n\n### Kappa Architecture\n\nSimplifying the pipeline by treating everything as a stream, using tools like Apache Kafka and Flink.\n\n### Medallion Architecture\n\nOrganizing data into Bronze (raw), Silver (cleansed), and Gold (business-level) layers for clarity and governance.\n\n## Tool Selection\n\n- **Orchestration**: Apache Airflow, Dagster, Prefect\n- **Processing**: Spark, Flink, dbt\n- **Storage**: Delta Lake, Iceberg, Data Lakes\n- **Monitoring**: Great Expectations, Monte Carlo\n\n## Best Practices\n\n1. Design for failure and implement robust error handling\n2. Implement data quality checks at every stage\n3. Use infrastructure as code for reproducibility\n4. Monitor pipeline health proactively`,
        featuredImage: "/blog/data-pipelines.jpg",
        metaTitle: "Building Scalable Data Pipelines | Syancy Innovations",
        metaDescription:
          "Learn how to design and implement data pipelines that scale with modern tools like Airflow, Spark, and dbt.",
        status: "PUBLISHED" as const,
        authorId: admin.id,
        categoryId: deCategory.id,
        publishedAt: new Date("2026-02-01"),
      },
    ];

    for (const blog of blogs) {
      await prisma.blog.upsert({
        where: { slug: blog.slug },
        update: {},
        create: blog,
      });
    }
    console.log("✅ Sample blog posts seeded");
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
