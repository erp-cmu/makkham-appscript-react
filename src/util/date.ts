import dayjs from 'dayjs';

export function formatDateTime(dateStr: string | undefined | null) {
  // If dateStr is null, undefined, or empty string, return an empty string
  if (!dateStr) {
    return '';
  }
  // Check if the date string contains time information (e.g., "MM/DD/YYYY HH:mm:ss")
  if (dateStr.includes(':')) {
    const d = dayjs(dateStr, 'MM/DD/YYYY HH:mm:ss');
    // Remove time information and return only the date part in "YYYY-MM-DD" format
    return d.format('YYYY-MM-DD');
  } else {
    const d = dayjs(dateStr, 'MM/DD/YYYY');
    return d.format('YYYY-MM-DD');
  }
}
