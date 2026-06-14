export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    lessonId: `modulo-${i + 1}`,
  }));
}

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
