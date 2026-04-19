import { ShieldAlert } from "lucide-react";

export function SafetyPanel() {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <ShieldAlert className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold">Safety Panel</h3>
      </div>
      <ul className="space-y-1.5 text-xs text-muted-foreground">
        <li>• Use only public / shareable media.</li>
        <li>• No confidential or UPSI content.</li>
        <li>• Human review required before sharing.</li>
        <li>• No PII, internal documents, or chat data.</li>
      </ul>
    </div>
  );
}
