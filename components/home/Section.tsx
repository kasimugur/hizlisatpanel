// components/Section.tsx
interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string; // ek stil gerekirse
}

export function Section({
  id,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`max-w-7xl mx-auto px-6 py-20 ${className}`}
    >
      <h2
        id={`${id}-title`}
        className="text-3xl font-extrabold text-indigo-700 text-center mb-12"
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
