import {
    LayoutDashboard,
    Briefcase,
    Users,
    Settings,
    Search,
    Bell,
    HelpCircle,
    TrendingUp,
    Zap,
    Clock,
    CheckCircle,
    UserPlus,
    GitPullRequest,
    MessageCircle,Plus
    
} from 'lucide-react';

export const iconMap = {
    // Navigation
    dashboard: LayoutDashboard,
    work: Briefcase,
    group: Users,
    settings: Settings,

    // Header
    search: Search,
    notifications: Bell,
    help: HelpCircle,

    // Stats & Activity
    trending_up: TrendingUp,
    bolt: Zap,
    pending: Clock,
    verified: CheckCircle,
    person_add: UserPlus,
    published_with_changes: GitPullRequest,
    chat_bubble: MessageCircle,
    add_circle: Plus
}

export type IconName = keyof typeof iconMap;
