import type { Job } from '../types/job';

export function isActivityReportPeriod(date = new Date()) {
  const day = date.getDate();
  return day >= 1 && day <= 14;
}

export function getPreviousMonthJobs(jobs: Job[], date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const end = new Date(date.getFullYear(), date.getMonth(), 1);

  return jobs.filter((job) => {
    if (!job.appliedAt) {
      return false;
    }

    const appliedAt = new Date(job.appliedAt);
    return appliedAt >= start && appliedAt < end;
  });
}
