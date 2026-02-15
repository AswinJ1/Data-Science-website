"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } }
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

interface Technology {
  name: string
  category: string
  image: string | null
  hero: string
  description: string
  capabilities: string[]
  useCases: string[]
}

const techData: Record<string, Technology> = {
  python: {
    name: "Python",
    category: "Language",
    image: "/techstack/python.svg",
    hero: "from-green-900 to-green-700",
    description:
      "Python is the cornerstone of our data science practice. Its rich ecosystem of libraries — Pandas, NumPy, Scikit-learn, PyTorch, and more — enables us to deliver everything from rapid prototyping to production-grade ML systems. We use Python across the entire data lifecycle, from ingestion and cleaning to modeling and deployment.",
    capabilities: [
      "Data wrangling with Pandas & NumPy",
      "Machine learning with Scikit-learn & XGBoost",
      "Deep learning with PyTorch & TensorFlow",
      "Natural language processing with spaCy & Hugging Face",
      "Web scraping & API integration",
      "Workflow automation & scripting",
      "Data visualization with Matplotlib & Seaborn",
      "MLOps & model serving with FastAPI & Flask",
    ],
    useCases: [
      "Predictive analytics & forecasting",
      "Customer segmentation & churn modeling",
      "Recommendation engines",
      "Automated reporting pipelines",
    ],
  },
  r: {
    name: "R",
    category: "Language",
    image: "/techstack/R.svg",
    hero: "from-blue-900 to-blue-700",
    description:
      "R is our go-to for advanced statistical analysis and research-grade data work. With packages like ggplot2, dplyr, and caret, R excels at exploratory data analysis, hypothesis testing, and creating publication-quality visualizations that communicate complex findings clearly.",
    capabilities: [
      "Advanced statistical modeling & hypothesis testing",
      "Time series analysis & forecasting",
      "Data visualization with ggplot2 & Shiny",
      "Bioinformatics & clinical trial analysis",
      "Bayesian inference & MCMC methods",
      "Text analytics & sentiment analysis",
      "Reproducible research with R Markdown",
      "Integration with databases & APIs",
    ],
    useCases: [
      "Clinical data analysis",
      "A/B testing & experimentation",
      "Financial risk modeling",
      "Academic & scientific research",
    ],
  },
  aws: {
    name: "Amazon Web Services",
    category: "Cloud Platform",
    image: null,
    hero: "from-orange-900 to-orange-700",
    description:
      "We architect scalable, cost-efficient data solutions on AWS. From S3 data lakes and Redshift warehouses to SageMaker ML pipelines and Lambda serverless functions, we leverage the full breadth of AWS services to build cloud-native data infrastructure that grows with your business.",
    capabilities: [
      "S3 data lakes & lifecycle management",
      "Redshift & Athena for data warehousing",
      "SageMaker for ML model training & deployment",
      "Glue ETL & Step Functions orchestration",
      "Kinesis real-time data streaming",
      "Lambda serverless data processing",
      "CloudWatch monitoring & alerting",
      "IAM security & compliance frameworks",
    ],
    useCases: [
      "Scalable data lake architecture",
      "Real-time analytics pipelines",
      "ML model training at scale",
      "Cost-optimized batch processing",
    ],
  },
  azure: {
    name: "Microsoft Azure",
    category: "Cloud Platform",
    image: null,
    hero: "from-blue-900 to-cyan-700",
    description:
      "Our Azure practice delivers enterprise-grade analytics and AI solutions. We use Azure Synapse for unified analytics, Databricks for collaborative data engineering, Azure ML for model lifecycle management, and Cognitive Services for pre-built AI capabilities — all integrated with the Microsoft ecosystem your teams already know.",
    capabilities: [
      "Azure Synapse Analytics for unified data",
      "Databricks for data engineering & ML",
      "Azure Machine Learning studio & pipelines",
      "Cognitive Services (Vision, Language, Speech)",
      "Data Factory for ETL orchestration",
      "Azure Stream Analytics for real-time data",
      "Power BI embedded analytics",
      "Azure DevOps for MLOps workflows",
    ],
    useCases: [
      "Enterprise data platform modernization",
      "AI-powered document processing",
      "Real-time IoT analytics",
      "Unified reporting across departments",
    ],
  },
  "power-bi": {
    name: "Power BI",
    category: "Visualization",
    image: "/techstack/powerbi.svg",
    hero: "from-yellow-900 to-yellow-700",
    description:
      "We create interactive Power BI dashboards that transform complex data into clear, actionable insights. From self-service reports for business users to enterprise-wide analytics portals, our Power BI solutions enable data-driven decision-making at every level of your organization.",
    capabilities: [
      "Interactive dashboard design & development",
      "DAX measures & calculated columns",
      "Power Query data transformation",
      "Row-level security & governance",
      "Paginated reports for compliance",
      "Embedded analytics in custom apps",
      "Dataflows & shared datasets",
      "Incremental refresh for large datasets",
    ],
    useCases: [
      "Executive KPI dashboards",
      "Sales & marketing analytics",
      "Financial reporting & forecasting",
      "Operational performance monitoring",
    ],
  },
  tableau: {
    name: "Tableau",
    category: "Visualization",
    image: "/techstack/tableau.svg",
    hero: "from-indigo-900 to-indigo-700",
    description:
      "Our Tableau experts build beautiful, interactive visual analytics that reveal patterns and tell compelling data stories. Whether it is exploratory analysis for data teams or polished dashboards for boardroom presentations, we make your data speak clearly and persuasively.",
    capabilities: [
      "Advanced visual analytics & storytelling",
      "Calculated fields & LOD expressions",
      "Tableau Prep for data preparation",
      "Server & Cloud deployment",
      "Parameter-driven interactivity",
      "Geospatial mapping & analysis",
      "Cross-database joins & blending",
      "Performance optimization for large datasets",
    ],
    useCases: [
      "Data exploration & discovery",
      "Geographic & spatial analysis",
      "Supply chain visibility dashboards",
      "Customer behavior analytics",
    ],
  },
  spark: {
    name: "Apache Spark",
    category: "Big Data",
    image: null,
    hero: "from-red-900 to-red-700",
    description:
      "When your data outgrows a single machine, we turn to Apache Spark. Our engineers build distributed data processing pipelines that handle terabytes to petabytes of data — using Spark SQL for analytics, MLlib for machine learning, and Structured Streaming for real-time workloads.",
    capabilities: [
      "Distributed data processing at scale",
      "Spark SQL for interactive analytics",
      "MLlib for large-scale machine learning",
      "Structured Streaming for real-time data",
      "Delta Lake for reliable data lakes",
      "PySpark & Scala API development",
      "Cluster optimization & performance tuning",
      "Integration with Kafka, S3, HDFS & more",
    ],
    useCases: [
      "Petabyte-scale ETL pipelines",
      "Real-time fraud detection",
      "Log analytics & anomaly detection",
      "Large-scale feature engineering",
    ],
  },
  tensorflow: {
    name: "TensorFlow",
    category: "AI/ML Framework",
    image: null,
    hero: "from-orange-900 to-amber-700",
    description:
      "We use TensorFlow and Keras to design, train, and deploy deep learning models that power production AI systems. From computer vision and NLP to time-series forecasting and recommendation engines, TensorFlow enables us to push the boundaries of what's possible with your data.",
    capabilities: [
      "Neural network architecture design",
      "Transfer learning & fine-tuning",
      "TensorFlow Serving for model deployment",
      "TFX pipelines for production ML",
      "TensorFlow Lite for edge/mobile deployment",
      "Custom training loops & callbacks",
      "Distributed training across GPUs/TPUs",
      "TensorBoard for experiment tracking",
    ],
    useCases: [
      "Image classification & object detection",
      "Text generation & chatbots",
      "Time series forecasting",
      "Anomaly detection in sensor data",
    ],
  },
  java: {
    name: "Java",
    category: "Language",
    image: "/techstack/java.svg",
    hero: "from-red-900 to-red-700",
    description:
      "Java powers our enterprise-grade data systems and big data infrastructure. We use it for building high-performance data pipelines, integrating with Hadoop and Spark clusters, and developing robust backend services that handle millions of data events per second.",
    capabilities: [
      "High-performance data pipeline development",
      "Hadoop ecosystem integration",
      "Kafka producers & consumers",
      "Spring Boot microservices for data APIs",
      "JDBC & JPA for database connectivity",
      "Concurrent & parallel processing",
      "Enterprise application integration",
      "JVM performance tuning & optimization",
    ],
    useCases: [
      "Event-driven data architectures",
      "Enterprise data integration",
      "High-throughput API backends",
      "Legacy system modernization",
    ],
  },
}

export default function TechnologyDetailPage() {
  const { slug } = useParams()
  const router = useRouter()

  const tech = techData[slug as string]
  if (!tech) {
    router.push("/technologies")
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className={`bg-gradient-to-r ${tech.hero} text-white py-16 overflow-hidden`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4"
        >
          <Link
            href="/technologies"
            className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            All Technologies
          </Link>
          <div className="flex items-center gap-5 mb-4">
            {tech.image && (
              <img src={tech.image} alt={tech.name} className="w-16 h-16 object-contain flex-shrink-0" />
            )}
            <div>
              <Badge className="bg-white/15 text-white border-white/20 mb-2">{tech.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold">{tech.name}</h1>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {tech.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Our Capabilities</h2>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-3"
              >
                {tech.capabilities.map((cap, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex items-start gap-3 p-3">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{cap}</span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Common Use Cases</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {tech.useCases.map((uc, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">{i + 1}.</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{uc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center pt-4"
        >
          <h3 className="text-xl font-bold mb-3">
            Want to leverage {tech.name} for your project?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Let&apos;s discuss how we can use {tech.name} to solve your specific data challenges.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </section>
    </main>
  )
}
