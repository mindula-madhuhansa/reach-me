import { ViewChartData } from "@/types/Types";
import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";

export const getDatesBetween = (data: any, xLabelKey: any) => {
  const organizedData: any = [];

  data.forEach((value: any, index: number) => {
    const date = value.date;

    organizedData.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });

    const nextDate = data?.[index + 1]?.date;

    if (date && nextDate) {
      const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));

      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBewtween = formatISO9075(addDays(parseISO(date), i)).split(
            " "
          )[0];
          organizedData.push({
            date: dateBewtween,
            [xLabelKey]: 0,
          });
        }
      }
    }
  });

  return organizedData;
};
