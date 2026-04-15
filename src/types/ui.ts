import type { Job, JobStatus } from './job';

export type DisclosureLike = {
  open: boolean;
  onClose: () => void;
};

export type AppOverlaysProps = {
  page: 'home' | 'history';
  jobs: Job[];
  stats: Record<JobStatus, number>;
  cityStats: [string, number][];
  editingJob: Job | null;
  setPage: (page: 'home' | 'history') => void;
  jobModal: DisclosureLike;
  profileDrawer: DisclosureLike;
  settingsDrawer: DisclosureLike;
  onAdd: (job: Job) => boolean;
  onUpdate: (job: Job) => void;
  onCloseModal: () => void;
};
