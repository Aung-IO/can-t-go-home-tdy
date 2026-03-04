import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import * as React from "react";
import type { DayButton } from "react-day-picker";

type HighlightType = "even" | "odd" | null;

interface HighlightedCalendarProps {
  highlightType: HighlightType;
}

function HighlightedDayButton({
  day,
  modifiers,
  className,
  highlightType,
  ...props
}: React.ComponentProps<typeof DayButton> & { highlightType: HighlightType }) {
  const dayNumber = day.date.getDate();
  const isHighlighted =
    highlightType === "even"
      ? dayNumber % 2 === 0
      : highlightType === "odd"
        ? dayNumber % 2 !== 0
        : false;

  return (
    <CalendarDayButton
      day={day}
      modifiers={modifiers}
      className={cn(
        className,
        isHighlighted &&
          !modifiers.selected &&
          "bg-green-500/20 text-green-800 hover:bg-green-500/30 dark:text-green-300 dark:bg-green-500/25 font-semibold",
      )}
      {...props}
    />
  );
}

export function HighlightedCalendar({
  highlightType,
}: HighlightedCalendarProps) {
  return (
    <Calendar
      mode="single"
      className="w-full [--cell-size:--spacing(10)] px-15"
      classNames={{
        root: "w-full",
        months: "w-full",
        month: "w-full",
        // Override the default px-(--cell-size) padding that was reserved for nav arrows
        month_caption:
          "flex h-(--cell-size) w-full items-center justify-center px-0",
        table: "w-full border-collapse",
        weekdays: "w-full flex",
        weekday: "flex-1 text-center",
        week: "w-full flex",
        day: "flex-1 aspect-square text-center",
        nav: "hidden",
      }}
      components={{
        DayButton: (props) => (
          <HighlightedDayButton {...props} highlightType={highlightType} />
        ),
      }}
    />
  );
}
