import { Suspense, lazy, useMemo } from 'react';
import type { AppOverlaysProps } from '../../types/ui';

const ProfileDrawer = lazy(() => import('../profile/ProfileDrawer'));
const SettingsDrawer = lazy(() => import('../settings/SettingsDrawer'));
const JobModal = lazy(() => import('../jobs/JobModal'));
const HistoryList = lazy(() => import('../history/HistoryList'));

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
}: AppOverlaysProps) {
  const appliedJobs = useMemo(() => {
    return jobs.filter((job) => job.status !== 'vill_soka');
  }, [jobs]);

  const outsideCommuteCount = useMemo(() => {
    return appliedJobs.filter((job) => job.isOutsideCommuteDistance).length;
  }, [appliedJobs]);

  const otherOccupationCount = useMemo(() => {
    return appliedJobs.filter((job) => job.isOtherOccupation).length;
  }, [appliedJobs]);

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
            outsideCommuteCount={outsideCommuteCount}
            otherOccupationCount={otherOccupationCount}
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
