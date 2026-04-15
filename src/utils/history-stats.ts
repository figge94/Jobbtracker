import type { Job } from '../types/job';

export type StatItem = {
  name: string;
  count: number;
};

export function normalizeValue(value?: string) {
  return value?.trim().replace(/\s+/g, ' ') || '';
}

export function formatMonthYear(dateString: string) {
  return new Date(dateString).toLocaleDateString('sv-SE', {
    month: 'long',
    year: 'numeric',
  });
}

export function getTopItem(stats: StatItem[]) {
  return stats[0] ?? null;
}

export function getOccupationStats(jobs: Job[]): StatItem[] {
  const counts: Record<string, number> = {};

  jobs.forEach((job) => {
    const key = normalizeValue(job.occupation) || 'Okänt';
    counts[key] = (counts[key] ?? 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'sv'));
}

export function getCompanyStats(jobs: Job[]): StatItem[] {
  const counts: Record<string, number> = {};

  jobs.forEach((job) => {
    const key = normalizeValue(job.company) || 'Okänt';
    counts[key] = (counts[key] ?? 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'sv'));
}
