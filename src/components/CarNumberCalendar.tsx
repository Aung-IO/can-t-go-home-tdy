import { HighlightedCalendar } from "@/components/HighlightedCalendar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CarIcon } from "lucide-react";
import { useState } from "react";

function getHighlightType(prefix: string): "even" | "odd" | null {
  // The first character of the prefix is the plate digit (e.g. "4A" → "4")
  const firstChar = prefix.trim()[0];
  if (!firstChar || !/\d/.test(firstChar)) return null;
  const digit = parseInt(firstChar, 10);
  return digit % 2 === 0 ? "even" : "odd";
}

export function CarNumberCalendar() {
  const [prefix, setPrefix] = useState(""); // e.g. "4A"
  const [suffix, setSuffix] = useState(""); // e.g. "8000"

  const trimmed = prefix.trim();
  // Invalid: user typed something in the prefix but it has no digit
  const isInvalidPrefix = trimmed.length > 0 && !/\d/.test(trimmed);
  const highlightType = isInvalidPrefix ? null : getHighlightType(prefix);

  const badgeColor =
    highlightType === "even"
      ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300"
      : highlightType === "odd"
        ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300"
        : "bg-muted text-muted-foreground border-border";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-2xl border-0 ring-1 ring-black/5 dark:ring-white/10">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
              <CarIcon className="size-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Car Plate Scheduler</CardTitle>
              <CardDescription className="text-xs">
                Enter your plate number to see your driving days
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Car number input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Car Plate Number
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  id="car-prefix"
                  placeholder="4A"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                  maxLength={4}
                  className="text-center text-lg font-mono font-bold tracking-widest uppercase h-12"
                />
              </div>
              <span className="text-2xl font-bold text-muted-foreground select-none">
                /
              </span>
              <div className="relative flex-[2]">
                <Input
                  id="car-suffix"
                  placeholder="8000"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  className="text-center text-lg font-mono font-bold tracking-widest h-12"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Format: <span className="font-mono font-semibold">4A / 8000</span>{" "}
              — the leading digit determines even/odd days
            </p>
          </div>

          {/* Invalid prefix error */}
          {isInvalidPrefix && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-xl">🚫</span>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                your car is sucked
              </p>
            </div>
          )}

          {/* Status badge */}
          {!isInvalidPrefix && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Allowed days:
              </span>
              {highlightType ? (
                <Badge
                  variant="outline"
                  className={`${badgeColor} font-semibold px-3 py-1 text-sm transition-all duration-300`}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                  {highlightType === "even"
                    ? "Even days (2, 4, 6…)"
                    : "Odd days (1, 3, 5…)"}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-muted-foreground text-sm px-3 py-1"
                >
                  Enter your plate number above
                </Badge>
              )}
            </div>
          )}

          {/* Calendar — hidden when prefix is invalid */}
          {!isInvalidPrefix && (
            <div className="">
              <HighlightedCalendar highlightType={highlightType} />
            </div>
          )}

          {/* Legend */}
          {!isInvalidPrefix && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-green-500/25 ring-1 ring-green-500/50" />
                Highlighted = your allowed driving days
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
