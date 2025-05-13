import dayjs from 'dayjs';

export const formattedDate = dayjs().format('DD MMMM, YYYY');
export const formattedDateData = (date: string | any) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');
