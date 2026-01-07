import dayjs from "dayjs";
import jalaliPlugin from "@zoomit/dayjs-jalali-plugin";
import "dayjs/locale/fa"
import { toPersianDigits } from "./toPersianDigits";

// فعال‌سازی پلاگین جلالی
dayjs.extend(jalaliPlugin);
dayjs.locale("fa")

/**
 * فرمت کردن تاریخ به شمسی
 * @param {string|Date} dateString - تاریخ میلادی یا ISO
 * @returns {string} تاریخ شمسی به فرمت "۱۷ دی ۱۴۰۴ ساعت ۱۵:۳۰"
 */
export const formatJalaliDateTime = (dateString) => {
  if (!dateString) return "-";
  const formatted = dayjs(dateString).calendar("jalali").format("D MMMM YYYY [ساعت] HH:mm");
  return toPersianDigits(formatted)
};

/**
 * فقط تاریخ (بدون ساعت)
 */
export const formatJalaliDate = (dateString) => {
  if (!dateString) return "-";
  const formatted = dayjs(dateString).calendar("jalali").format("D MMMM YYYY");
  return toPersianDigits(formatted)
};

/**
 * فقط ساعت
 */
export const formatJalaliTime = (dateString) => {
  if (!dateString) return "-";
  const formatted = dayjs(dateString).calendar("jalali").format("HH:mm");
  return toPersianDigits(formatted)
};
