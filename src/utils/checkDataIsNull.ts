export const checkIsDataNull = (data: any) => {
  if(data === null || data === undefined) {
    return true;
  }
  return false;
};

export const checkIsDataFormNull = (data: any) => {
  if(Array.isArray(data?.data[0]) && data?.data.length === 0){
    return true;
  }
  return false;
};