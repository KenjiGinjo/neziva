'use client'

import { ChevronRight } from 'lucide-react'

import * as React from 'react'
import { Link, useLocation } from 'wouter'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const navMain = [
  {
    title: '角色管理',
    url: '/character/list',
  },
  {
    title: '订单管理',
    url: '/order/list',
  },
  {
    title: '用户管理',
    url: '/user/list',
  },
  {
    title: '举报管理',
    url: '/report/list',
  },
  {
    title: '抽奖管理',
    url: '/raffle/list',
  },
  {
    title: '系统设置',
    url: '/system',
    items: [
      {
        title: '参数设置',
        url: '/setting',
      },
    ],
  },
]

function MainItem({ item }: { item: typeof navMain[number] }) {
  const [location] = useLocation()

  const hasItems = item.items && item.items.length > 0

  if (hasItems) {
    return (
      <Collapsible
        key={item.title}
        title={item.title}
        defaultOpen
        className="group/collapsible"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton isActive={item.url === location}>
            {item.title}
            {item.items && <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroup>
            {item.items && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => {
                    const url = `${item.url}${subItem.url}`

                    return (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild isActive={url === location}>
                          <Link href={url}>
                            {subItem.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuButton asChild isActive={item.url === location} className="mb-2">
      <Link href={item.url}>
        {item.title}
      </Link>
    </SidebarMenuButton>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="flex flex-col gap-0.5 leading-none text-center py-4 cursor-pointer">
          <span className="font-semibold">管理后台(haole)</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          {navMain.map(item => (
            <SidebarGroupContent key={item.title}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <MainItem item={item} />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
