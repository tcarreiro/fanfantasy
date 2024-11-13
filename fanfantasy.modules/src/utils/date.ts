export const formatMatchDate = (timestamp:number):string => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date).replace(".", "").replace(",","");
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

export const getCurrentSeason = ():number => {
  const today = new Date();
  if ((today.getMonth() == 7 && today.getDay() >= 25) || today.getMonth() >= 8) return today.getFullYear();
  return today.getFullYear()-1;
}