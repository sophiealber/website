export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white">Education</h2>
        <div className="mt-2 w-12 h-1 bg-accent rounded-full" />

        <div className="mt-12 rounded-xl border border-white/10 bg-surface-raised p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Cornell University
              </h3>
              <p className="text-accent-light font-medium">
                B.S. Computer Science, College of Engineering
              </p>
            </div>
            <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
              Class of 2025
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-sm font-medium text-accent-light">
              Magna Cum Laude
            </span>
            <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-sm font-medium text-accent-light">
              GPA 3.935
            </span>
            <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-sm font-medium text-accent-light">
              Dean&apos;s Honor List
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
