import { Box, Card, Heading, Stack, Text } from '@chakra-ui/react';
import type { Job, JobStatus } from '../../types/job';
import { groupJobsByMonth } from '../../utils/job-grouping';
import { JobCard } from './JobCard';

type Props = {
  jobs: Job[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
  onEdit: (job: Job) => void;
};

export function JobList({ jobs, onDelete, onStatusChange, onEdit }: Props) {
  if (jobs.length === 0) {
    return (
      <Card.Root borderRadius="xl">
        <Card.Body py="8" textAlign="center">
          <Text color="fg.muted">Inga jobb ännu.</Text>
        </Card.Body>
      </Card.Root>
    );
  }

  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const jobsByMonth = groupJobsByMonth(sortedJobs);

  return (
    <Stack gap={{ base: '5', md: '7' }}>
      {jobsByMonth.map(([month, monthJobs]) => (
        <Stack key={month} gap={{ base: '3', md: '4' }}>
          <Heading
            size={{ base: 'sm', md: 'md' }}
            textTransform="capitalize"
            px={{ base: '1', md: '0' }}
          >
            {month}
            <Text as="span" ml="2" color="fg.muted" fontWeight="medium">
              ({monthJobs.length})
            </Text>
          </Heading>

          <Stack gap={{ base: '3', md: '4' }}>
            {monthJobs.map((job) => (
              <Box
                key={job.id}
                transition="transform 0.2s ease, box-shadow 0.2s ease"
                _hover={{
                  transform: { base: 'none', md: 'translateY(-2px)' },
                }}
              >
                <JobCard
                  job={job}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
