import dayjs from 'dayjs';

export function formatDate(dateStr: string) {
  const d = dayjs(dateStr, 'MM/DD/YYYY');
  return d.format('YYYY-MM-DD');
}

export function formatDateTime(dateStr: string) {
  const d = dayjs(dateStr, 'MM/DD/YYYY HH:mm:ss');
  return d.format('YYYY-MM-DD');
}
