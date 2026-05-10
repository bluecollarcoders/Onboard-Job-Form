import { VARIANT_STYLES, ICON_STYLES, type ActivityCardProps } from "../../constants/dashboard"; 
import { formatDistanceToNow } from "date-fns";

export const ActivityCard = ( { icon, message, description, timestamp, personName, onPersonClick, variant, }: ActivityCardProps ) => {

    const IconComponent = icon;
    const variantStyles = VARIANT_STYLES[variant];
    const iconStyles = ICON_STYLES[variant];
    const formattedTime = formatDistanceToNow(
        new Date(timestamp),
        {addSuffix: true}
    );

    return (  
            <div className="p-6 flex gap-4 hover:bg-[var(--color-surface-container-low)] transition-colors duration-200">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${variantStyles}`}>
                  <IconComponent className={`w-5 h-5 ${iconStyles}`}/>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-[var(--color-on-surface)]">{message}
                            <span className="text-[var(--color-primary)] p-2 cursor-pointer"
                            onClick={onPersonClick}
                            >
                            {personName}</span>
                        </p>
                        <span className="text-[0.6875rem] text-[var(--color-on-surface-variant)]/60 font-medium">{formattedTime}</span>
                  </div>
                  <p className="text-[0.8125rem] text-[var(--color-on-surface-variant)] mt-1">{description}</p>
                </div>
            </div>

    );

}
