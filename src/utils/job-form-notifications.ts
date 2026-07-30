// utils/job-form-notifications.ts

import type { Job } from '../types/job';
import { toaster } from '../components/ui/toaster';
import type { JobFormValidationError } from './job-form-validation';

export function showValidationError(error: JobFormValidationError) {
  toaster.create({
    ...error,
    type: 'error',
    closable: true,
  });
}

export function showJobUpdated(job: Job) {
  toaster.create({
    title: 'Jobb uppdaterat',
    description: `${job.title} uppdaterades.`,
    type: 'success',
    closable: true,
  });
}

export function showDuplicateJob(job: Job) {
  toaster.create({
    title: 'Jobbet finns redan',
    description: `${job.title} hos ${job.company} är redan sparat.`,
    type: 'warning',
    closable: true,
  });
}

export function showJobAdded(job: Job) {
  toaster.create({
    title: 'Jobb sparat',
    description: `${job.title} hos ${job.company} lades till.`,
    type: 'success',
    closable: true,
  });
}
