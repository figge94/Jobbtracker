import { Badge, Box, Heading, Stack, Text } from '@chakra-ui/react';
import type { Job } from '../../types/job';
import type { StatItem } from '../../utils/history-stats';
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
    <Box bg="bg" borderRadius="2xl" px={{ base: '4', md: '5' }} py={{ base: '4', md: '5' }}>
      <Stack gap="5">
        <Stack gap="1">
          <Heading size="sm" textTransform="capitalize">
            {selectedMonth || 'Ingen månad vald'}
          </Heading>
          <Text color="fg.muted">{selectedMonthJobs.length} jobb totalt denna månad.</Text>
        </Stack>

        <Stack direction={{ base: 'column', md: 'row' }} gap="3" align="stretch">
          <Box flex="1" bg="bg.subtle" borderRadius="xl" px="4" py="3">
            <Text fontSize="sm" color="fg.muted">
              Sökta jobb
            </Text>
            <Heading size="md" mt="1">
              {selectedMonthAppliedJobs.length}
            </Heading>
          </Box>

          <Box flex="1" bg="bg.subtle" borderRadius="xl" px="4" py="3">
            <Text fontSize="sm" color="fg.muted">
              Ville söka men sökte inte
            </Text>
            <Heading size="md" mt="1">
              {selectedMonthSavedOnlyJobs.length}
            </Heading>
          </Box>

          <Box flex="1" bg="bg.subtle" borderRadius="xl" px="4" py="3">
            <Text fontSize="sm" color="fg.muted">
              Vanligaste roll
            </Text>
            <Heading size="sm" mt="2" lineHeight="1.3">
              {topMonthOccupation ? topMonthOccupation.name : 'Ingen ännu'}
            </Heading>
            {topMonthOccupation && (
              <Badge mt="3" variant="subtle" borderRadius="full" px="2.5">
                {topMonthOccupation.count}
              </Badge>
            )}
          </Box>
        </Stack>

        <HistoryStatList
          title="Sökta roller"
          items={selectedMonthOccupationStats}
          emptyText="Ingen statistik för månaden."
        />

        <Stack gap="3">
          <Text fontSize="sm" color="fg.muted" fontWeight="medium">
            Ville söka men sökte inte
          </Text>

          {selectedMonthSavedOnlyJobs.length === 0 ? (
            <Text color="fg.muted">Inga sådana jobb denna månad.</Text>
          ) : (
            <Stack gap="2">
              {selectedMonthSavedOnlyJobs.map((job) => (
                <Box key={job.id} px="4" py="3" bg="bg.subtle" borderRadius="xl">
                  <Stack gap="1.5">
                    <Text fontWeight="medium">{job.title}</Text>
                    <Text fontSize="sm" color="fg.muted">
                      {job.company}
                    </Text>
                    {job.occupation && (
                      <Badge alignSelf="flex-start" variant="subtle" borderRadius="full" px="2.5">
                        {job.occupation}
                      </Badge>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
