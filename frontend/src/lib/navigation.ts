import { type IconName } from "./iconMapping";

export interface NavigationItem {
    name: string
    href: string
    icon: IconName
    badge?: string | number
}

export const navigation: NavigationItem[] = [
    {
        name: 'Dashboard',
        href: '/dashboard/overview',
        icon: 'dashboard'
    },
    {
        name: 'Jobs',
        href: '/dashboard/jobs',
        icon: 'work'
    },
    {
        name: 'Candidates',
        href: '/dashboard/candidates',
        icon: 'group',
        badge: 5
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: 'settings'
    }
]
