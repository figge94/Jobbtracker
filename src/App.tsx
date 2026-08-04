import { useState } from 'react';
import { Container, useDisclosure } from '@chakra-ui/react';
import { BottomNav } from './components/layout/BottomNav';
import { PwaUpdatePrompt } from './components/PwaUpdatePrompt';
import { Toaster } from './components/ui/toaster';
import type { AppPage } from './types/ui';
import { HomePageContent } from './components/app/HomePageContent';
import { AppOverlays } from './components/app/AppOverlays';
import { useJobs } from './hooks/useJobs';
import { useDeadlineNotifications } from './hooks/useDeadlineNotifications';
import { useJobModal } from './hooks/useJobModal';
import { useSettings } from './hooks/useSettings';
import { isActivityReportPeriod } from './utils/activity-report';
import { ActivityReportPage } from './components/activity-report/ActivityReportPage';

export default function App() {
  const {
    jobs,
    filteredCurrentMonthJobs,
    historyJobs,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    currentMonthStats,
    cityStats,
    addJob,
    updateJob,
    deleteJob,
    changeStatus,
  } = useJobs();

  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [showJobs, setShowJobs] = useState(true);
  const [page, setPage] = useState<AppPage>('home');

  const jobModal = useDisclosure();
  const profileDrawer = useDisclosure();
  const settingsDrawer = useDisclosure();

  const { editingJob, handleCreateJob, handleEditJob, handleCloseModal } = useJobModal(jobModal);

  const { settings } = useSettings();

  const showActivityReportButton =
    settings.isRegisteredWithArbetsformedlingen && isActivityReportPeriod();

  useDeadlineNotifications(jobs);

  return (
    <Container
      maxW="7xl"
      py={{ base: '6', md: '10' }}
      pb="calc(120px + env(safe-area-inset-bottom))"
    >
      {page === 'home' && (
        <HomePageContent
          search={search}
          onSearchChange={setSearch}
          stats={currentMonthStats}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showJobs={showJobs}
          onToggleShowJobs={() => setShowJobs((prev) => !prev)}
          filteredJobs={filteredCurrentMonthJobs}
          onDelete={deleteJob}
          onStatusChange={changeStatus}
          onEdit={handleEditJob}
          showActivityReportButton={showActivityReportButton}
          onOpenActivityReport={() => setPage('activity-report')}
        />
      )}

      {page === 'activity-report' && (
        <ActivityReportPage jobs={jobs} onBack={() => setPage('home')} />
      )}

      {page !== 'activity-report' && (
        <BottomNav
          onOpenProfile={profileDrawer.onOpen}
          onOpenSettings={settingsDrawer.onOpen}
          onCreateJob={handleCreateJob}
          active={profileDrawer.open ? 'profile' : settingsDrawer.open ? 'settings' : 'none'}
        />
      )}

      <AppOverlays
        page={page}
        currentMonthJobs={filteredCurrentMonthJobs}
        historyJobs={historyJobs}
        stats={currentMonthStats}
        cityStats={cityStats}
        editingJob={editingJob}
        setPage={setPage}
        jobModal={jobModal}
        profileDrawer={profileDrawer}
        settingsDrawer={settingsDrawer}
        onAdd={addJob}
        onUpdate={updateJob}
        onCloseModal={handleCloseModal}
      />

      <PwaUpdatePrompt />
      <Toaster />
    </Container>
  );
}
