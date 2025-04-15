
import { theme } from "@/config/theme";

export function LayoutSection() {
  const DemoBox = () => (
    <div className="bg-primary/10 p-4 rounded">
      Demo Content
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Grid Layouts</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Grid 2 Coloane</h4>
            <div className={theme.layouts.grid2Cols}>
              <DemoBox />
              <DemoBox />
            </div>
            <code className="text-sm text-muted-foreground mt-2 block">
              theme.layouts.grid2Cols
            </code>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Grid 3 Coloane</h4>
            <div className={theme.layouts.grid3Cols}>
              <DemoBox />
              <DemoBox />
              <DemoBox />
            </div>
            <code className="text-sm text-muted-foreground mt-2 block">
              theme.layouts.grid3Cols
            </code>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Grid 4 Coloane</h4>
            <div className={theme.layouts.grid4Cols}>
              <DemoBox />
              <DemoBox />
              <DemoBox />
              <DemoBox />
            </div>
            <code className="text-sm text-muted-foreground mt-2 block">
              theme.layouts.grid4Cols
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
