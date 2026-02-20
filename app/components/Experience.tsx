const experiences = [
  {
    role: "Software Engineer",
    company: "Datadog",
    period: "2025 — Present",
    description:
      "Building monitoring and observability tools that help engineering teams understand and optimize their systems at scale.",
  },
  {
    role: "Software Engineer Intern",
    company: "Cisco Meraki",
    period: "Sep — Dec 2024",
    description:
      "Worked on the Smart Camera Backend & Cloud team, building and improving cloud infrastructure for Meraki's smart camera platform.",
  },
  {
    role: "Software Engineer Intern",
    company: "Datadog",
    period: "Summer 2024",
    description:
      "Contributed to product features and internal tooling, collaborating with cross-functional teams to ship impactful improvements.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-surface-raised">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white">Experience</h2>
        <div className="mt-2 w-12 h-1 bg-accent rounded-full" />

        <div className="mt-12 space-y-12">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="relative pl-8 border-l-2 border-white/10"
            >
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-surface-raised" />
              <p className="text-sm text-gray-500 font-medium">{exp.period}</p>
              <h3 className="mt-1 text-xl font-semibold text-white">
                {exp.role}
              </h3>
              <p className="text-accent-light font-medium">{exp.company}</p>
              <p className="mt-2 text-gray-400 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
