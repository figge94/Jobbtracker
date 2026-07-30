// utils/job-form-validation.ts

import type { JobFormValues } from './job-form';

export type JobFormValidationError = {
  title: string;
  description: string;
};

export function validateJobForm(values: JobFormValues): JobFormValidationError | null {
  if (!values.company.trim() || !values.title.trim()) {
    return {
      title: 'Saknar information',
      description: 'Fyll i företag och titel.',
    };
  }

  if (values.status !== 'vill_soka' && !values.appliedAt.trim()) {
    return {
      title: 'Saknar ansökningsdatum',
      description: 'Ange vilket datum du sökte jobbet.',
    };
  }

  if (values.status === 'intervju' && !values.interviewAt.trim()) {
    return {
      title: 'Saknar intervjutid',
      description: 'Ange datum och tid för intervjun.',
    };
  }

  return null;
}
