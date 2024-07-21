export const timeStampConverter = (time) => {
  const date = new Date(time);
  const minute = date.getMinutes();
  const hour = date.getHours();
  if (minute < 10) return `${hour}:0${minute}`;
  return `${hour}:${minute}`;
};
