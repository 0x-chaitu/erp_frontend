import { BusFrontIcon, LayoutDashboardIcon, LogIn, User, User2Icon } from 'lucide-react';

export type User = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
};


export type Employee = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: string;
    date_of_birth: string; // Consider using a proper date type if possible
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    longitude?: number; // Optional field
    latitude?: number; // Optional field
    job: string;
    profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: any[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboardIcon,
        label: 'Dashboard'
    },
    {
        title: 'User',
        href: '/dashboard/user',
        icon: User,
        label: 'user'
    },
    {
        title: 'Assets',
        href: '/dashboard/assets',
        icon: BusFrontIcon,
        label: 'assets'
    },
    {
        title: 'Profile',
        href: '/dashboard/profile',
        icon: User2Icon,
        label: 'profile'
    },
    //   {
    //     title: 'Kanban',
    //     href: '/dashboard/kanban',
    //     icon: 'kanban',
    //     label: 'kanban'
    //   },
    {
        title: 'Login',
        href: '/',
        icon: LogIn,
        label: 'login'
    }
];