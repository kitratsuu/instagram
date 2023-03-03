import { Timestamp } from "firebase/firestore";
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export function diffbetdates(firedate: Timestamp) {
  // const startTime = new Date(2018, 9, 1, 5, 20, 45);
  const startTime = firedate.toDate();

  const endTime = new Date();
  const diffinsecs = differenceInSeconds(endTime, startTime, {
    roundingMethod: "floor",
  });
  const diffinmins = differenceInMinutes(endTime, startTime, {
    roundingMethod: "floor",
  });
  const diffinhours = differenceInHours(endTime, startTime, {
    roundingMethod: "floor",
  });
  const diffindays = differenceInDays(endTime, startTime);
  const diffinmonths = differenceInMonths(endTime, startTime);
  const diffinyears = differenceInYears(endTime, startTime);

  if (diffinsecs < 60) {
    return `${diffinsecs} secs ago`;
  }
  if (diffinmins < 60) {
    return `${diffinmins} mins ago`;
  }
  if (diffinhours < 24) {
    return `${diffinhours} hrs ago`;
  }
  if (diffindays < 30) {
    return `${diffindays} days ago`;
  }
  if (diffinmonths < 12) {
    return `${diffinmonths} months ago`;
  }
  if (diffinmonths >= 12) {
    return `${diffinyears} yrs ago`;
  }

  return "";
}
