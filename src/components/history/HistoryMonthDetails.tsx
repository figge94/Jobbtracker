import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import type { Job } from '../../types/job';
import type { StatItem } from '../../utils/history-stats';
import HistoryMonthSummary from './HistoryMonthSummary';
import HistorySavedJobs from './HistorySavedJobs';
import HistoryStatList from './HistoryStatList';

type Props = {
  selectedMonth: string;
  selectedMonthJobs: Job[];
  selectedMonthAppliedJobs: Job[];
  selectedMonthSavedOnlyJobs: Job[];
  selectedMonthOccupationStats: StatItem[];
  topMonthOccupation: StatItem | null;
};

export default function HistoryMonthDetails({
  selectedMonth,
  selectedMonthJobs,
  selectedMonthAppliedJobs,
  selectedMonthSavedOnlyJobs,
  selectedMonthOccupationStats,
  topMonthOccupation,
}: Props) {
  return (
    <Box
      bg="bg"
      borderRadius={{ base: 'xl', md: '2xl' }}
      px={{ base: '3', sm: '4', md: '6' }}
      py={{ base: '4', md: '6' }}
      borderWidth="1px"
      borderColor="border.subtle"
      boxShadow={{ base: 'none', md: 'xs' }}
    >
      <Stack gap={{ base: '5', md: '7' }}>
        <Stack gap="1">
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color="fg.muted"
            fontWeight="semibold"
          >
            Vald period
          </Text>

          <Heading size={{ base: 'md', md: 'lg' }} textTransform="capitalize">
            {selectedMonth || 'Ingen månad vald'}
          </Heading>

          <Text color="fg.muted" fontSize="sm">
            {selectedMonthJobs.length} jobb totalt
          </Text>
        </Stack>

        <HistoryMonthSummary
          appliedCount={selectedMonthAppliedJobs.length}
          savedOnlyCount={selectedMonthSavedOnlyJobs.length}
          topOccupation={topMonthOccupation}
        />

        <Box borderTopWidth="1px" borderColor="border.subtle" pt={{ base: '5', md: '6' }}>
          <HistoryStatList
            title="Sökta roller"
            items={selectedMonthOccupationStats}
            emptyText="Ingen statistik för månaden."
          />
        </Box>

        <Box borderTopWidth="1px" borderColor="border.subtle" pt={{ base: '5', md: '6' }}>
          <HistorySavedJobs jobs={selectedMonthSavedOnlyJobs} />
        </Box>
      </Stack>
    </Box>
  );
}
