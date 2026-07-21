import type { Job } from '../types/job';

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getJobDateLabel(job: Job): string {
  if (job.status === 'vill_soka') {
    return `Sparades ${formatDate(job.createdAt)}`;
  }

  if (job.appliedAt) {
    return `Sökt ${formatDate(job.appliedAt)}`;
  }

  return '';
}
