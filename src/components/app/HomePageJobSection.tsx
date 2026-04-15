import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import type { Job, JobStatus } from '../../types/job';
import { groupJobsByMonth } from '../../utils/job-grouping';
import { JOB_STATUSES } from '../../utils/job-status';
import { JobBoard } from '../jobs/JobBoard';
import { JobList } from '../jobs/JobList';

type Props = {
  showJobs: boolean;
  onToggleShowJobs: () => void;
  filteredJobs: Job[];
  viewMode: 'list' | 'board';
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
  onEdit: (job: Job) => void;
};

function groupJobsByStatus<T extends { status: JobStatus }>(jobs: T[]) {
  return Object.fromEntries(
    JOB_STATUSES.map((status) => [status, jobs.filter((job) => job.status === status)])
  ) as Record<JobStatus, T[]>;
}

export function HomePageJobSection({
  showJobs,
  onToggleShowJobs,
  filteredJobs,
  viewMode,
  onDelete,
  onStatusChange,
  onEdit,
}: Props) {
  const jobsByMonth = groupJobsByMonth(filteredJobs);

  return (
    <>
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
    </>
  );
}
