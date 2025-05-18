export const checkIsDataNull = (data: any) => {
  if(data === null || data === undefined) {
    return true;
  }
  return false;
};

export const checkIsDataFormNull = (data: any) => {
  return !data || !Array.isArray(data.data) || data.data.length === 0;
};
