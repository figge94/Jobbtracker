import type { Job, JobStatus } from './job';

export type AppPage = 'home' | 'history' | 'activity-report';

export type DisclosureLike = {
  open: boolean;
  onClose: () => void;
};

export type AppOverlaysProps = {
  page: AppPage;
  currentMonthJobs: Job[];
  historyJobs: Job[];
  stats: Record<JobStatus, number>;
  cityStats: [string, number][];
  editingJob: Job | null;
  setPage: (page: AppPage) => void;
  jobModal: DisclosureLike;
  profileDrawer: DisclosureLike;
  settingsDrawer: DisclosureLike;
  onAdd: (job: Job) => boolean;
  onUpdate: (job: Job) => void;
  onCloseModal: () => void;
};
