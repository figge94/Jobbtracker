import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import type { Job, JobStatus } from '../../types/job';
import { JobActions } from './JobActions';
import { JobStatusSelect } from './JobStatusSelect';

type Props = {
  job: Job;
  compact: boolean;
  onStatusChange: (status: JobStatus) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function JobCardHeader({ job, compact, onStatusChange, onEdit, onDelete }: Props) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align={{ base: 'stretch', md: 'start' }}
      gap={{ base: '3', md: '4' }}
    >
      <Stack gap="2" flex="1" minW="0">
        <Box>
          <Text
            fontSize={compact ? 'lg' : { base: 'lg', md: 'xl' }}
            fontWeight="semibold"
            lineHeight="1.3"
            lineClamp={2}
          >
            {job.title}
          </Text>

          <Text mt="1" color="fg.muted" fontWeight="medium" lineClamp={1}>
            {job.company}
          </Text>
        </Box>
      </Stack>

      <Flex
        direction={{ base: 'row', md: 'column' }}
        align={{ base: 'center', md: 'end' }}
        justify={{ base: 'space-between', md: 'flex-start' }}
        gap="2"
        w={{ base: '100%', md: compact ? '120px' : '180px' }}
        minW={{ md: compact ? '120px' : '180px' }}
      >
        {!compact && (
          <Box w={{ base: 'auto', md: '100%' }} minW={{ base: '140px', md: 'auto' }}>
            <JobStatusSelect value={job.status} onChange={onStatusChange} />
          </Box>
        )}

        <JobActions onEdit={onEdit} onDelete={onDelete} />
      </Flex>
    </Flex>
  );
}
