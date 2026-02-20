export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white">About</h2>
        <div className="mt-2 w-12 h-1 bg-accent rounded-full" />

        <div className="mt-8 space-y-4 text-gray-400 leading-relaxed text-lg">
          <p>
            I&apos;m a software engineer at{" "}
            <span className="text-gray-200">Datadog</span>, where I work on
            building tools that help engineering teams monitor and optimize their
            systems at scale. I graduated from{" "}
            <span className="text-gray-200">Cornell University</span> with a
            B.S. in Computer Science, earning Magna Cum Laude honors.
          </p>
          <p>
            I&apos;m passionate about writing clean, reliable code and solving
            complex problems with thoughtful engineering. Whether it&apos;s
            designing backend systems or improving developer workflows, I enjoy
            work that has a tangible impact on the people who use it.
          </p>
          <p>
            Originally from Cleveland, OH, I&apos;m now based in Boston, MA.
            Outside of work, I enjoy exploring the city, staying active, and
            continuously learning new technologies.
          </p>
        </div>
      </div>
    </section>
  );
}
