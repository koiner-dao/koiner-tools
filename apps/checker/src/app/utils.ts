import { round } from 'mathjs';

export const tokenAmount = (units: number, decimals: number): number => {
  return round(units / Math.pow(10, decimals), decimals);
};
