
import { theme } from "@/config/theme";

export function TypographySection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Titluri</h3>
        <div className="space-y-4">
          <div>
            <h1 className={theme.typography.h1}>Heading 1</h1>
            <code className="text-sm text-muted-foreground">theme.typography.h1</code>
          </div>
          <div>
            <h2 className={theme.typography.h2}>Heading 2</h2>
            <code className="text-sm text-muted-foreground">theme.typography.h2</code>
          </div>
          <div>
            <h3 className={theme.typography.h3}>Heading 3</h3>
            <code className="text-sm text-muted-foreground">theme.typography.h3</code>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Text</h3>
        <div className="space-y-4">
          <div>
            <p className={theme.typography.lead}>Text Lead</p>
            <code className="text-sm text-muted-foreground">theme.typography.lead</code>
          </div>
          <div>
            <p className={theme.typography.paragraph}>Paragraph</p>
            <code className="text-sm text-muted-foreground">theme.typography.paragraph</code>
          </div>
          <div>
            <p className={theme.typography.muted}>Muted Text</p>
            <code className="text-sm text-muted-foreground">theme.typography.muted</code>
          </div>
        </div>
      </div>
    </div>
  );
}
