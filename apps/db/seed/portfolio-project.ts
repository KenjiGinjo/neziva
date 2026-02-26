import { db } from '../src'

export async function initPortfolioProjects() {
  const projects = [
    {
      name: 'AI Workflow Automation Platform',
      slug: 'ai-workflow-automation-platform',
      type: 'Personal Project',
      description: 'A RAG-based intelligent workflow engine designed to automate repetitive business tasks. Features multi-API integration and visual flow design.',
      tags: ['RAG', 'Python', 'React', 'Node.js', 'API Integration'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f9293fd5ec-76f14148b74e150793a5.png',
      status: ['Open Source', 'Live Demo'],
      demoUrl: '#',
      githubUrl: '#',
      problemStatement: 'Solving the automation needs of small and medium businesses for repetitive tasks. Many businesses struggle with manual processes that consume valuable time and resources, leading to inefficiency and human error.',
      solutionOverview: 'We developed a comprehensive RAG-based intelligent workflow engine that revolutionizes how businesses approach automation. The platform combines cutting-edge AI technology with intuitive design to create a powerful automation solution. The system features multi-API integration capabilities, allowing seamless connection with popular business tools and services. Users can build complex workflows through our visual flow design interface without writing a single line of code. Our RAG implementation ensures intelligent decision-making within workflows, adapting to context and providing smart suggestions for optimization.',
      technicalHighlights: [
        { title: 'Full-Stack Development Capability', description: 'Built with modern React frontend and robust Node.js backend, ensuring responsive user experience and reliable performance.' },
        { title: 'AI Integration and System Architecture', description: 'Sophisticated RAG implementation with vector databases and LLM integration for intelligent workflow processing and decision-making.' },
        { title: 'Scalable Design Patterns', description: 'Microservices architecture with containerization support, enabling horizontal scaling and easy deployment across different environments.' },
      ],
      results: [
        { title: 'Complete Demonstrable System', value: '100%' },
        { title: 'Open Source on GitHub' },
        { title: 'Technical Documentation' },
      ],
      screenshots: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/dcb836d01e-c9d6e6fd7bc9fdfa126e.png',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/898963f877-460a309fdd98f29eccbf.png',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/6327ffc6d7-d2f2399bea2ad27b3614.png',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/4daebecd36-3d773782b582a5c5c47a.png',
      ],
      technologies: ['RAG', 'Python', 'React', 'Node.js', 'API Integration', 'Vector DB'],
      featured: true,
    },
    {
      name: 'Smart Data Analytics Tool',
      slug: 'smart-data-analytics-tool',
      type: 'Concept Validation',
      description: 'An AI-driven data analysis platform that provides fast insights for businesses. Includes data processing pipelines, AI model integration, and comprehensive visualization.',
      tags: ['Data Processing', 'AI Models', 'Visualization', 'Python', 'FastAPI'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3eccbb46ce-6de20934e69f9953bd7c.png',
      status: ['POC'],
      demoUrl: '#',
      githubUrl: '#',
      problemStatement: null,
      solutionOverview: null,
      technicalHighlights: null,
      results: null,
      screenshots: [],
      technologies: ['Python', 'FastAPI', 'Data Processing'],
      featured: false,
    },
    {
      name: 'AI Content Generation Assistant',
      slug: 'ai-content-generation-assistant',
      type: 'Personal Project',
      description: 'A multi-modal AI content generation tool that improves content creation efficiency. Features LLM integration, content optimization, and batch processing capabilities.',
      tags: ['LLM', 'Content Processing', 'Batch Operations', 'Python'],
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5b51cb9e4a-5ddc13625e4da19fff37.png',
      status: ['Open Source', 'Active'],
      demoUrl: '#',
      githubUrl: '#',
      problemStatement: null,
      solutionOverview: null,
      technicalHighlights: null,
      results: null,
      screenshots: [],
      technologies: ['LLM', 'Python', 'Content Processing'],
      featured: false,
    },
  ]

  const created: string[] = []
  for (const project of projects) {
    const existing = await db.portfolioProject.where({ slug: project.slug }).takeOptional()
    if (!existing) {
      await db.portfolioProject.create(project as any)
      created.push(project.name)
      console.warn(`  ✅ Created portfolio project: ${project.name}`)
    }
  }
  return created
}
