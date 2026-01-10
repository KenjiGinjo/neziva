import type { ColumnDef } from '@tanstack/react-table'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { Copy, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Empty } from '@/components/empty'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Request } from '@/components/request'
import { SettingsSidebar } from '@/components/settings/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/table'

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: string
  lastUsedAt?: string | null
}

// Mock data for now - API Keys endpoint may not be available yet
const mockApiKeys: ApiKey[] = []

export function PageSettingsApiKeys() {
  const queryClient = useQueryClient()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys)

  const handleCreateApiKey = async () => {
    // TODO: Call API when endpoint is available
    // const res = await $qc.user.apiKeys.$post.mutation({ body: { name: 'New API Key' } })
    // For now, just add a mock key
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: `API Key ${apiKeys.length + 1}`,
      key: `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
    }
    setApiKeys([...apiKeys, newKey])
  }

  const handleDeleteApiKey = (keyId: string) => {
    return async () => {
      // TODO: Call API when endpoint is available
      // await $qc.user.apiKeys[':id'].$delete.mutation({ params: { id: keyId } })
      setApiKeys(apiKeys.filter(k => k.id !== keyId))
      await queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey
          return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes('api-keys')
        },
      })
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  const columns: ColumnDef<ApiKey>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'key',
      header: 'API Key',
      cell: ({ row }) => {
        const key = row.getValue('key') as string
        const maskedKey = `${key.slice(0, 8)}...${key.slice(-4)}`
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm">{maskedKey}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopyKey(key)}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'))
        return <span className="text-sm text-muted-foreground">{date.toLocaleDateString()}</span>
      },
    },
    {
      accessorKey: 'lastUsedAt',
      header: 'Last Used',
      cell: ({ row }) => {
        const lastUsed = row.original.lastUsedAt
        if (!lastUsed) {
          return <span className="text-sm text-muted-foreground">Never</span>
        }
        return <span className="text-sm text-muted-foreground">{new Date(lastUsed).toLocaleDateString()}</span>
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const apiKey = row.original
        return (
          <Request
            request={handleDeleteApiKey(apiKey.id)}
            showLoading={true}
            showLoadingOption={{ title: 'Deleting API key...' }}
            showModal={true}
            showModalOption={{
              title: 'Delete API Key',
              description: 'Are you sure you want to delete this API key? This action cannot be undone.',
            }}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </Request>
        )
      },
    },
  ]

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="flex h-[calc(100vh-4rem)]">
          <SettingsSidebar className="hidden md:block" />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">API Keys</h1>
                  <p className="text-muted-foreground">
                    Manage your API keys for programmatic access
                  </p>
                </div>
                <Request
                  request={handleCreateApiKey}
                  showLoading={true}
                  showLoadingOption={{ title: 'Creating API key...' }}
                >
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create API Key
                  </Button>
                </Request>
              </div>

              {apiKeys.length === 0
                ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Empty.Icon message="No API keys found. Create your first API key to get started." />
                      </CardContent>
                    </Card>
                  )
                : (
                    <Card>
                      <CardHeader>
                        <CardTitle>Your API Keys</CardTitle>
                        <CardDescription>
                          Keep your API keys secure and never share them publicly
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DataTable columns={columns} data={apiKeys} />
                      </CardContent>
                    </Card>
                  )}
            </div>
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
