import { Box, Card, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import { JOB_STATUSES, getStatusColor, getStatusLabel } from '../../utils/job-status';

type Props = {
  stats: Record<JobStatus, number>;
};

export default function ProfileStatusGrid({ stats }: Props) {
  return (
    <Stack gap="3">
      <Text
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="0.08em"
        color="fg.muted"
        fontWeight="semibold"
      >
        Status
      </Text>

      <SimpleGrid columns={2} gap="3">
        {JOB_STATUSES.map((status) => (
          <Card.Root
            key={status}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="border.subtle"
            bg="bg.panel"
            overflow="hidden"
          >
            <Box h="1.5" bg={`${getStatusColor(status)}.400`} />
            <Card.Body p="3">
              <Stack gap="1">
                <Text fontSize="xs" color="fg.muted">
                  {getStatusLabel(status)}
                </Text>
                <Text fontSize="2xl" lineHeight="1" fontWeight="semibold">
                  {stats[status]}
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
