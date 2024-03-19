export const toHHMMSS = (secs: number): string => {
  if (secs < 0 || isNaN(secs)) return 'Error';

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs / 60) % 60;
  const seconds = secs % 60;

  return [hours, minutes, seconds].map(num => (num < 10 ? `0${num}` : num)).join(':');
};
