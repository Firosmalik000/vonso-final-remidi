/* eslint-disable @typescript-eslint/no-explicit-any */
import { Home, LogOut, User, ProjectorIcon, Notebook, Plane } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Button } from './ui/button';
import Api from '@/service/api';
import { toast } from 'sonner';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/private',
    icon: Home,
  },
  {
    title: 'Project',
    url: '/project',
    icon: ProjectorIcon,
  },
  {
    title: 'User',
    url: '/user',
    icon: User,
  },
  {
    title: 'Agenda',
    url: '/agenda',
    icon: Plane,
  },
  {
    title: 'Note',
    url: '/note',
    icon: Notebook,
  },
];

export function AppSidebar() {
  const api = Api();

  const logout = async () => {
    try {
      const res = await api.post('user/logout', {});
      if (res) {
        toast.success(res.data.message);
        window.localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } catch (err: any) {
      toast.error('something went wrong', err.message);
    }
  };
  return (
    <Sidebar>
      <SidebarHeader className="border border-gray-200 rounded-2xl">
        <div className="flex items-center py-4 justify-center">
          <p>Vonso Project</p>
        </div>
        {/* <SidebarInput placeholder="Search..." /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md ">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-md">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <form action={logout} className="w-full">
          <Button type="submit" variant="destructive" className="w-full flex items-center justify-center gap-2">
            <LogOut />
            <span>Log Out</span>
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
