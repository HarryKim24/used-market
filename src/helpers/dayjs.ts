import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export function fromNow(time: string | Date) {
  return dayjs(time).fromNow();
}

export function formatTime(time: string | Date, format = 'YYYY.MM.DD h:mm A') {
  return dayjs(time).format(format);
}

export function daysUntilDeleted(deletedAt: string | Date) {
  const deletedDate = new Date(deletedAt);
  const expireDate = new Date(deletedDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffTime = expireDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}
