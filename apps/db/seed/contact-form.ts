import { db } from '../src'

export async function initContactForms() {
  const forms = [
    {
      name: 'John Smith',
      company: 'TechCorp Inc',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      projectType: 'strategy',
      description: 'We are looking for AI consulting services to help automate our customer service processes. We have a team of 50 customer service representatives and want to reduce response time by 50%.',
      budget: '5k-15k',
      status: 0, // 未处理
    },
    {
      name: 'Sarah Johnson',
      company: 'GrowthCo',
      email: 'sarah.j@growthco.com',
      phone: '+1 (555) 234-5678',
      projectType: 'poc',
      description: 'We need a proof of concept for an AI-powered content generation tool. The tool should be able to generate marketing copy, product descriptions, and social media posts.',
      budget: '5k-15k',
      status: 1, // 已处理
      notes: '已联系客户，等待回复',
    },
    {
      name: 'David Rodriguez',
      company: 'LogiFlow',
      email: 'david.r@logiflow.com',
      projectType: 'implementation',
      description: 'We want to implement a complete AI-driven data analytics platform. This should include data processing pipelines, AI model integration, and comprehensive visualization dashboards.',
      budget: '50k+',
      status: 0,
    },
    {
      name: 'Emily Chen',
      email: 'emily.chen@example.com',
      projectType: 'strategy',
      description: 'I am a small business owner and want to understand how AI can help my business. I run a local bakery and want to automate some of my administrative tasks.',
      budget: 'under5k',
      status: 0,
    },
    {
      name: 'Michael Brown',
      company: 'DataSolutions',
      email: 'm.brown@datasolutions.com',
      phone: '+1 (555) 345-6789',
      projectType: 'maintenance',
      description: 'We have an existing AI system that needs optimization and ongoing maintenance. The system is experiencing performance issues and we need regular updates.',
      budget: '5k-15k',
      status: 2, // 已回复
      notes: '已发送报价，等待客户确认',
    },
  ]

  const createdForms = []
  for (const form of forms) {
    const created = await db.contactForm.create(form)
    createdForms.push(created)
    console.warn(`  ✅ Created contact form: ${form.name} (${form.email})`)
  }

  return createdForms
}
