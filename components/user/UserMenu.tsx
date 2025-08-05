'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Settings, Bell, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const UserMenu = () => {
  const { logout,user } = useAuth();
  const router = useRouter();
  const handleProfile = () => router.push('/settings/profile');
  const handleNotifications = () => router.push('/settings/notifications');
  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant="ghost" size="icon">
          <User className="hidden md:flex h-5 w-5" />
          <div className=' md:hidden '>Profilim</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='bg-white'>
        <DropdownMenuLabel>Hesap</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleProfile}>
          <Settings className="mr-2 h-4 w-4" />
          Kişisel Ayarlar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleNotifications}>
          <Bell className="mr-2 h-4 w-4" />
          Bildirim Ayarları
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
