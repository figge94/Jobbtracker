import { Badge, Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
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

type SummaryCardProps = {
  label: string;
  value: string | number;
  badgeText?: string | number;
};

function SummaryCard({ label, value, badgeText }: SummaryCardProps) {
  return (
    <Box
      bg="bg"
      borderRadius="2xl"
      px="5"
      py="5"
      borderWidth="1px"
      borderColor="border.subtle"
      boxShadow="xs"
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
  return (
    <Box
      bg="bg.panel"
      borderRadius="3xl"
      px={{ base: '5', md: '7' }}
      py={{ base: '5', md: '7' }}
      borderWidth="1px"
      borderColor="border.subtle"
      boxShadow="sm"
    >
      <Stack gap="7">
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

          <Heading size="lg">Din jobbhistorik</Heading>

          <Text color="fg.muted" fontSize="sm" maxW="2xl">
            Sparat {totalJobs} jobb{startedMonth ? ` sedan ${startedMonth}` : ''}.
          </Text>
        </Stack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap="4">
          <SummaryCard label="Totalt sökta jobb" value={appliedJobsCount} />
          <SummaryCard label="Sparade men ej sökta" value={savedOnlyCount} />
          <SummaryCard
            label="Vanligaste rollen"
            value={topOccupation ? topOccupation.name : 'Ingen ännu'}
            badgeText={topOccupation ? topOccupation.count : undefined}
          />
          <SummaryCard
            label="Mest aktiv månad"
            value={mostActiveMonth ? mostActiveMonth[0] : 'Ingen ännu'}
            badgeText={mostActiveMonth ? mostActiveMonth[1].length : undefined}
          />
        </Grid>

        <Grid templateColumns={{ base: '1fr', xl: '1fr 1fr' }} gap="5">
          <Box
            bg="bg"
            borderRadius="2xl"
            px={{ base: '4', md: '5' }}
            py={{ base: '4', md: '5' }}
            borderWidth="1px"
            borderColor="border.subtle"
            boxShadow="xs"
          >
            <HistoryStatList
              title="Totalt per roll"
              items={allOccupationStats}
              emptyText="Ingen total statistik ännu."
            />
          </Box>

          <Box
            bg="bg"
            borderRadius="2xl"
            px={{ base: '4', md: '5' }}
            py={{ base: '4', md: '5' }}
            borderWidth="1px"
            borderColor="border.subtle"
            boxShadow="xs"
          >
            <HistoryStatList
              title="Toppföretag"
              items={topCompanies.slice(0, 5)}
              emptyText="Ingen företagsstatistik ännu."
            />
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
