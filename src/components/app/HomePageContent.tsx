import { Suspense, lazy } from 'react';
import { Stack } from '@chakra-ui/react';
import { AppHeader } from '../AppHeader';
import { JobFilters } from '../jobs/JobFilters';
import type { Job, JobStatus } from '../../types/job';
import { HomePageJobSection } from './HomePageJobSection';

const JobStats = lazy(() => import('../stats/JobStats'));

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

      <HomePageJobSection
        showJobs={showJobs}
        onToggleShowJobs={onToggleShowJobs}
        filteredJobs={filteredJobs}
        viewMode={viewMode}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        onEdit={onEdit}
      />
    </Stack>
  );
}
