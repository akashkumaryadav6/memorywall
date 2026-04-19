import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles, Heart, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MemoryWall — Special Occasion Gifts" },
      { name: "description", content: "Create beautiful memory slideshows for birthdays, anniversaries, and special occasions. The perfect gift to cherish precious moments." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
      {/* Hero Section */}
      <div className="relative w-full h-full flex items-center justify-center text-center">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-6xl px-6">
          {/* Logo/Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-2xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>

          {/* Main Heading */}
          <h1 className="rainbow-text mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
            MemoryWall
          </h1>

          {/* Subtitle */}
          <p className="mb-6 text-lg text-muted-foreground sm:text-xl">
            Special Occasion Gifts for
          </p>

          {/* Occasions */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-foreground sm:text-base">
            <div className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm">
              <Heart className="h-4 w-4 text-primary" />
              <span>Birthdays</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm">
              <Gift className="h-4 w-4 text-primary" />
              <span>Anniversaries</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Celebrations</span>
            </div>
          </div>

          {/* Description */}
          <div className="mx-auto mb-8 max-w-2xl">
            <p className="text-base text-muted-foreground sm:text-lg">
              Create beautiful, personalized memory slideshows that capture life's most precious moments.
              The perfect gift to cherish and relive special memories forever.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="rainbow-btn group relative overflow-hidden rounded-full px-6 py-3 text-base font-semibold shadow-2xl transition-all hover:shadow-3xl hover:scale-105"
              onClick={() => navigate({ to: "/collect" })}
            >
              <span className="relative z-10 flex items-center gap-2">
                Cherish Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>

            <p className="text-sm text-muted-foreground">
              Free to create • No account required • Instant download
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}