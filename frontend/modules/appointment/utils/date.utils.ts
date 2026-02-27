// features/appointments/utils/date.utils.ts

export function getWeekRange(date: Date) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // lunes

  const weekStart = new Date(start.setDate(diff));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const format = (d: Date) =>
    d.toISOString().split("T")[0];

  return {
    start_date: format(weekStart),
    end_date: format(weekEnd),
  };
}