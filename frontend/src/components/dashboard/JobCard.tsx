import { type JobCardProps } from "../../constants/dashboard";


    export const JobCard = ( { title, location, company, applicationCount }: JobCardProps ) => {

        return (
            <div className="p-4 rounded-lg hover:bg-[var(--color-surface-container-low)] transition-all duration-200 group cursor-pointer">
                <div className="flex justify-between items-center">
                        <div>
                        <h3 className="text-sm font-bold text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">{title}</h3>
                        <p className="text-[0.75rem] text-[var(--color-on-surface-variant)]/70 mt-0.5">{company} . {location || 'Remote'}</p>
                        </div>
                        <div className="text-right">
                        <span className="text-lg font-extrabold text-[var(--color-on-surface)]">{applicationCount}</span>
                        <p className="text-[0.65rem] font-bold text-[var(--color-on-surface-variant)]/50 uppercase tracking-tighter">Apps</p>
                        </div>
                        </div>
                        <div className="mt-4 h-1 w-full bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                        <div className={`h-full bg-[var(--color-primary)] rounded-full`} style={{ width: `${Math.min((applicationCount / 20) * 100, 100)}%`}}></div>
                </div>
            </div>
        );

    }
