import { StatCard } from "../components/dashboard/StatsCard";
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
    Plus           
} from 'lucide-react';



export const Overview = () => {

  const { data, isLoading, error } = useDashboardStats();

  const statsData = [
    { statKey: 'activeJobs', value: data?.activeJobs || 0, trend: '+2 week' },
    { statKey: 'newApps', value: data?.newApps || 0, trend: '+5 today' },
    { statKey: 'inPipeline', value: data?.inPipeline || 0, trend: '+3 today' },
    { statKey: 'hired', value: data?.hired || 0, trend: '+1 week' },
  ] as const;


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
              {/* Activity Item 1 */}
              <div className="p-6 flex gap-4 hover:bg-[var(--color-surface-container-low)] transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <UserPlus className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-[var(--color-on-surface)]">New application from <span className="text-[var(--color-primary)] cursor-pointer">Sarah Jenkins</span></p>
                    <span className="text-[0.6875rem] text-[var(--color-on-surface-variant)]/60 font-medium">14m ago</span>
                  </div>
                  <p className="text-[0.8125rem] text-[var(--color-on-surface-variant)] mt-1">Applied for Senior Product Designer role. Top 5% match score.</p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="p-6 flex gap-4 hover:bg-[var(--color-surface-container-low)] transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-[var(--color-tertiary)]/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[var(--color-tertiary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-[var(--color-on-surface)]">Status Update: <span className="text-[var(--color-on-surface)]">Michael Wu</span></p>
                    <span className="text-[0.6875rem] text-[var(--color-on-surface-variant)]/60 font-medium">2h ago</span>
                  </div>
                  <p className="text-[0.8125rem] text-[var(--color-on-surface-variant)] mt-1">Moved from <span className="bg-[var(--color-surface-container-high)] px-1.5 py-0.5 rounded text-[0.75rem]">Initial Screening</span> to <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-1.5 py-0.5 rounded text-[0.75rem]">Technical Interview</span>.</p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="p-6 flex gap-4 hover:bg-[var(--color-surface-container-low)] transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-[var(--color-on-surface)]">Offer Accepted: <span className="text-[var(--color-primary)]">Elena Rodriguez</span></p>
                    <span className="text-[0.6875rem] text-[var(--color-on-surface-variant)]/60 font-medium">5h ago</span>
                  </div>
                  <p className="text-[0.8125rem] text-[var(--color-on-surface-variant)] mt-1">Elena has signed the offer letter for Clinical Data Scientist.</p>
                </div>
              </div>

              {/* Activity Item 4 */}
              <div className="p-6 flex gap-4 hover:bg-[var(--color-surface-container-low)] transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-[var(--color-on-surface)]">New internal note from <span className="text-[var(--color-on-surface)]">David Chen</span></p>
                    <span className="text-[0.6875rem] text-[var(--color-on-surface-variant)]/60 font-medium">Yesterday</span>
                  </div>
                  <p className="text-[0.8125rem] text-[var(--color-on-surface-variant)] mt-1 italic">"Sarah showed exceptional technical depth during the initial call. Recommend moving fast."</p>
                </div>
              </div>
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
            <div className="p-4 rounded-lg hover:bg-[var(--color-surface-container-low)] transition-all duration-200 group cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">Clinical Data Scientist</h3>
                  <p className="text-[0.75rem] text-[var(--color-on-surface-variant)]/70 mt-0.5">San Francisco • Remote</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[var(--color-on-surface)]">14</span>
                  <p className="text-[0.65rem] font-bold text-[var(--color-on-surface-variant)]/50 uppercase tracking-tighter">Apps</p>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-primary)] w-3/4 rounded-full"></div>
              </div>
            </div>

            {/* Job Item 2 */}
            <div className="p-4 rounded-lg hover:bg-[var(--color-surface-container-low)] transition-all duration-200 group cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">Senior Product Designer</h3>
                  <p className="text-[0.75rem] text-[var(--color-on-surface-variant)]/70 mt-0.5">Austin • Hybrid</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[var(--color-on-surface)]">8</span>
                  <p className="text-[0.65rem] font-bold text-[var(--color-on-surface-variant)]/50 uppercase tracking-tighter">Apps</p>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-primary)] w-1/3 rounded-full"></div>
              </div>
            </div>

            {/* Job Item 3 */}
            <div className="p-4 rounded-lg hover:bg-[var(--color-surface-container-low)] transition-all duration-200 group cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">Backend Engineer (Rust)</h3>
                  <p className="text-[0.75rem] text-[var(--color-on-surface-variant)]/70 mt-0.5">London • On-site</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[var(--color-on-surface)]">32</span>
                  <p className="text-[0.65rem] font-bold text-[var(--color-on-surface-variant)]/50 uppercase tracking-tighter">Apps</p>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-primary)] w-1/2 rounded-full"></div>
              </div>
            </div>

            {/* Job Item 4 */}
            <div className="p-4 rounded-lg hover:bg-[var(--color-surface-container-low)] transition-all duration-200 group cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">Talent Ops Lead</h3>
                  <p className="text-[0.75rem] text-[var(--color-on-surface-variant)]/70 mt-0.5">Global • Remote</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[var(--color-on-surface)]">5</span>
                  <p className="text-[0.65rem] font-bold text-[var(--color-on-surface-variant)]/50 uppercase tracking-tighter">Apps</p>
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-primary)] w-1/4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
