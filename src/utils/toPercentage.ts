export function toPercentage(min: number, currSec: number): number {
  const percentage = (currSec / (min * 60)) * 100;

  return percentage;
}
