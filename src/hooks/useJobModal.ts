import { useState } from 'react';
import type { Job } from '../types/job';

type DisclosureLike = {
  onOpen: () => void;
  onClose: () => void;
};

export function useJobModal(jobModal: DisclosureLike) {
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  function handleCreateJob() {
    setEditingJob(null);
    jobModal.onOpen();
  }

  function handleEditJob(job: Job) {
    setEditingJob(job);
    jobModal.onOpen();
  }

  function handleCloseModal() {
    setEditingJob(null);
    jobModal.onClose();
  }

  return {
    editingJob,
    handleCreateJob,
    handleEditJob,
    handleCloseModal,
  };
}
