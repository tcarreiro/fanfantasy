export const generateRandomId = (length?:number):string => {
  if(!length) length = 10;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getRandomNumber = (max: number, min?: number): number => {
  if (!min) min = 0;
  return Math.floor(Math.random() * (max - min)) + min;
};