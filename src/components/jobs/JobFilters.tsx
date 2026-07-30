import { Box, Field, Flex, NativeSelect } from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import { JOB_STATUSES, getStatusLabel } from '../../utils/job-status';
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
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="2xl"
      px={{ base: '4', md: '5' }}
      py="4"
      boxShadow="sm"
    >
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        align={{ base: 'stretch', sm: 'flex-end' }}
        justify="space-between"
        gap="4"
      >
        <Field.Root maxW={{ sm: '280px' }}>
          <Field.Label fontSize="xs" color="fg.muted" fontWeight="semibold">
            Status
          </Field.Label>

          <NativeSelect.Root>
            <NativeSelect.Field
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value as JobStatus | 'alla')}
              bg="bg.subtle"
              borderColor="border.subtle"
              borderRadius="xl"
              _hover={{
                borderColor: 'border.emphasized',
              }}
              _focusVisible={{
                borderColor: 'blue.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
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

        <JobViewToggle viewMode={viewMode} onChange={onViewModeChange} />
      </Flex>
    </Box>
  );
}
