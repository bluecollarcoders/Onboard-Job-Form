import { STATS_CONFIG, VARIANT_STYLES, type StatKey } from "../../constants/dashboard"; 

interface StatCardProps {
    statKey: StatKey;
    value: string | number;
    trend: string;
}

export const StatCard = ( { statKey, value, trend }: StatCardProps ) => {

    const { label, icon: Icon, variant } = STATS_CONFIG[statKey];
    const variantClasses = VARIANT_STYLES[variant];

    return (

        <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl border border-[var(--color-outline-variant)]/15 flex flex-col gap-1">
          <span className="text-[0.6875rem] font-bold tracking-widest text-[var(--color-on-surface-variant)] uppercase">{label}</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-4xl font-extrabold tracking-tighter text-[var(--color-on-surface)]">{value}</span>
            <div className={`flex items-center text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full ${variantClasses}`}>
              <Icon className="w-3 h-3 mr-0.5" />
              {trend}
            </div>
          </div>
        </div>

    );
};
