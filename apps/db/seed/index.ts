/* eslint-disable no-console */
import { initAdmin } from './admin'
import { initBlogPosts } from './blog-post'
import { initContactForms } from './contact-form'
import { initNewsletter } from './newsletter'

async function main() {
  console.log('🚀 Starting database seeding...\n')

  try {
    // 初始化管理员
    await initAdmin()
    console.log()

    // 初始化博客文章
    const blogPosts = await initBlogPosts()
    console.log()

    // 初始化联系表单
    const contactForms = await initContactForms()
    console.log()

    // 初始化 Newsletter 订阅
    const newsletterSubscribers = await initNewsletter()
    console.log()

    console.log('✨ Database seeding completed successfully!')
    console.log(`\n📊 Summary:`)
    console.log(`   - Blog Posts: ${blogPosts.length}`)
    console.log(`   - Contact Forms: ${contactForms.length}`)
    console.log(`   - Newsletter Subscribers: ${newsletterSubscribers.length}`)
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
