import { Box, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import type { StatItem } from '../../utils/history-stats';
import HistoryStatList from './HistoryStatList';

type Props = {
  totalJobs: number;
  startedMonth: string;
  appliedJobsCount: number;
  savedOnlyCount: number;
  topOccupation: StatItem | null;
  mostActiveMonth: [string, unknown[]] | null;
  allOccupationStats: StatItem[];
  topCompanies: StatItem[];
};

type SummaryItemProps = {
  label: string;
  value: string | number;
  description?: string;
};

function SummaryItem({ label, value, description }: SummaryItemProps) {
  return (
    <Box
      minW="0"
      px={{ base: '3.5', md: '4' }}
      py={{ base: '4', md: '5' }}
      bg="bg.subtle"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border.subtle"
    >
      <Stack gap="1.5">
        <Heading size={{ base: 'lg', md: 'xl' }} lineHeight="1.1" overflowWrap="anywhere">
          {value}
        </Heading>

        <Text fontSize="sm" fontWeight="semibold">
          {label}
        </Text>

        {description && (
          <Text fontSize="xs" color="fg.muted">
            {description}
          </Text>
        )}
      </Stack>
    </Box>
  );
}

export default function HistoryOverview({
  totalJobs,
  startedMonth,
  appliedJobsCount,
  savedOnlyCount,
  topOccupation,
  mostActiveMonth,
  allOccupationStats,
  topCompanies,
}: Props) {
  const appliedPercentage = totalJobs > 0 ? Math.round((appliedJobsCount / totalJobs) * 100) : 0;

  const savedOnlyPercentage = totalJobs > 0 ? Math.round((savedOnlyCount / totalJobs) * 100) : 0;

  const mostActiveMonthCount = mostActiveMonth?.[1].length ?? 0;

  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <Stack gap="2">
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="fg.muted"
          fontWeight="semibold"
        >
          Översikt
        </Text>

        <Heading size={{ base: 'lg', md: 'xl' }}>Din jobbhistorik</Heading>

        <HStack gap="2" wrap="wrap">
          <Text color="fg.muted" fontSize="sm">
            {totalJobs} jobb sparade
          </Text>

          {startedMonth && (
            <>
              <Text color="fg.subtle">•</Text>

              <Text color="fg.muted" fontSize="sm">
                Sedan{' '}
                <Text as="span" textTransform="capitalize">
                  {startedMonth}
                </Text>
              </Text>
            </>
          )}
        </HStack>
      </Stack>

      <Grid
        templateColumns={{
          base: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        }}
        gap={{ base: '3', md: '4' }}
      >
        <SummaryItem
          label="Sökta jobb"
          value={appliedJobsCount}
          description={`${appliedPercentage}% av alla sparade`}
        />

        <SummaryItem
          label="Inte sökta"
          value={savedOnlyCount}
          description={`${savedOnlyPercentage}% av alla sparade`}
        />

        <Box gridColumn={{ base: '1 / -1', sm: 'auto' }}>
          <SummaryItem
            label="Vanligaste rollen"
            value={topOccupation?.name ?? 'Ingen ännu'}
            description={topOccupation ? `${topOccupation.count} jobb` : 'Ingen statistik ännu'}
          />
        </Box>

        <Box gridColumn={{ base: '1 / -1', sm: 'auto' }}>
          <SummaryItem
            label="Mest aktiv månad"
            value={mostActiveMonth?.[0] ?? 'Ingen ännu'}
            description={mostActiveMonth ? `${mostActiveMonthCount} jobb` : 'Ingen statistik ännu'}
          />
        </Box>
      </Grid>

      <Box borderTopWidth="1px" borderColor="border.subtle" pt={{ base: '5', md: '7' }}>
        <Grid
          templateColumns={{ base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }}
          gap={{ base: '7', lg: '10' }}
        >
          <Stack gap="4">
            <Box>
              <Heading size="md">Roller</Heading>

              <Text color="fg.muted" fontSize="sm" mt="1">
                Vanligaste rollerna bland alla jobb.
              </Text>
            </Box>

            <HistoryStatList
              title=""
              items={allOccupationStats}
              emptyText="Ingen rollstatistik ännu."
            />
          </Stack>

          <Stack gap="4">
            <Box>
              <Heading size="md">Företag</Heading>

              <Text color="fg.muted" fontSize="sm" mt="1">
                Företagen du sparat flest jobb från.
              </Text>
            </Box>

            <HistoryStatList
              title=""
              items={topCompanies.slice(0, 5)}
              emptyText="Ingen företagsstatistik ännu."
            />
          </Stack>
        </Grid>
      </Box>
    </Stack>
  );
}
