import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { BottomNav } from './components/layout/BottomNav';
import { AppHeader } from './components/AppHeader';
import { JobBoard } from './components/jobs/JobBoard';
import { JobFilters } from './components/jobs/JobFilters';
import { JobList } from './components/jobs/JobList';
import { useJobs } from './hooks/useJobs';
import type { Job, JobStatus } from './types/job';
import { groupJobsByMonth } from './utils/job-grouping';
import { JOB_STATUSES } from './utils/job-status';
import { PwaUpdatePrompt } from './components/PwaUpdatePrompt';
import { Toaster, toaster } from './components/ui/toaster';

const ProfileDrawer = lazy(() => import('./components/profile/ProfileDrawer'));
const SettingsDrawer = lazy(() => import('./components/settings/SettingsDrawer'));
const JobModal = lazy(() => import('./components/jobs/JobModal'));
const JobStats = lazy(() => import('./components/stats/JobStats'));
const HistoryList = lazy(() => import('./components/stats/HistoryList'));

function groupJobsByStatus<T extends { status: JobStatus }>(jobs: T[]) {
  return Object.fromEntries(
    JOB_STATUSES.map((status) => [status, jobs.filter((job) => job.status === status)])
  ) as Record<JobStatus, T[]>;
}

function getDaysLeft(deadline: string) {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default function App() {
  const {
    jobs,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredJobs,
    stats,
    cityStats,
    addJob,
    updateJob,
    deleteJob,
    changeStatus,
  } = useJobs();

  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [showJobs, setShowJobs] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [page, setPage] = useState<'home' | 'history'>('home');

  const jobModal = useDisclosure();
  const profileDrawer = useDisclosure();
  const settingsDrawer = useDisclosure();

  const jobsByMonth = useMemo(() => groupJobsByMonth(filteredJobs), [filteredJobs]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `jobbtracker.deadline-notices.${today}`;

    const shownToday = new Set<string>(JSON.parse(localStorage.getItem(storageKey) ?? '[]'));

    const jobsToNotify = jobs.filter((job) => {
      if (!job.deadline || job.status !== 'vill_soka') return false;

      const daysLeft = getDaysLeft(job.deadline);
      if (daysLeft < 0 || daysLeft > 3) return false;

      const uniqueKey = job.adId ?? job.id;
      return !shownToday.has(uniqueKey);
    });

    if (jobsToNotify.length === 0) return;

    const nextShown = new Set(shownToday);

    jobsToNotify.forEach((job) => {
      if (!job.deadline) return;

      const daysLeft = getDaysLeft(job.deadline);

      toaster.create({
        title: 'Deadline närmar sig',
        description:
          daysLeft === 0
            ? `${job.title} hos ${job.company} går ut idag.`
            : `${job.title} hos ${job.company} går ut om ${daysLeft} dagar.`,
        type: 'warning',
        closable: true,
      });

      nextShown.add(job.adId ?? job.id);
    });

    localStorage.setItem(storageKey, JSON.stringify([...nextShown]));
  }, [jobs]);

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

  return (
    <Container
      maxW="7xl"
      py={{ base: '6', md: '10' }}
      pb="calc(120px + env(safe-area-inset-bottom))"
    >
      {page === 'home' ? (
        <Stack gap="8">
          <AppHeader search={search} onSearchChange={setSearch} />

          <Suspense fallback={null}>
            <JobStats stats={stats} cityStats={cityStats} />
          </Suspense>

          <JobFilters
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <Button
            alignSelf="flex-start"
            variant="outline"
            size="sm"
            onClick={() => setShowJobs((prev) => !prev)}
          >
            {showJobs ? 'Dölj jobb' : 'Visa jobb'}
          </Button>

          {showJobs &&
            (filteredJobs.length === 0 ? (
              <Box borderWidth="1px" rounded="xl" p="8" textAlign="center" color="gray.500">
                Inga jobb matchar filtret.
              </Box>
            ) : viewMode === 'list' ? (
              <JobList
                jobs={filteredJobs}
                onDelete={deleteJob}
                onStatusChange={changeStatus}
                onEdit={handleEditJob}
              />
            ) : (
              <Stack gap="8">
                {jobsByMonth.map(([month, monthJobs]) => (
                  <Stack key={month} gap="4">
                    <Heading size="md" textTransform="capitalize">
                      {month} ({monthJobs.length})
                    </Heading>

                    <JobBoard
                      jobsByStatus={groupJobsByStatus(monthJobs)}
                      onStatusChange={changeStatus}
                      onDelete={deleteJob}
                      onEdit={handleEditJob}
                    />
                  </Stack>
                ))}
              </Stack>
            ))}
        </Stack>
      ) : (
        <Suspense fallback={null}>
          <HistoryList jobs={jobs} onBack={() => setPage('home')} />
        </Suspense>
      )}

      <BottomNav
        onOpenProfile={profileDrawer.onOpen}
        onOpenSettings={settingsDrawer.onOpen}
        onCreateJob={handleCreateJob}
        active={profileDrawer.open ? 'profile' : settingsDrawer.open ? 'settings' : 'none'}
      />

      {jobModal.open && (
        <Suspense fallback={null}>
          <JobModal
            open={jobModal.open}
            onClose={handleCloseModal}
            onAdd={addJob}
            onUpdate={updateJob}
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

      <PwaUpdatePrompt />
      <Toaster />
    </Container>
  );
}
