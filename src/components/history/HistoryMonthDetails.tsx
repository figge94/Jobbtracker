import { Badge, Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
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

type SummaryCardProps = {
  label: string;
  value: string | number;
  badgeText?: string | number;
};

function SummaryCard({ label, value, badgeText }: SummaryCardProps) {
  return (
    <Box
      bg="bg.subtle"
      borderRadius="2xl"
      px="5"
      py="4"
      borderWidth="1px"
      borderColor="border.subtle"
    >
      <Stack gap="3">
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="fg.muted"
          fontWeight="semibold"
        >
          {label}
        </Text>

        <Heading size="md" lineHeight="1.2">
          {value}
        </Heading>

        {badgeText !== undefined && (
          <Badge alignSelf="flex-start" variant="subtle" borderRadius="full" px="2.5" py="0.5">
            {badgeText}
          </Badge>
        )}
      </Stack>
    </Box>
  );
}

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
      borderRadius="2xl"
      px={{ base: '4', md: '5' }}
      py={{ base: '4', md: '5' }}
      borderWidth="1px"
      borderColor="border.subtle"
      boxShadow="xs"
    >
      <Stack gap="6">
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

          <Heading size="md" textTransform="capitalize">
            {selectedMonth || 'Ingen månad vald'}
          </Heading>

          <Text color="fg.muted" fontSize="sm">
            {selectedMonthJobs.length} jobb totalt denna månad.
          </Text>
        </Stack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap="4">
          <SummaryCard label="Sökta jobb" value={selectedMonthAppliedJobs.length} />
          <SummaryCard
            label="Ville söka men sökte inte"
            value={selectedMonthSavedOnlyJobs.length}
          />
          <SummaryCard
            label="Vanligaste roll"
            value={topMonthOccupation ? topMonthOccupation.name : 'Ingen ännu'}
            badgeText={topMonthOccupation ? topMonthOccupation.count : undefined}
          />
        </Grid>

        <Box
          bg="bg.subtle"
          borderRadius="2xl"
          px={{ base: '4', md: '5' }}
          py={{ base: '4', md: '5' }}
          borderWidth="1px"
          borderColor="border.subtle"
        >
          <HistoryStatList
            title="Sökta roller"
            items={selectedMonthOccupationStats}
            emptyText="Ingen statistik för månaden."
          />
        </Box>

        <Box
          bg="bg.subtle"
          borderRadius="2xl"
          px={{ base: '4', md: '5' }}
          py={{ base: '4', md: '5' }}
          borderWidth="1px"
          borderColor="border.subtle"
        >
          <Stack gap="3">
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color="fg.muted"
              fontWeight="semibold"
            >
              Ville söka men sökte inte
            </Text>

            {selectedMonthSavedOnlyJobs.length === 0 ? (
              <Text color="fg.muted">Inga sådana jobb denna månad.</Text>
            ) : (
              <Stack gap="2">
                {selectedMonthSavedOnlyJobs.map((job) => (
                  <Box
                    key={job.id}
                    px="4"
                    py="3"
                    bg="bg"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="border.subtle"
                  >
                    <Stack gap="1.5">
                      <Text fontWeight="semibold">{job.title}</Text>

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
        </Box>
      </Stack>
    </Box>
  );
}
