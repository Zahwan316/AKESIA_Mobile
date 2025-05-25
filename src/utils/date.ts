import dayjs from 'dayjs';

export const formattedDate = dayjs().format('DD MMMM, YYYY');
export const formattedDateData = (date: string | any) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');
export const formattedDateDataWithoutHour = (date: string | any) => dayjs(date).format('YYYY-MM-DD');
export const totalDayWeek = (date: string) => {
  const now = dayjs();
  const selectedDate = dayjs(date);

  const weeks = now.diff(selectedDate, 'week'); // hitung berapa minggu
  const days = now.diff(selectedDate, 'day');   // hitung berapa hari

  return { weeks, days };
};
