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
  const firstChar = prefix.trim()[0];
  if (!firstChar || !/\d/.test(firstChar)) return null;
  const digit = parseInt(firstChar, 10);
  return digit % 2 === 0 ? "even" : "odd";
}

export function CarNumberCalendar() {
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  const trimmed = prefix.trim();
  const isInvalidPrefix = trimmed.length > 0 && !/\d/.test(trimmed);
  const highlightType = isInvalidPrefix ? null : getHighlightType(prefix);

  const badgeColor =
    highlightType === "even" || highlightType === "odd"
      ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300"
      : "bg-muted text-muted-foreground border-border";

  return (
    <div className="flex items-start sm:items-center justify-center  sm:p-6">
      <Card >
        <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-primary text-primary-foreground">
              <CarIcon className="size-4 sm:size-5" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl">
                Car Plate Scheduler
              </CardTitle>
              <CardDescription className="text-xs">
                Enter your plate number to see your driving days
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
          {/* Car number input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Car Plate Number
            </label>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative flex-1 min-w-0">
                <Input
                  id="car-prefix"
                  placeholder="4A"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                  maxLength={4}
                  className="text-center text-base sm:text-lg font-mono font-bold tracking-widest uppercase h-10 sm:h-12 px-1"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-muted-foreground select-none shrink-0">
                /
              </span>
              <div className="relative flex-[2] min-w-0">
                <Input
                  id="car-suffix"
                  placeholder="8000"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  className="text-center text-base sm:text-lg font-mono font-bold tracking-widest h-10 sm:h-12 px-1"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Format: <span className="font-mono font-semibold">4A / 8000</span>{" "}
              — leading digit determines even/odd days
            </p>
          </div>

          {/* Invalid prefix error */}
          {isInvalidPrefix && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-xl shrink-0">🚫</span>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                your car is sucked
              </p>
            </div>
          )}

          {/* Status badge */}
          {!isInvalidPrefix && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground shrink-0">
                Allowed days:
              </span>
              {highlightType ? (
                <Badge
                  variant="outline"
                  className={`${badgeColor} font-semibold px-2.5 py-1 text-xs sm:text-sm transition-all duration-300`}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 shrink-0" />
                  {highlightType === "even"
                    ? "Even days (2, 4, 6…)"
                    : "Odd days (1, 3, 5…)"}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-muted-foreground text-xs sm:text-sm px-2.5 py-1"
                >
                  Enter your plate number above
                </Badge>
              )}
            </div>
          )}

          {/* Calendar */}
          {!isInvalidPrefix && (
            <div className="w-full overflow-hidden">
              <HighlightedCalendar highlightType={highlightType} />
            </div>
          )}

          {/* Legend */}
          {!isInvalidPrefix && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 shrink-0 rounded-sm bg-green-500/25 ring-1 ring-green-500/50" />
                Highlighted = your allowed driving days
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
