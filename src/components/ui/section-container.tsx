
interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({ children, className = "" }: SectionContainerProps) {
  return (
    <div className={`container max-w-7xl py-8 px-4 space-y-6 ${className}`}>
      {children}
    </div>
  );
}
