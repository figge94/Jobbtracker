import { Card, SimpleGrid, Stat } from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import { JOB_STATUSES, getStatusColor, getStatusLabel } from '../../utils/job-status';

type Props = {
  stats: Record<JobStatus, number>;
};

export default function JobStats({ stats }: Props) {
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
      {JOB_STATUSES.map((status) => {
        const color = getStatusColor(status);

        return (
          <Card.Root
            key={status}
            position="relative"
            overflow="hidden"
            borderWidth="1px"
            borderColor={`${color}.200`}
            borderRadius="2xl"
            bg={`${color}.100`}
            shadow="sm"
            transition="all 0.2s ease"
            _hover={{
              transform: 'translateY(-2px)',
              shadow: 'md',
              borderColor: `${color}.300`,
            }}
          >
            <Card.Body gap="3">
              <Stat.Root>
                <Stat.Label fontSize="sm" fontWeight="semibold" color="fg.muted">
                  {getStatusLabel(status)}
                </Stat.Label>

                <Stat.ValueText
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="bold"
                  letterSpacing="-0.04em"
                  color="fg"
                >
                  {stats[status]}
                </Stat.ValueText>
              </Stat.Root>
            </Card.Body>

            <Card.Footer p="0" h="1" bg={`${color}.400`} />
          </Card.Root>
        );
      })}
    </SimpleGrid>
  );
}
