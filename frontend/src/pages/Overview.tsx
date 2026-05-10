import { StatCard } from "../components/dashboard/StatsCard";
import { ActivityCard } from "../components/dashboard/ActivityCard"; 
import { JobCard } from "../components/dashboard/JobCard";
import { useDashboardStats } from "../hooks/api/useDashboard";

import {
    TrendingUp,
    Bolt,
    Clock,
    CheckCircle,
    UserPlus,
    FileText,
    Users,
    MessageCircle,
    Plus,
    Briefcase,
    Target
} from 'lucide-react';


export const Overview = () => {

  const { data, isLoading, error } = useDashboardStats();

  const statsData = [
    { statKey: 'activeJobs', value: data?.activeJobs || 0, trend: '+2 week' },
    { statKey: 'newApps', value: data?.newApps || 0, trend: '+5 today' },
    { statKey: 'inPipeline', value: data?.inPipeline || 0, trend: '+3 today' },
    { statKey: 'hired', value: data?.hired || 0, trend: '+1 week' },
  ] as const;

  const getActivityIcon =(type: string) => {
    switch (type) {
      case 'new_application':
      return UserPlus;
      case 'new_job':
      return Briefcase;
      case 'status_update':
        return MessageCircle;
      case 'offer_accepted':
        return CheckCircle;
      default:
        return FileText;
    }
  }

  return (
    <div className="space-y-10">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map( (stat) => (
            <StatCard
            key={stat.statKey}
            statKey={stat.statKey}
            value={stat.value}
            trend={stat.trend}
            />
          ))}
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed (Left - 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-[var(--color-on-surface)] tracking-tight">Recent Activity</h2>
            <button className="text-xs font-semibold text-[var(--color-primary)] hover:underline transition-all">View audit log</button>
          </div>
          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl overflow-hidden border border-[var(--color-outline-variant)]/15">
            <div className="divide-y divide-[var(--color-outline-variant)]/10">

            {data?.recentActivity?.map( (activity) => (
              <ActivityCard
              key={activity.id}
              icon={getActivityIcon(activity.type)}
              message={activity.message}
              description={activity.description}
              timestamp={activity.timestamp}
              personName={activity.personName}
              variant="primary"
              />
            ))}

            </div>
          </div>
        </div>

        {/* Active Jobs (Right - 1 Column) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-[var(--color-on-surface)] tracking-tight">Active Jobs</h2>
            <button className="hover:text-[var(--color-primary)] transition-colors">
              <Plus className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
            </button>
          </div>

          <div className="bg-[var(--color-surface-container-lowest)] rounded-xl p-2 border border-[var(--color-outline-variant)]/15 space-y-1">
            {/* Job Item 1 */}
            {data?.activeJobsList?.map( (job) => (
              <JobCard 
              key={job.id}
              id={job.id}
              title={job.title}
              location={job.location}
              company={job.company}
              applicationCount={job.applicationCount}
              />
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}
