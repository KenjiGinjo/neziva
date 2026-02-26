/* eslint-disable no-console */
import { initAdmin } from './admin'
import { initBlogPosts } from './blog-post'
import { initContactForms } from './contact-form'
import { initNewsletter } from './newsletter'
import { initPortfolioProjects } from './portfolio-project'

async function main() {
  console.log('🚀 Starting database seeding...\n')

  try {
    // 初始化管理员
    await initAdmin()
    console.log('   - Admin: 1')

    // 初始化博客文章
    const blogPosts = await initBlogPosts()
    console.log(`   - Blog Posts: ${blogPosts.length}`)

    // 初始化联系表单
    const contactForms = await initContactForms()
    console.log(`   - Contact Forms: ${contactForms.length}`)

    // 初始化 Newsletter 订阅
    const newsletterSubscribers = await initNewsletter()
    console.log(`   - Newsletter Subscribers: ${newsletterSubscribers.length}`)

    // 初始化作品集项目
    const portfolioProjects = await initPortfolioProjects()
    console.log(`   - Portfolio Projects: ${portfolioProjects.length}`)

    console.log('\n✨ Database seeding completed successfully!')
  }
  catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error seeding database:', error.message)
      console.error('Stack:', error.stack)
    }
    else {
      console.error('❌ Error seeding database:', error)
    }
    process.exit(1)
  }
}

main()
