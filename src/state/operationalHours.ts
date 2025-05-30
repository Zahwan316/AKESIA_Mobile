export function isWithinOperationalHours(date: Date): boolean {
  const day = date.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (day === 0) return false; // Minggu tidak buka

  // Hari ini (misalnya pengecekan manual)
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return (
      (hour === 10 || (hour === 11 && minute <= 30)) ||
      (hour >= 13 && hour < 15)
    );
  }

  // Senin–Jumat
  if (day >= 1 && day <= 5) {
    return hour >= 13 && hour < 19;
  }

  // Sabtu
  if (day === 6) {
    return hour >= 10;
  }

  return false;
}
