import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
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
    <Stack gap="6">
      <Button alignSelf="flex-start" variant="ghost" size="sm" onClick={onToggleShowJobs}>
        {showJobs ? 'Dölj jobb' : `Visa jobb (${filteredJobs.length})`}
      </Button>

      {showJobs && (
        <>
          {filteredJobs.length === 0 ? (
            <Box
              borderWidth="1px"
              borderColor="border.subtle"
              borderRadius="2xl"
              bg="bg.panel"
              py="12"
              px="6"
              textAlign="center"
            >
              <Text color="fg.muted">Inga jobb matchar filtret.</Text>
            </Box>
          ) : viewMode === 'list' ? (
            <JobList
              jobs={filteredJobs}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
            />
          ) : (
            <Stack gap="10">
              {jobsByMonth.map(([month, monthJobs]) => (
                <Stack key={month} gap="4">
                  <Flex align="center" justify="space-between" gap="4">
                    <Heading size="md" textTransform="capitalize" letterSpacing="-0.01em">
                      {month}
                    </Heading>

                    <Box
                      fontSize="sm"
                      color="fg.muted"
                      bg="bg.subtle"
                      px="3"
                      py="1"
                      borderRadius="full"
                    >
                      {monthJobs.length} jobb
                    </Box>
                  </Flex>

                  <JobBoard
                    jobsByStatus={groupJobsByStatus(monthJobs)}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                </Stack>
              ))}
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
}
