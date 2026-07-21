import {
  Box,
  Field,
  HStack,
  NativeSelect,
  Stack,
} from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import {
  JOB_STATUSES,
  getStatusLabel,
} from '../../utils/job-status';
import { JobViewToggle } from './JobViewToggle';

type Props = {
  statusFilter: JobStatus | 'alla';
  onStatusFilterChange: (value: JobStatus | 'alla') => void;
  viewMode: 'list' | 'board';
  onViewModeChange: (value: 'list' | 'board') => void;
};

export function JobFilters({
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
}: Props) {
  return (
    <Box
      py="3"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        align={{ base: 'stretch', sm: 'flex-end' }}
        justify="space-between"
        gap="3"
      >
        <Field.Root maxW={{ sm: '260px' }}>
          <Field.Label
            fontSize="xs"
            color="fg.muted"
            fontWeight="medium"
          >
            Status
          </Field.Label>

          <NativeSelect.Root>
            <NativeSelect.Field
              value={statusFilter}
              onChange={(event) =>
                onStatusFilterChange(
                  event.target.value as JobStatus | 'alla'
                )
              }
              borderRadius="xl"
              bg="bg.subtle"
              borderColor="border.subtle"
              _hover={{
                borderColor: 'border.emphasized',
              }}
            >
              <option value="alla">Alla statusar</option>

              {JOB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </NativeSelect.Field>

            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <HStack justify={{ base: 'flex-end', sm: 'initial' }}>
          <JobViewToggle
            viewMode={viewMode}
            onChange={onViewModeChange}
          />
        </HStack>
      </Stack>
    </Box>
  );
}