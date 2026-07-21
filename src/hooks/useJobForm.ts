import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
import type { Job, JobStatus } from '../types/job';
import { toaster } from '../components/ui/toaster';
import {
  isOtherOccupation as checkIsOtherOccupation,
  isOutsideCommute as checkIsOutsideCommute,
} from '../utils/job-rules';
import {
  buildJob,
  createEmptyJobFormValues,
  getJobFormValues,
  type JobFormValues,
} from '../utils/job-form';
import { useJobAdFetch } from './useJobAdFetch';

type Props = {
  onAdd: (job: Job) => boolean;
  editingJob: Job | null;
  onUpdate: (job: Job) => void;
  onCancelEdit: () => void;
};

export function useJobForm({
  onAdd,
  editingJob,
  onUpdate,
  onCancelEdit,
}: Props) {
  const [mode, setMode] =
    useState<'link' | 'manual'>('link');

  const [values, setValues] = useState<JobFormValues>(
    createEmptyJobFormValues
  );

  const {
    fetchAd,
    isFetching,
    adSource,
    resetAdFetch,
  } = useJobAdFetch();

  const isEditing = editingJob !== null;
  const requiresAppliedAt =
    values.status !== 'vill_soka';

  const isValid =
    values.company.trim() !== '' &&
    values.title.trim() !== '' &&
    (!requiresAppliedAt ||
      values.appliedAt.trim() !== '');

  const canFetch =
    values.url.trim() !== '' &&
    !isFetching &&
    !isEditing;

  const fieldsLocked =
    mode === 'link' &&
    adSource !== null &&
    !isEditing;

  const lockedStyles = useMemo(
    () =>
      fieldsLocked
        ? {
            bg: 'gray.100',
            _dark: { bg: 'gray.900' },
            cursor: 'not-allowed',
            opacity: 0.8,
            borderColor: 'gray.200',
          }
        : {},
    [fieldsLocked]
  );

  function updateField<K extends keyof JobFormValues>(
    field: K,
    value: JobFormValues[K]
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setValues(createEmptyJobFormValues());
    resetAdFetch();
  }

  useEffect(() => {
    if (editingJob) {
      setMode('manual');
      setValues(getJobFormValues(editingJob));
      resetAdFetch();
      return;
    }

    resetForm();
    setMode('link');
  }, [editingJob]);

  useEffect(() => {
    if (isEditing) {
      return;
    }

    updateField(
      'isOutsideCommuteDistance',
      values.city.trim()
        ? checkIsOutsideCommute(values.city)
        : false
    );
  }, [values.city, isEditing]);

  useEffect(() => {
    if (isEditing) {
      return;
    }

    updateField(
      'isOtherOccupation',
      values.occupation.trim()
        ? checkIsOtherOccupation(values.occupation)
        : false
    );
  }, [values.occupation, isEditing]);

  async function handleFetchInfo() {
    if (!canFetch) {
      return;
    }

    const ad = await fetchAd(values.url);

    if (!ad) {
      return;
    }

    setValues((current) => ({
      ...current,
      title: ad.title,
      company: ad.company,
      city: ad.city,
      deadline: ad.deadline,
      employmentType: ad.employmentType,
      occupation: ad.occupation,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !values.company.trim() ||
      !values.title.trim()
    ) {
      toaster.create({
        title: 'Saknar information',
        description: 'Fyll i företag och titel.',
        type: 'error',
        closable: true,
      });
      return;
    }

    if (
      requiresAppliedAt &&
      !values.appliedAt.trim()
    ) {
      toaster.create({
        title: 'Saknar ansökningsdatum',
        description:
          'Ange vilket datum du sökte jobbet.',
        type: 'error',
        closable: true,
      });
      return;
    }

    if (
      values.status === 'intervju' &&
      !values.interviewAt
    ) {
      toaster.create({
        title: 'Saknar intervjutid',
        description:
          'Ange datum och tid för intervjun.',
        type: 'error',
        closable: true,
      });
      return;
    }

    const jobData = buildJob(values, editingJob);

    if (editingJob) {
      onUpdate(jobData);

      toaster.create({
        title: 'Jobb uppdaterat',
        description: `${jobData.title} uppdaterades.`,
        type: 'success',
        closable: true,
      });

      onCancelEdit();
      return;
    }

    const wasAdded = onAdd(jobData);

    if (!wasAdded) {
      toaster.create({
        title: 'Jobbet finns redan',
        description: `${jobData.title} hos ${jobData.company} är redan sparat.`,
        type: 'warning',
        closable: true,
      });
      return;
    }

    toaster.create({
      title: 'Jobb sparat',
      description: `${jobData.title} hos ${jobData.company} lades till.`,
      type: 'success',
      closable: true,
    });

    resetForm();
    setMode('link');
  }

  return {
    mode,
    setMode,

    ...values,

    setCompany: (value: string) =>
      updateField('company', value),
    setTitle: (value: string) =>
      updateField('title', value),
    setUrl: (value: string) =>
      updateField('url', value),
    setCity: (value: string) =>
      updateField('city', value),
    setEmploymentType: (value: string) =>
      updateField('employmentType', value),
    setOccupation: (value: string) =>
      updateField('occupation', value),
    setStatus: (value: JobStatus) =>
      updateField('status', value),
    setDeadline: (value: string) =>
      updateField('deadline', value),
    setAppliedAt: (value: string) =>
      updateField('appliedAt', value),
    setInterviewAt: (value: string) =>
      updateField('interviewAt', value),
    setIsOutsideCommuteDistance: (value: boolean) =>
      updateField('isOutsideCommuteDistance', value),
    setIsOtherOccupation: (value: boolean) =>
      updateField('isOtherOccupation', value),

    requiresAppliedAt,
    isFetching,
    adSource,
    isEditing,
    isValid,
    canFetch,
    fieldsLocked,
    lockedStyles,
    handleFetchInfo,
    handleSubmit,
  };
}