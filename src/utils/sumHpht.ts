import { totalDayWeek } from './date';

export const sumHpht = (hpht: string) => {
  if(hpht === null){
    return 0;
  }
  const result = totalDayWeek(hpht);
  return result.weeks;
};
