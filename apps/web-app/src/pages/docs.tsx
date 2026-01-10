import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { useLocation } from 'wouter'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsToc } from '@/components/docs/docs-toc'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Card, CardContent } from '@/components/ui/card'
import 'highlight.js/styles/github-dark.css'

// Mock markdown content - in production, this would come from an API or file system
const docsContent: Record<string, string> = {
  'getting-started': `# Getting Started

Welcome to the AI Workflow Builder documentation. This guide will help you get started with building and managing workflows.

## Introduction

AI Workflow Builder is a powerful platform that allows you to create, manage, and execute AI-powered workflows. With our visual editor, you can build complex workflows without writing code.

## Quick Start

1. **Create an Account**: Sign up for a free account to get started
2. **Create Your First Workflow**: Use the visual editor to create your first workflow
3. **Run Your Workflow**: Execute your workflow and see the results

## Installation

No installation required! AI Workflow Builder is a web-based platform that runs entirely in your browser.`,

  'workflows': `# Workflows

Workflows are the core building blocks of AI Workflow Builder. Learn how to create, edit, and manage workflows.

## Creating Workflows

To create a new workflow:

1. Navigate to the Dashboard
2. Click "Create New Workflow"
3. Use the visual editor to add nodes and connections
4. Configure each node's settings
5. Save your workflow

## Editing Workflows

You can edit existing workflows by:

1. Opening the workflow from the Dashboard
2. Clicking the "Edit" button
3. Making your changes in the visual editor
4. Saving your changes

## Running Workflows

To run a workflow:

1. Open the workflow detail page
2. Click the "Run" button
3. Monitor the execution in real-time
4. View the results and logs`,

  'nodes': `# Nodes

Nodes are the building blocks of workflows. Each node performs a specific function in your workflow.

## Node Types

### Input Nodes
Input nodes allow you to provide data to your workflow.

### Processing Nodes
Processing nodes perform operations on your data.

### Output Nodes
Output nodes produce the final results of your workflow.

## Node Configuration

Each node can be configured with specific settings:

- **Label**: A descriptive name for the node
- **Description**: Additional information about the node
- **Parameters**: Node-specific configuration options`,

  'api': `# API Reference

The AI Workflow Builder API allows you to programmatically manage workflows, executions, and more.

## Authentication

All API requests require authentication using an API key.

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com/workflows
\`\`\`

## Workflows API

### List Workflows
\`\`\`
GET /workflows
\`\`\`

### Create Workflow
\`\`\`
POST /workflows
\`\`\`

### Get Workflow
\`\`\`
GET /workflows/:id
\`\`\`

## Executions API

### List Executions
\`\`\`
GET /workflows/:id/executions
\`\`\`

### Get Execution
\`\`\`
GET /executions/:id
\`\`\``,
}

function getDocContent(path: string): string {
  // Extract the main section from the path
  const parts = path.split('/').filter(Boolean)
  if (parts.length >= 2 && parts[0] === 'docs') {
    const section = parts[1]
    return docsContent[section] || docsContent['getting-started'] || '# Documentation\n\nContent coming soon...'
  }
  return docsContent['getting-started'] || '# Documentation\n\nContent coming soon...'
}

export function PageDocs() {
  const [location] = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const currentPath = location.startsWith('/docs') ? location : '/docs'
  const content = getDocContent(currentPath)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real implementation, you would filter or search through documentation
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="flex h-[calc(100vh-4rem)]">
          <DocsSidebar className="hidden lg:block" onSearch={handleSearch} />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <Card>
                <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </CardContent>
              </Card>
            </div>
          </div>
          <DocsToc content={content} className="hidden xl:block" />
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
