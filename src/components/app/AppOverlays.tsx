import { Suspense, lazy, useMemo } from 'react';
import type { AppOverlaysProps } from '../../types/ui';

const ProfileDrawer = lazy(() => import('../profile/ProfileDrawer'));
const SettingsDrawer = lazy(() => import('../settings/SettingsDrawer'));
const JobModal = lazy(() => import('../jobs/JobModal'));
const HistoryList = lazy(() => import('../history/HistoryList'));

export function AppOverlays({
  page,
  currentMonthJobs,
  historyJobs,
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
  const appliedJobs = useMemo(
    () => currentMonthJobs.filter((job) => job.status !== 'vill_soka'),
    [currentMonthJobs]
  );

  const outsideCommuteCount = useMemo(
    () => appliedJobs.filter((job) => job.isOutsideCommuteDistance).length,
    [appliedJobs]
  );

  const otherOccupationCount = useMemo(
    () => appliedJobs.filter((job) => job.isOtherOccupation).length,
    [appliedJobs]
  );

  return (
    <>
      {page === 'history' && (
        <Suspense fallback={null}>
          <HistoryList jobs={historyJobs} onBack={() => setPage('home')} />
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
            totalJobs={currentMonthJobs.length}
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
