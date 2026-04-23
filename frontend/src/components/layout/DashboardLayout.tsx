import { Outlet } from "react-router-dom";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { cn } from "../../lib/utils";


export const DashboardLayout = () => {
    const {
        shouldShowBottomNav,
        shouldCollapseSidebar,
        isMobile
    } = useBreakpoint()

    return (
        <div className="flex min-h-screen bg-[var(--color-background)] antialiased">
            {/* {Desktop Sidebar - PLACEHOLDER} */}
            {!isMobile && (
                <aside className={cn(
                    "h-screen sticky top-0 shrink-0 overflow-y-auto",
                    "flex flex-col p-4 transition-all duration-300",

                    "bg-[var(--color-surface-container-low)]",
                    "border-r border-[var(--color-outline-variant)]/15",

                    shouldCollapseSidebar ? "w-16" : "w-64"
                )}>
                <div className={cn(
                    "mb-8 px-2 transition-opacity duration-300",
                    shouldCollapseSidebar ? "opacity-0 pointer-events-none" : "opacity-100"
                )}>
                    <span className="text-lg font-bold tracking-tighter text-[var(--color-on-surface)]">
                        Clinical Curator
                    </span>
                    {!shouldCollapseSidebar && (
                        <span className="text-xs text-[var(--color-on-surface-variant)] opacity-70 block">
                            Precision Recruiting
                        </span>
                    )}
                </div>

                {/* Placehoder Navigation */}
                <nav className="flex-1 space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--color-surface-container-lowest)] text-[var(--color-primary)] font-semibold">
                     📊 {!shouldCollapseSidebar && "Dashboard"}
                    </div>

                    <div className="flex items-center gap-3 px-3 px-2.5 rounded-lg text-[var(--color-on-surface-variant)]">
                        💼 {!shouldCollapseSidebar && "Jobs"}
                    </div>

                    <div className="flex items-center gap-3 px-3 px-2.5 rounded-lg text-[var(--color-on-surface-variant)]">
                        👥 {!shouldCollapseSidebar && "Candidates"}
                    </div>
                </nav>

                </aside>
            )}

            {/* Main Content Area */}
            <main className={cn(
                "flex-1 min-w-0",

                    // Mobile: Add bottom padding for the Nav
                    {
                        'mb-24': isMobile && shouldShowBottomNav,
                    }
                )}>

                    {/* Header Placeholder */}
                    <header className=
                    "h-16 bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-outline-variant)]/15 flex items-center px-6">
                        <h1 className={cn(
                                "text-lg font-bold text-[var(--color-on-surface)]",
                                isMobile ? "Clinical Curator" : "Dashboard"
                            )}>
                        </h1>
                    </header>

                    {/* Page Content */}
                    <div className="p-6 md:p-10 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
            </main>

            {/* Mobile Bottom Navigation - PLACEHOLDER */}
            {shouldShowBottomNav && (
            <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-t border-[var(--color-outline-variant)]/30">
                <div className="flex justify-around items-center px-4 pb-6 pt-2">
                    <div className="flex flex-col items-center text-[var(--color-primary)] bg-[var(--color-primary)]/10 rounded-xl px-4 py-1.5">
                        📊
                        <span className="text-xs font-bold mt-0.5">Dashboard</span>
                    </div>
                    <div className="flex flex-col items-center text-[var(--color-on-surface-variant)] px-4 py-1.5">
                        💼
                        <span className="text-xs font-bold mt-0.5">Jobs</span>
                    </div>
                    <div className="flex flex-col items-center text-[var(--color-on-surface-variant)] px-4 py-1.5">
                        👥
                        <span className="text-xs font-bold mt-0.5">Candidates</span>
                    </div>
                </div>
            </nav>  
            )}
        </div>
    )
}
