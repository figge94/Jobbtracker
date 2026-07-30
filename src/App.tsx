import { useState } from 'react';
import { Container, useDisclosure } from '@chakra-ui/react';
import { BottomNav } from './components/layout/BottomNav';
import { PwaUpdatePrompt } from './components/PwaUpdatePrompt';
import { Toaster } from './components/ui/toaster';
import { HomePageContent } from './components/app/HomePageContent';
import { AppOverlays } from './components/app/AppOverlays';
import { useJobs } from './hooks/useJobs';
import { useDeadlineNotifications } from './hooks/useDeadlineNotifications';
import { useJobModal } from './hooks/useJobModal';

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
    historyStats,
    cityStats,
    addJob,
    updateJob,
    deleteJob,
    changeStatus,
  } = useJobs();

  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [showJobs, setShowJobs] = useState(true);
  const [page, setPage] = useState<'home' | 'history'>('home');

  const jobModal = useDisclosure();
  const profileDrawer = useDisclosure();
  const settingsDrawer = useDisclosure();

  const { editingJob, handleCreateJob, handleEditJob, handleCloseModal } = useJobModal(jobModal);

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
        />
      )}

      <BottomNav
        onOpenProfile={profileDrawer.onOpen}
        onOpenSettings={settingsDrawer.onOpen}
        onCreateJob={handleCreateJob}
        active={profileDrawer.open ? 'profile' : settingsDrawer.open ? 'settings' : 'none'}
      />

      <AppOverlays
        page={page}
        jobs={historyJobs}
        stats={historyStats}
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
