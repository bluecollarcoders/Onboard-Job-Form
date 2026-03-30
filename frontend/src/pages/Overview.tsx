  export const Overview = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[var(--color-on-surface)]">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Test cards */}
          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl border border-[var(--color-outline-variant)]/15">
            <span className="text-xs font-bold uppercase text-[var(--color-on-surface-variant)]">Active Jobs</span>
            <div className="text-3xl font-bold text-[var(--color-on-surface)] mt-2">12</div>
          </div>

          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl border border-[var(--color-outline-variant)]/15">
            <span className="text-xs font-bold uppercase text-[var(--color-on-surface-variant)]">New Apps</span>
            <div className="text-3xl font-bold text-[var(--color-on-surface)] mt-2">24</div>
          </div>

          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl border border-[var(--color-outline-variant)]/15">
            <span className="text-xs font-bold uppercase text-[var(--color-on-surface-variant)]">In Pipeline</span>
            <div className="text-3xl font-bold text-[var(--color-on-surface)] mt-2">18</div>
          </div>

          <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl border border-[var(--color-outline-variant)]/15">
            <span className="text-xs font-bold uppercase text-[var(--color-on-surface-variant)]">Hired</span>
            <div className="text-3xl font-bold text-[var(--color-on-surface)] mt-2">3</div>
          </div>
        </div>

        <div className="bg-[var(--color-surface-container-lowest)] p-6 rounded-xl border border-[var(--color-outline-variant)]/15">
          <h3 className="font-bold text-[var(--color-on-surface)] mb-4">Recent Activity</h3>
          <p className="text-[var(--color-on-surface-variant)]">
            Testing the responsive layout. Resize your browser to see sidebar collapse and mobile bottom nav.
          </p>
        </div>
      </div>
    )
  }
