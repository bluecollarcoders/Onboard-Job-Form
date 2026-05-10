import { TrendingUp, Bolt, Clock, CheckCircle, type LucideIcon } from "lucide-react";

export type StatKey = 'activeJobs' | 'newApps' | 'inPipeline' | 'hired';

export type VariantKey = 'primary' | 'secondary' | 'warning' | 'success';

export interface ActivityCardProps {
    icon: LucideIcon;
    variant: VariantKey;
    message: string;
    personName: string;
    description: string
    timestamp: Date | number | string;
    onPersonClick?: () => void;
}

export interface JobCardProps {
    id: string;
    title: string;
    company: string;
    location: string | null;
    applicationCount: number;
}

interface StatConfig {
    label: string;
    icon: LucideIcon;
    variant: VariantKey;
}

export const VARIANT_STYLES = {
    primary: 'text-[var(--color-primary)] bg-[var(--color-primary)]/10',
    secondary: 'text-[var(--color-on-surface-variant)] bg-[var(--color-surface-container-high)]',
    warning: 'text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10',
    success: 'text-green-600 bg-green-500/10',
} as const;

export const ICON_STYLES = {
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-on-surface-variant)]',
    warning: 'text-[var(--color-tertiary)]',
    success: 'text-green-600'
} as const;

export const STATS_CONFIG: Record<StatKey, StatConfig> = {
    activeJobs: { label: 'Active Jobs', icon: TrendingUp, variant: 'primary' },
    newApps:    { label: 'New Apps', icon: Bolt, variant: 'secondary' },
    inPipeline:   { label: 'In Pipeline', icon: Clock, variant: 'warning' },
    hired:      { label: 'Hired', icon: CheckCircle, variant: 'success' },
}
