export const COMMUTE_CITIES = ['norrköping', 'linköping', 'finspång'];

export const CURRENT_OCCUPATIONS = ['fullstack', 'frontend', 'ux', 'webmaster'];

export const JOB_GOALS = {
  total: 6,
  outsideCommute: 3,
  otherOccupation: 2,
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function isOutsideCommute(city: string) {
  if (!city.trim()) return false;
  return !COMMUTE_CITIES.includes(normalize(city));
}

export function isOtherOccupation(occupation: string) {
  if (!occupation.trim()) return false;

  const value = normalize(occupation);

  return !CURRENT_OCCUPATIONS.some((item) => value.includes(item));
}
