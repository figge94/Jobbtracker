import { Badge, HStack, Stack, Text } from '@chakra-ui/react';
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

      <Stack gap="0">
        {JOB_STATUSES.map((status, index) => (
          <HStack
            key={status}
            justify="space-between"
            py="3"
            borderBottomWidth={index < JOB_STATUSES.length - 1 ? '1px' : '0'}
            borderColor="border.subtle"
          >
            <HStack gap="3">
              <Badge boxSize="3" borderRadius="full" bg={`${getStatusColor(status)}.400`} p="0" />

              <Text fontWeight="medium">{getStatusLabel(status)}</Text>
            </HStack>

            <Text fontWeight="bold" fontSize="lg" fontVariantNumeric="tabular-nums">
              {stats[status]}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
}
