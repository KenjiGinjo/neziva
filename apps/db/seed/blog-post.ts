import { EnumBlogPostStatus } from '@neziva/enums'
import { db } from '../src'

export async function initBlogPosts() {
  const posts = [
    {
      title: '从零到一：如何构建你的第一个AI应用',
      slug: 'how-to-build-first-ai-app',
      content: `# 从零到一：如何构建你的第一个AI应用

这是一篇完整的教程，教你如何从零开始构建你的第一个AI应用。

## 准备工作

在开始之前，你需要准备以下工具和知识...

## 第一步：选择AI模型

选择合适的AI模型是成功的关键...

## 第二步：搭建开发环境

搭建一个合适的开发环境...

## 第三步：实现核心功能

实现你的AI应用的核心功能...

## 总结

通过这个教程，你应该能够构建一个基本的AI应用了。`,
      excerpt: 'A comprehensive step-by-step guide for beginners to build their first AI application. Learn the fundamentals, tools, and best practices.',
      category: 'Technical Insights',
      tags: ['AI Development', 'Tutorial', 'Beginner'],
      author: 'neziva',
      readTime: 12,
      featured: true,
      status: EnumBlogPostStatus.Published,
      coverImage: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ebd9c15b5c-cd3770fcb1c7ff967822.png',
      seoTitle: '从零到一：如何构建你的第一个AI应用 | neziva',
      seoDesc: 'Learn how to build your first AI application with this comprehensive guide.',
      publishedAt: new Date('2026-01-12'),
    },
    {
      title: 'AI客服机器人的5个最佳实践',
      slug: 'ai-customer-service-best-practices',
      content: `# AI客服机器人的5个最佳实践

Real-world case studies showing how companies improved customer satisfaction by 60% using AI chatbots.

## 实践一：明确使用场景

首先，你需要明确AI客服机器人的使用场景...

## 实践二：设计对话流程

设计一个清晰的对话流程...

## 实践三：持续优化

AI客服机器人需要持续优化...

## 实践四：人工介入机制

设置合理的人工介入机制...

## 实践五：数据分析和反馈

通过数据分析不断改进...

## 总结

遵循这5个最佳实践，你的AI客服机器人将能够显著提升客户满意度。`,
      excerpt: 'Real-world case studies showing how companies improved customer satisfaction by 60% using AI chatbots. Practical lessons and recommendations.',
      category: 'Case Studies',
      tags: ['Customer Service', 'Chatbots'],
      author: 'neziva',
      readTime: 10,
      featured: false,
      status: 1,
      coverImage: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/53b1c2ea5d-183667614ebbeab28bdb.png',
      seoTitle: 'AI客服机器人的5个最佳实践 | neziva',
      seoDesc: 'Learn the best practices for implementing AI customer service chatbots.',
      publishedAt: new Date('2026-01-10'),
    },
    {
      title: '如何选择适合你业务的AI工具',
      slug: 'how-to-choose-ai-tools-for-your-business',
      content: `# 如何选择适合你业务的AI工具

A practical guide with comparison tables and checklists to help you choose the right AI tools for your specific business needs and budget.

## 评估你的需求

首先，你需要评估你的业务需求...

## 预算考虑

AI工具的价格范围很广...

## 功能对比

对比不同AI工具的功能...

## 集成能力

考虑AI工具与现有系统的集成能力...

## 总结

选择合适的AI工具需要综合考虑多个因素。`,
      excerpt: 'A practical guide with comparison tables and checklists to help you choose the right AI tools for your specific business needs and budget.',
      category: 'Guides & Tutorials',
      tags: ['Tools', 'Selection Guide'],
      author: 'neziva',
      readTime: 15,
      featured: false,
      status: 1,
      coverImage: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0ee2356c7c-815b9147e630034f8ca7.png',
      seoTitle: '如何选择适合你业务的AI工具 | neziva',
      seoDesc: 'A guide to help you choose the right AI tools for your business.',
      publishedAt: new Date('2026-01-08'),
    },
    {
      title: '2026 AI Trends Every Business Owner Should Know',
      slug: '2026-ai-trends-for-business',
      content: `# 2026 AI Trends Every Business Owner Should Know

Stay ahead of the curve with our analysis of the top AI trends shaping business in 2026.

## Trend 1: AI Automation

AI automation is becoming more accessible...

## Trend 2: Generative AI

Generative AI is transforming content creation...

## Trend 3: AI-Powered Analytics

Advanced analytics powered by AI...

## Summary

These trends will shape the business landscape in 2026.`,
      excerpt: 'Stay ahead of the curve with our analysis of the top AI trends shaping business in 2026. Data-driven insights and actionable recommendations.',
      category: 'AI Trends',
      tags: ['Trends', 'Business Strategy'],
      author: 'neziva',
      readTime: 7,
      featured: true,
      status: 1,
      coverImage: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/505d809bd2-f4eb0d4c975a3e4ca66d.png',
      seoTitle: '2026 AI Trends Every Business Owner Should Know | neziva',
      seoDesc: 'Top AI trends shaping business in 2026.',
      publishedAt: new Date('2026-01-05'),
    },
    {
      title: 'Machine Learning Explained: A Beginner\'s Guide',
      slug: 'machine-learning-explained-beginners-guide',
      content: `# Machine Learning Explained: A Beginner's Guide

An introduction to machine learning concepts for business owners and non-technical readers.

## What is Machine Learning?

Machine learning is a subset of AI...

## Types of Machine Learning

There are three main types...

## Applications in Business

How businesses are using machine learning...

## Getting Started

How to get started with machine learning...`,
      excerpt: 'An introduction to machine learning concepts for business owners and non-technical readers.',
      category: 'Technical Insights',
      tags: ['Machine Learning', 'Explained'],
      author: 'neziva',
      readTime: 8,
      featured: false,
      status: 1,
      coverImage: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/505d809bd2-f4eb0d4c975a3e4ca66d.png',
      seoTitle: 'Machine Learning Explained: A Beginner\'s Guide | neziva',
      seoDesc: 'Learn the basics of machine learning in simple terms.',
      publishedAt: new Date('2026-01-03'),
    },
    {
      title: 'AI in Retail: ROI Case Study',
      slug: 'ai-in-retail-roi-case-study',
      content: `# AI in Retail: ROI Case Study

A detailed case study showing how a retail company achieved 30% ROI using AI solutions.

## The Challenge

The company faced several challenges...

## The Solution

We implemented an AI solution...

## Results

The results exceeded expectations...

## Lessons Learned

Key takeaways from this project...`,
      excerpt: 'A detailed case study showing how a retail company achieved 30% ROI using AI solutions.',
      category: 'Case Studies',
      tags: ['Retail', 'ROI'],
      author: 'neziva',
      readTime: 9,
      featured: false,
      status: EnumBlogPostStatus.Published,
      coverImage: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/505d809bd2-f4eb0d4c975a3e4ca66d.png',
      seoTitle: 'AI in Retail: ROI Case Study | neziva',
      seoDesc: 'How a retail company achieved 30% ROI with AI.',
      publishedAt: new Date('2026-01-01'),
    },
  ]

  const createdPosts = []
  for (const post of posts) {
    const created = await db.blogPost.create(post)
    createdPosts.push(created)
    console.warn(`  ✅ Created blog post: ${post.title}`)
  }

  return createdPosts
}
