import { Suspense, lazy, useMemo } from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { AppHeader } from '../AppHeader';
import { JobBoard } from '../jobs/JobBoard';
import { JobFilters } from '../jobs/JobFilters';
import { JobList } from '../jobs/JobList';
import type { Job, JobStatus } from '../../types/job';
import { groupJobsByMonth } from '../../utils/job-grouping';
import { JOB_STATUSES } from '../../utils/job-status';

const JobStats = lazy(() => import('../stats/JobStats'));

function groupJobsByStatus<T extends { status: JobStatus }>(jobs: T[]) {
  return Object.fromEntries(
    JOB_STATUSES.map((status) => [status, jobs.filter((job) => job.status === status)])
  ) as Record<JobStatus, T[]>;
}

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  stats: any;
  cityStats: any;
  statusFilter: JobStatus | 'alla';
  onStatusFilterChange: (value: JobStatus | 'alla') => void;
  viewMode: 'list' | 'board';
  onViewModeChange: (value: 'list' | 'board') => void;
  showJobs: boolean;
  onToggleShowJobs: () => void;
  filteredJobs: Job[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
  onEdit: (job: Job) => void;
};

export function HomePageContent({
  search,
  onSearchChange,
  stats,
  cityStats,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
  showJobs,
  onToggleShowJobs,
  filteredJobs,
  onDelete,
  onStatusChange,
  onEdit,
}: Props) {
  const jobsByMonth = useMemo(() => groupJobsByMonth(filteredJobs), [filteredJobs]);

  return (
    <Stack gap="8">
      <AppHeader search={search} onSearchChange={onSearchChange} />

      <Suspense fallback={null}>
        <JobStats stats={stats} cityStats={cityStats} />
      </Suspense>

      <JobFilters
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />

      <Button alignSelf="flex-start" variant="outline" size="sm" onClick={onToggleShowJobs}>
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
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
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
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </Stack>
            ))}
          </Stack>
        ))}
    </Stack>
  );
}
