export const ChangePrice = (harga: number, nameItem: string, age: number) => {
  if(nameItem === 'Healthy Massage'){
    if(age === 4 || age === 5){
      return harga + 10000;
    }
    else if(age > 5 /* && age <= 7 */){
      return harga + 20000;
    }
  }
  else if(nameItem === 'Paket Bapil Singgle'){
    if(age > 2){
      return harga + 10000;
    }
  }
  else if(nameItem === 'Paket Bapil Premium'){
    if(age > 2){
      return harga + 20000;
    }
  }

  return harga;
};
