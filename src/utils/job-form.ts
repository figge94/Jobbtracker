import type { Job, JobStatus } from '../types/job';
import { getAdIdFromUrl } from './job-ad';

export type JobFormValues = {
  company: string;
  title: string;
  url: string;
  city: string;
  employmentType: string;
  occupation: string;
  status: JobStatus;
  deadline: string;
  appliedAt: string;
  interviewAt: string;
  isOutsideCommuteDistance: boolean;
  isOtherOccupation: boolean;
};

export function formatFormDate(value: string | Date | null | undefined): string {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toISOString().split('T')[0];
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function createEmptyJobFormValues(): JobFormValues {
  return {
    company: '',
    title: '',
    url: '',
    city: '',
    employmentType: '',
    occupation: '',
    status: 'sokt',
    deadline: '',
    appliedAt: getToday(),
    interviewAt: '',
    isOutsideCommuteDistance: false,
    isOtherOccupation: false,
  };
}

export function getJobFormValues(job: Job): JobFormValues {
  return {
    company: job.company ?? '',
    title: job.title ?? '',
    url: job.url ?? '',
    city: job.city ?? '',
    employmentType: job.employmentType ?? '',
    occupation: job.occupation ?? '',
    status: job.status,
    deadline: formatFormDate(job.deadline),
    appliedAt: formatFormDate(job.appliedAt),
    interviewAt: job.interviewAt ?? '',
    isOutsideCommuteDistance: job.isOutsideCommuteDistance ?? false,
    isOtherOccupation: job.isOtherOccupation ?? false,
  };
}

export function buildJob(values: JobFormValues, editingJob: Job | null): Job {
  const requiresAppliedAt = values.status !== 'vill_soka';

  const commonValues = {
    company: values.company.trim(),
    title: values.title.trim(),
    url: values.url.trim(),
    city: values.city.trim(),
    employmentType: values.employmentType.trim(),
    occupation: values.occupation.trim(),
    status: values.status,
    deadline: formatFormDate(values.deadline),
    appliedAt: requiresAppliedAt ? formatFormDate(values.appliedAt) : '',
    interviewAt: values.interviewAt,
    isOutsideCommuteDistance: values.isOutsideCommuteDistance,
    isOtherOccupation: values.isOtherOccupation,
  };

  if (editingJob) {
    return {
      ...editingJob,
      ...commonValues,
      adId: getAdIdFromUrl(values.url) ?? editingJob.adId,
    };
  }

  return {
    id: crypto.randomUUID(),
    ...commonValues,
    createdAt: new Date().toISOString(),
    adId: getAdIdFromUrl(values.url) ?? undefined,
  };
}
