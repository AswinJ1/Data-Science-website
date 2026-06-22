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
    image: "/techstack/aws.svg",
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
    image: "/techstack/Microsoft-Azure.svg",
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
  mongodb: {
    name: "MongoDB",
    category: "Database",
    image: null,
    hero: "from-green-900 to-green-700",
    description:
      "MongoDB is the world's leading NoSQL document database, designed for flexibility and scalability. We use MongoDB to store and query unstructured and semi-structured data at scale, enabling fast iteration and horizontal scaling for data-intensive applications.",
    capabilities: [
      "Schema-flexible document storage",
      "Aggregation pipelines for data transformation",
      "Atlas Search for full-text and vector search",
      "Change streams for real-time data sync",
      "Sharding & horizontal scaling",
      "ACID multi-document transactions",
      "Time series collections for IoT & metrics",
      "MongoDB Atlas managed cloud deployments",
    ],
    useCases: [
      "Real-time personalization engines",
      "Content & catalog management",
      "IoT telemetry storage",
      "Mobile & web application backends",
    ],
  },
  postgresql: {
    name: "PostgreSQL",
    category: "Database",
    image: null,
    hero: "from-blue-900 to-blue-700",
    description:
      "PostgreSQL is the world's most advanced open-source relational database. We rely on its robust SQL compliance, JSONB support, and extensibility to power complex analytical workloads, data warehouses, and transactional systems that demand reliability and precision.",
    capabilities: [
      "Advanced SQL with window functions & CTEs",
      "JSONB for hybrid relational/document storage",
      "Full-text search & geospatial queries (PostGIS)",
      "Partitioning for large dataset management",
      "Foreign data wrappers for data federation",
      "Row-level security & fine-grained access control",
      "Logical replication & high availability",
      "Custom types, functions & extensions",
    ],
    useCases: [
      "Operational data stores for analytics",
      "Geospatial data applications",
      "Financial transaction systems",
      "Multi-tenant SaaS data backends",
    ],
  },
  pytorch: {
    name: "PyTorch",
    category: "AI/ML Framework",
    image: null,
    hero: "from-orange-900 to-red-700",
    description:
      "PyTorch is the leading deep learning framework for both research and production AI. Its dynamic computation graph, intuitive Python interface, and rich ecosystem make it our primary tool for building custom neural networks, fine-tuning foundation models, and developing production-grade AI systems.",
    capabilities: [
      "Dynamic computation graph for flexible modeling",
      "Custom neural network architecture design",
      "Transfer learning & fine-tuning pre-trained models",
      "Distributed training with DDP & FSDP",
      "TorchScript & ONNX export for production",
      "Integration with Hugging Face Transformers",
      "Computer vision with torchvision",
      "NLP & LLM training with PyTorch FSDP",
    ],
    useCases: [
      "Custom LLM fine-tuning",
      "Image classification & object detection",
      "Generative AI model development",
      "Research prototyping to production deployment",
    ],
  },
  langchain: {
    name: "LangChain",
    category: "AI Orchestration",
    image: null,
    hero: "from-emerald-900 to-teal-700",
    description:
      "LangChain is the premier open-source framework for building LLM-powered applications. We use it to orchestrate complex AI workflows — chaining prompts, integrating vector stores, building autonomous agents, and creating RAG pipelines that connect your enterprise data to powerful language models.",
    capabilities: [
      "RAG pipeline construction with vector stores",
      "LLM agent & tool-use frameworks",
      "Document loading, chunking & embedding",
      "Memory management for conversational AI",
      "LangGraph for stateful multi-agent systems",
      "LangSmith for LLM tracing & evaluation",
      "Multi-model support (OpenAI, Gemini, Claude, LLaMA)",
      "Custom chain & tool development",
    ],
    useCases: [
      "Enterprise knowledge base Q&A systems",
      "Autonomous AI research agents",
      "Document intelligence & extraction",
      "AI-powered customer support automation",
    ],
  },
  "hugging-face": {
    name: "Hugging Face",
    category: "AI/ML Platform",
    image: null,
    hero: "from-yellow-900 to-yellow-600",
    description:
      "Hugging Face is the central hub for open-source AI — hosting over 400,000 models and 100,000 datasets. We use the Transformers library and the Hub to fine-tune, evaluate, and deploy state-of-the-art NLP, computer vision, and multimodal models tailored to client needs.",
    capabilities: [
      "Transformers library for NLP, vision & audio",
      "Model fine-tuning with PEFT & LoRA",
      "Datasets library for efficient data loading",
      "Inference endpoints for scalable deployment",
      "Spaces for interactive AI demos",
      "Sentence Transformers for embedding generation",
      "Evaluate library for model benchmarking",
      "Diffusers for image generation models",
    ],
    useCases: [
      "Domain-specific NLP model fine-tuning",
      "Semantic search & document similarity",
      "Named entity recognition & classification",
      "Multimodal document understanding",
    ],
  },
  pinecone: {
    name: "Pinecone",
    category: "Vector Database",
    image: "/techstack/pinecone.svg",
    hero: "from-green-900 to-cyan-700",
    description:
      "Pinecone is a fully managed vector database purpose-built for AI applications. We use Pinecone to store, index, and query high-dimensional embeddings at low latency — powering semantic search, retrieval-augmented generation (RAG), and personalization systems that require fast similarity matching across millions of vectors.",
    capabilities: [
      "High-dimensional vector indexing & ANN search",
      "Serverless & pod-based deployment options",
      "Metadata filtering with vector search",
      "Namespace isolation for multi-tenancy",
      "Integration with LangChain, LlamaIndex & OpenAI",
      "Real-time upserts & deletions",
      "Hybrid search (dense + sparse vectors)",
      "Scalable to billions of vectors",
    ],
    useCases: [
      "RAG knowledge retrieval systems",
      "Semantic document search",
      "Product & content recommendation",
      "Duplicate detection & deduplication",
    ],
  },
  redis: {
    name: "Redis",
    category: "Database",
    image: null,
    hero: "from-red-900 to-rose-700",
    description:
      "Redis is an open-source, in-memory data structure store used as a database, cache, and message broker. We leverage Redis to deliver ultra-low-latency data access, power real-time analytics pipelines, and build scalable pub/sub architectures that keep systems responsive under load.",
    capabilities: [
      "In-memory key-value store with sub-millisecond latency",
      "Pub/Sub messaging for real-time event streaming",
      "Sorted sets for leaderboards & time-series data",
      "Redis Streams for durable log-based messaging",
      "Redis Search for full-text & vector search",
      "Persistence options (RDB & AOF)",
      "Cluster mode for horizontal scaling",
      "Session & token caching for APIs",
    ],
    useCases: [
      "API response caching & rate limiting",
      "Real-time leaderboards & counters",
      "Session management for web apps",
      "LLM prompt & response caching",
    ],
  },
  mxnet: {
    name: "Apache MXNet",
    category: "AI/ML Framework",
    image: null,
    hero: "from-blue-900 to-indigo-700",
    description:
      "Apache MXNet is a flexible and efficient deep learning framework optimized for both research and production. Backed by Apache and deeply integrated with AWS, we use MXNet for scalable model training across multi-GPU and distributed environments, particularly for computer vision and NLP workloads.",
    capabilities: [
      "Imperative & symbolic programming APIs",
      "Multi-GPU and distributed training (Horovod)",
      "Gluon API for intuitive model building",
      "Model serving with MXNet Model Server",
      "ONNX export for cross-framework compatibility",
      "Optimized for AWS SageMaker integration",
      "Sparse & quantized model support",
      "Computer vision with GluonCV",
    ],
    useCases: [
      "Scalable image recognition systems",
      "NLP classification & sequence modeling",
      "Distributed training on cloud infrastructure",
      "Edge model deployment & optimization",
    ],
  },
  gemini: {
    name: "Google Gemini",
    category: "Generative AI",
    image: "/techstack/gemini.svg",
    hero: "from-blue-900 to-purple-700",
    description:
      "Google Gemini is Google's most capable multimodal AI model family, designed to understand and reason across text, images, audio, video, and code. We integrate Gemini via Vertex AI and the Google AI Studio API to power advanced enterprise AI applications requiring deep reasoning and long-context understanding.",
    capabilities: [
      "Multimodal reasoning across text, image & video",
      "Long-context processing (up to 2M tokens)",
      "Code generation, review & debugging",
      "Vertex AI integration for enterprise deployment",
      "Grounding with Google Search for factual accuracy",
      "Function calling & tool use for AI agents",
      "Document & PDF understanding at scale",
      "Embeddings for semantic search via Vertex AI",
    ],
    useCases: [
      "Multimodal document intelligence",
      "Enterprise knowledge assistants",
      "Code review & developer productivity tools",
      "Long-context report generation",
    ],
  },
  claude: {
    name: "Claude (Anthropic)",
    category: "Generative AI",
    image: null,
    hero: "from-orange-900 to-amber-700",
    description:
      "Claude is Anthropic's safety-focused large language model, built with Constitutional AI principles to deliver reliable, honest, and harm-free outputs. We integrate Claude for enterprise applications that require nuanced reasoning, long-context document analysis, and responsible AI behavior in sensitive domains.",
    capabilities: [
      "200K token context window for long documents",
      "Advanced reasoning & multi-step analysis",
      "Code generation, explanation & refactoring",
      "Structured data extraction from unstructured text",
      "Summarization of reports, contracts & research",
      "Tool use & API integration via function calling",
      "Constitutional AI for safer outputs",
      "Claude API integration via AWS Bedrock & Anthropic API",
    ],
    useCases: [
      "Legal & compliance document review",
      "Research synthesis & report writing",
      "Enterprise chatbots with safety requirements",
      "Complex data extraction from PDFs",
    ],
  },
  "meta-llama": {
    name: "Meta LLaMA",
    category: "Generative AI",
    image: null,
    hero: "from-blue-900 to-blue-600",
    description:
      "Meta's LLaMA (Large Language Model Meta AI) is an open-weight foundation model family that powers a new generation of custom AI applications. We deploy, fine-tune, and optimize LLaMA models on-premise and in private cloud environments for organizations requiring data sovereignty, custom capabilities, and full control over their AI stack.",
    capabilities: [
      "Open-weight model deployment on private infrastructure",
      "Fine-tuning with LoRA, QLoRA & full fine-tuning",
      "Quantization (GGUF, GPTQ) for efficient inference",
      "On-premise deployment with Ollama & vLLM",
      "Custom instruction tuning for domain tasks",
      "Integration with LangChain & LlamaIndex",
      "Code Llama for developer tooling",
      "Multimodal Llama Vision for image understanding",
    ],
    useCases: [
      "Private AI assistants with no data egress",
      "Domain-specific fine-tuned models",
      "Regulatory-compliant AI deployments",
      "Custom code generation tools",
    ],
  },
  octoml: {
    name: "OctoML",
    category: "MLOps",
    image: "/techstack/octoml.svg",
    hero: "from-purple-900 to-violet-700",
    description:
      "OctoML is a platform for optimizing, packaging, and deploying machine learning models efficiently across diverse hardware targets. We use OctoML to accelerate inference performance, reduce serving costs, and simplify the path from trained model to production deployment without deep hardware expertise.",
    capabilities: [
      "Automated model optimization for CPU, GPU & accelerators",
      "Cross-framework model compilation (TVM-based)",
      "Container-based model packaging for any cloud",
      "Benchmarking across hardware targets",
      "Latency & throughput optimization",
      "One-click deployment to cloud endpoints",
      "Support for PyTorch, TensorFlow, ONNX models",
      "Cost-performance tradeoff analysis",
    ],
    useCases: [
      "Reducing inference costs in production",
      "Deploying models on edge hardware",
      "Multi-cloud model serving strategies",
      "Optimizing LLM serving throughput",
    ],
  },
  helicone: {
    name: "Helicone",
    category: "AI Observability",
    image: "/techstack/Helicone.svg",
    hero: "from-purple-900 to-pink-700",
    description:
      "Helicone is an open-source LLM observability and monitoring platform. We integrate Helicone into AI-powered applications to gain full visibility into LLM API usage — tracking costs, latency, token consumption, and output quality across every model call, enabling data-driven optimization of AI systems.",
    capabilities: [
      "Request logging for all major LLM providers",
      "Cost tracking & budget alerting per model & user",
      "Latency & token usage analytics dashboards",
      "Prompt versioning & A/B testing",
      "Caching layer to reduce duplicate API costs",
      "Custom rate limiting & access control",
      "User & session-level analytics",
      "Webhook integrations & custom alerting",
    ],
    useCases: [
      "LLM cost optimization for production apps",
      "Prompt engineering iteration & testing",
      "Multi-tenant AI usage monitoring",
      "Debugging slow or failing LLM requests",
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
      <section className="bg-[#1e3a8a] text-white py-16 overflow-hidden">
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
              <img src={tech.image} alt={tech.name} className="w-20 h-20 object-contain flex-shrink-0" />
            )}
            <div>
              {/* <Badge className="bg-white/15 text-white border-white/20 mb-2">{tech.category}</Badge> */}
              <h1 className="text-3xl md:text-4xl ">{tech.name}</h1>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-light mb-6 text-black dark:text-white tracking-tight">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {tech.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-light mb-8 text-black dark:text-white tracking-tight">Our Capabilities</h2>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-5 list-disc pl-5 marker:text-blue-500">
            {tech.capabilities.map((cap, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {cap}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-light mb-8 text-black dark:text-white tracking-tight">Common Use Cases</h2>
          <ul className="list-disc pl-5 space-y-5 marker:text-blue-500">
            {tech.useCases.map((uc, i) => (
              <li key={i} className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {uc}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="text-center pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-2xl font-light mb-4 text-black dark:text-white">
            Want to leverage {tech.name} for your project?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Let&apos;s discuss how we can use {tech.name} to solve your specific data challenges.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full px-8">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </section>
    </main>
  )
}
