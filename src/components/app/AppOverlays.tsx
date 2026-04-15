import { Suspense, lazy } from 'react';
import type { Job } from '../../types/job';

const ProfileDrawer = lazy(() => import('../profile/ProfileDrawer'));
const SettingsDrawer = lazy(() => import('../settings/SettingsDrawer'));
const JobModal = lazy(() => import('../jobs/JobModal'));
const HistoryList = lazy(() => import('../history/HistoryList'));

type DisclosureLike = {
  open: boolean;
  onClose: () => void;
};

type Props = {
  page: 'home' | 'history';
  jobs: Job[];
  stats: any;
  cityStats: any;
  editingJob: Job | null;
  setPage: (page: 'home' | 'history') => void;
  jobModal: DisclosureLike;
  profileDrawer: DisclosureLike;
  settingsDrawer: DisclosureLike;
  onAdd: (job: Job) => boolean;
  onUpdate: (job: Job) => void;
  onCloseModal: () => void;
};

export function AppOverlays({
  page,
  jobs,
  stats,
  cityStats,
  editingJob,
  setPage,
  jobModal,
  profileDrawer,
  settingsDrawer,
  onAdd,
  onUpdate,
  onCloseModal,
}: Props) {
  return (
    <>
      {page === 'history' && (
        <Suspense fallback={null}>
          <HistoryList jobs={jobs} onBack={() => setPage('home')} />
        </Suspense>
      )}

      {jobModal.open && (
        <Suspense fallback={null}>
          <JobModal
            open={jobModal.open}
            onClose={onCloseModal}
            onAdd={onAdd}
            onUpdate={onUpdate}
            editingJob={editingJob}
          />
        </Suspense>
      )}

      {profileDrawer.open && (
        <Suspense fallback={null}>
          <ProfileDrawer
            open={profileDrawer.open}
            onClose={profileDrawer.onClose}
            onOpenHistory={() => {
              profileDrawer.onClose();
              setPage('history');
            }}
            stats={stats}
            cityStats={cityStats}
            totalJobs={jobs.length}
          />
        </Suspense>
      )}

      {settingsDrawer.open && (
        <Suspense fallback={null}>
          <SettingsDrawer open={settingsDrawer.open} onClose={settingsDrawer.onClose} />
        </Suspense>
      )}
    </>
  );
}
