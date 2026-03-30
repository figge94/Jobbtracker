import { Card, Heading, SimpleGrid, Stack, Stat, Text } from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import { JOB_STATUSES, getStatusColor, getStatusLabel } from '../../utils/job-status';

type Props = {
  stats: Record<JobStatus, number>;
  cityStats: [string, number][];
};

export default function JobStats({ stats, cityStats }: Props) {
  return (
    <Stack gap="4">
      <SimpleGrid columns={{ base: 2, md: 4 }} gap="3">
        {JOB_STATUSES.map((status) => {
          const color = getStatusColor(status);

          return (
            <Card.Root
              key={status}
              borderWidth="1px"
              borderRadius="2xl"
              borderColor={`${color}.200`}
              bg={`${color}.100`}
              shadow="sm"
              _dark={{
                bg: `${color}.900`,
                borderColor: `${color}.600`,
                boxShadow: 'md',
              }}
            >
              <Card.Body>
                <Stat.Root>
                  <Stat.Label
                    fontSize="sm"
                    fontWeight="medium"
                    color={`${color}.600`}
                    _dark={{ color: `${color}.300` }}
                  >
                    {getStatusLabel(status)}
                  </Stat.Label>

                  <Stat.ValueText
                    fontSize="3xl"
                    fontWeight="bold"
                    color="gray.800"
                    _dark={{ color: 'white' }}
                  >
                    {stats[status]}
                  </Stat.ValueText>
                </Stat.Root>
              </Card.Body>
            </Card.Root>
          );
        })}
      </SimpleGrid>

      <Card.Root borderWidth="1px" borderRadius="2xl" shadow="sm">
        <Card.Body>
          <Stack gap="3">
            <Heading size="sm">Sökta jobb per stad</Heading>

            {cityStats.length === 0 ? (
              <Text color="gray.500">Inga sökta jobb ännu.</Text>
            ) : (
              <Stack gap="1">
                {cityStats.map(([city, count]) => (
                  <Text key={city}>
                    {city}: {count}
                  </Text>
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
