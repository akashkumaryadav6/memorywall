import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Check, Play, Image as ImageIcon, GripVertical } from "lucide-react";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaStore, type MediaItem } from "@/lib/media-store";

export const Route = createFileRoute("/folder")({
  head: () => ({
    meta: [
      { title: "Folder View — MemoryWall" },
      { name: "description", content: "Review, reorder and edit labels for your event media." },
    ],
  }),
  component: FolderPage,
});

function SortableCard({
  item,
  index,
  isEditing,
  onEdit,
  onDone,
  onUpdate,
}: {
  item: MediaItem;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onDone: () => void;
  onUpdate: (patch: Partial<MediaItem>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: isEditing,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass group overflow-hidden rounded-2xl transition-shadow hover:shadow-[var(--shadow-elegant)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.url}
          alt={item.fileName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
          {item.type === "video" ? (
            <Play className="h-3 w-3 fill-current" />
          ) : (
            <ImageIcon className="h-3 w-3" />
          )}
          {item.type}
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-2 py-1 text-[10px] font-semibold backdrop-blur">
          #{index + 1}
        </div>
        {!isEditing && (
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="absolute bottom-3 right-3 flex h-9 w-9 cursor-grab items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md backdrop-blur transition-opacity hover:bg-background group-hover:opacity-100 active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="space-y-3 p-4">
        {isEditing ? (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Event Name
              </label>
              <Input
                value={item.eventName}
                onChange={(e) => onUpdate({ eventName: e.target.value })}
                className="mt-1 h-9"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                File Name
              </label>
              <Input
                value={item.fileName}
                onChange={(e) => onUpdate({ fileName: e.target.value })}
                className="mt-1 h-9"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tag
              </label>
              <Input
                value={item.tag}
                onChange={(e) => onUpdate({ tag: e.target.value })}
                className="mt-1 h-9"
              />
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {item.eventName}
              </div>
              <div className="truncate text-sm font-semibold">{item.fileName}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-accent/40 px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                {item.tag}
              </span>
              <span className="text-[10px] text-muted-foreground">{item.id}</span>
            </div>
          </>
        )}
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          className="w-full rounded-full"
          onClick={isEditing ? onDone : onEdit}
        >
          {isEditing ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5" /> Done
            </>
          ) : (
            <>
              <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit Labels
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function FolderPage() {
  const navigate = useNavigate();
  const items = useMediaStore((s) => s.items);
  const setItems = useMediaStore((s) => s.setItems);
  const updateItem = useMediaStore((s) => s.updateItem);
  const [editing, setEditing] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-soft)" }}>
      <AppNav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground">
              Step 2 of 3 · Folder View
            </div>
            <h1 className="rainbow-text text-5xl font-bold tracking-tight">Review your library.</h1>
            <p className="mt-2 text-muted-foreground">
              {items.length} item{items.length !== 1 ? "s" : ""} · Drag the handle to reorder · Tap a card to edit.
            </p>
          </div>
          <Button
            size="lg"
            className="rainbow-btn rounded-full px-6 shadow-[var(--shadow-elegant)] hover:opacity-90"
            onClick={() => navigate({ to: "/preview" })}
          >
            Generate Preview →
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, idx) => (
                <SortableCard
                  key={item.id}
                  item={item}
                  index={idx}
                  isEditing={editing === item.id}
                  onEdit={() => setEditing(item.id)}
                  onDone={() => setEditing(null)}
                  onUpdate={(patch) => updateItem(item.id, patch)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {items.length === 0 && (
          <div className="glass rounded-2xl border-dashed p-16 text-center">
            <p className="text-muted-foreground">No media yet. Head back to Intake to upload.</p>
          </div>
        )}
      </main>
    </div>
  );
}
