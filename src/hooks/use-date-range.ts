
import { subDays, startOfMonth, endOfMonth } from "date-fns";

export const useDateRange = (period: "week" | "month" | "all") => {
  const getDateRange = () => {
    const now = new Date();
    if (period === "week") {
      return {
        from: subDays(now, 7),
        to: now
      };
    } else if (period === "month") {
      return {
        from: startOfMonth(now),
        to: endOfMonth(now)
      };
    }
    // Pentru "all", nu aplicăm filtru de dată
    return null;
  };

  return getDateRange();
};
