import { format, parseISO, isToday } from "date-fns";

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  if (isToday(date)) {
    // Format to show only time if the date is today
    return format(date, "h:mm a");
  } else {
    // Format to show full date otherwise
    return format(date, "MMMM d, yyyy");
  }
}