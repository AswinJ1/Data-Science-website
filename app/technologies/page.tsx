"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import {
  SiPython, SiR,
  SiApachespark,
  SiTensorflow, SiPytorch, SiLangchain, SiHuggingface,
  SiMongodb, SiPostgresql, SiRedis,
  SiAnthropic, SiMeta,
} from "@icons-pack/react-simple-icons"

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
    image: "/techstack/aws.svg",
    description:
      "Cloud-native data solutions built on AWS — S3, Redshift, SageMaker, Glue, and more — to scale your data infrastructure with reliability and speed.",
    tags: ["Cloud", "Infrastructure", "Scalability"],
  },
  {
    slug: "azure",
    name: "Microsoft Azure",
    category: "Cloud Platform",
    image: "/techstack/Microsoft-Azure.svg",
    description:
      "Enterprise-grade analytics and AI powered by Azure Synapse, Databricks, Azure ML, and Cognitive Services for intelligent business solutions.",
    tags: ["Enterprise", "AI/ML", "Analytics"],
  },
  {
    slug: "power-bi",
    name: "Power BI",
    category: "Visualization",
    image: "/techstack/power-bi-icon.svg",
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
    image: "/techstack/Java.svg",
    description:
      "Enterprise-grade applications and big data systems. We use Java for building robust, high-performance data pipelines and distributed systems.",
    tags: ["Enterprise", "Big Data", "Backend"],
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    category: "Database",
    image: null,
    description:
      "The leading NoSQL document database. We use MongoDB for flexible, schema-less data storage that handles unstructured and semi-structured data at scale.",
    tags: ["NoSQL", "Document DB", "Scalability"],
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    image: null,
    description:
      "The world's most advanced open-source relational database. We leverage PostgreSQL for complex queries, JSONB support, and robust transactional workloads.",
    tags: ["SQL", "Relational", "Open Source"],
  },
  {
    slug: "pytorch",
    name: "PyTorch",
    category: "AI/ML Framework",
    image: null,
    description:
      "Facebook's dynamic deep learning framework, preferred for research and production AI. We use PyTorch for building and training custom neural networks and LLMs.",
    tags: ["Deep Learning", "Research", "Neural Networks"],
  },
  {
    slug: "langchain",
    name: "LangChain",
    category: "AI Orchestration",
    image: null,
    description:
      "The premier framework for building LLM-powered applications. We use LangChain to chain prompts, connect data sources, and build sophisticated AI agents and RAG pipelines.",
    tags: ["LLMs", "RAG", "AI Agents"],
  },
  {
    slug: "hugging-face",
    name: "Hugging Face",
    category: "AI/ML Platform",
    image: null,
    description:
      "The central hub for open-source AI models and datasets. We use Hugging Face Transformers and the Hub to fine-tune, evaluate, and deploy state-of-the-art NLP and vision models.",
    tags: ["Transformers", "NLP", "Open Source AI"],
  },
  {
    slug: "pinecone",
    name: "Pinecone",
    category: "Vector Database",
    image: "/techstack/pinecone.svg",
    description:
      "A fully managed vector database built for AI applications. We use Pinecone to store and query high-dimensional embeddings for semantic search, RAG, and recommendation systems.",
    tags: ["Vector Search", "Embeddings", "RAG"],
  },
  {
    slug: "redis",
    name: "Redis",
    category: "Database",
    image: null,
    description:
      "An in-memory data structure store used as a database, cache, and message broker. We leverage Redis for ultra-low-latency data access, session management, and real-time analytics.",
    tags: ["In-Memory", "Caching", "Real-Time"],
  },
  {
    slug: "mxnet",
    name: "Apache MXNet",
    category: "AI/ML Framework",
    image: null,
    description:
      "A flexible, efficient deep learning framework backed by Apache and AWS. We use MXNet for scalable model training across multi-GPU and distributed environments.",
    tags: ["Deep Learning", "Distributed Training", "AWS"],
  },
  {
    slug: "gemini",
    name: "Google Gemini",
    category: "Generative AI",
    image: "/techstack/gemini.svg",
    description:
      "Google's most capable multimodal AI model. We integrate Gemini via Vertex AI and Google AI Studio to power advanced reasoning, code generation, and document understanding.",
    tags: ["Multimodal", "LLM", "Google AI"],
  },
  {
    slug: "claude",
    name: "Claude (Anthropic)",
    category: "Generative AI",
    image: null,
    description:
      "Anthropic's safety-focused large language model. We use Claude for enterprise AI applications that require reliable reasoning, long-context document analysis, and responsible AI outputs.",
    tags: ["LLM", "Safety AI", "Reasoning"],
  },
  {
    slug: "meta-llama",
    name: "Meta LLaMA",
    category: "Generative AI",
    image: null,
    description:
      "Meta's open-weight large language model family. We deploy and fine-tune LLaMA models on-premise and in private clouds for organizations requiring data sovereignty and custom AI.",
    tags: ["Open Weight", "Fine-Tuning", "On-Premise AI"],
  },
  {
    slug: "octoml",
    name: "OctoML",
    category: "MLOps",
    image: "/techstack/octoml.svg",
    description:
      "A platform for optimizing and deploying ML models efficiently across hardware targets. We use OctoML to accelerate model inference and reduce deployment costs in production.",
    tags: ["Model Optimization", "Inference", "MLOps"],
  },
  {
    slug: "helicone",
    name: "Helicone",
    category: "AI Observability",
    image: "/techstack/helicone.svg",
    description:
      "An open-source LLM observability platform. We integrate Helicone to monitor, log, and optimize LLM API usage — tracking costs, latency, and quality across AI-powered applications.",
    tags: ["LLM Monitoring", "Observability", "Cost Optimization"],
  },
]

/* Brand icon lookup by slug */
const techIcons: Record<string, React.ElementType> = {
  python: SiPython,
  r: SiR,
  spark: SiApachespark,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  langchain: SiLangchain,
  "hugging-face": SiHuggingface,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  redis: SiRedis,
  claude: SiAnthropic,
  "meta-llama": SiMeta,
  mxnet: SiApachespark, // closest available
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
          {/* <Badge className="bg-white/10 text-white border-white/20 mb-4">Our Tech Stack</Badge> */}
          <h1 className="text-3xl md:text-5xl  mb-4">Technologies We Work With</h1>
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
            const Icon = techIcons[tech.slug]
            return (
              <motion.div key={tech.slug} variants={fadeInUp}>
                <Link href={`/technologies/${tech.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                          {tech.image ? (
                            <img src={tech.image} alt={tech.name} className="w-12 h-12 object-contain" />
                          ) : Icon ? (
                            <Icon size={36} />
                          ) : (
                            <span className="text-blue-600 font-bold text-xl">{tech.name.slice(0, 2)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
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
