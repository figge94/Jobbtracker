import { Button, Card, Heading, Stack, Text } from '@chakra-ui/react';
import type { Job } from '../../types/job';
import { groupJobsByMonth } from '../../utils/job-grouping';

type Props = {
  jobs: Job[];
  onBack: () => void;
};

function getCurrentMonthKey() {
  return new Date().toLocaleDateString('sv-SE', {
    month: 'long',
    year: 'numeric',
  });
}

export default function HistoryList({ jobs, onBack }: Props) {
  const currentMonthKey = getCurrentMonthKey();
  const jobsByMonth = groupJobsByMonth(jobs).filter(([month]) => month !== currentMonthKey);

  return (
    <Stack gap="6">
      <Stack direction="row" justify="space-between" align="center">
        <Heading size="lg">Historik</Heading>
        <Button variant="outline" onClick={onBack}>
          Tillbaka
        </Button>
      </Stack>

      {jobsByMonth.length === 0 ? (
        <Text color="fg.muted">Ingen historik ännu.</Text>
      ) : (
        jobsByMonth.map(([month, monthJobs]) => (
          <Stack key={month} gap="3">
            <Heading size="sm" textTransform="capitalize">
              {month} ({monthJobs.length})
            </Heading>

            <Stack gap="3">
              {monthJobs.map((job) => (
                <Card.Root key={job.id} variant="outline" borderRadius="xl">
                  <Card.Body p="3">
                    <Stack gap="1">
                      <Text fontWeight="semibold">{job.title}</Text>
                      <Text fontSize="sm">{job.company}</Text>

                      {job.city && (
                        <Text fontSize="sm" color="fg.muted">
                          {job.city}
                        </Text>
                      )}

                      <Text fontSize="xs" color="fg.muted">
                        {new Date(job.createdAt).toLocaleDateString('sv-SE')}
                      </Text>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ))}
            </Stack>
          </Stack>
        ))
      )}
    </Stack>
  );
}
