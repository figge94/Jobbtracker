import { Badge, Box, Heading, Stack, Text } from '@chakra-ui/react';
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
      bg="linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)"
      borderRadius="3xl"
      px={{ base: '4', md: '6' }}
      py={{ base: '5', md: '6' }}
      borderWidth="1px"
      borderColor="whiteAlpha.100"
    >
      <Stack gap="6">
        <Stack gap="1">
          <Text fontSize="sm" color="fg.muted" fontWeight="medium">
            Översikt
          </Text>
          <Heading size="md">Din jobbhistorik</Heading>
          <Text color="fg.muted" maxW="2xl">
            Sparat {totalJobs} jobb{startedMonth ? ` sedan ${startedMonth}` : ''}.
          </Text>
        </Stack>

        <Stack direction={{ base: 'column', md: 'row' }} gap="3" align="stretch">
          <Box flex="1" bg="bg.subtle" borderRadius="2xl" px="4" py="4">
            <Text fontSize="sm" color="fg.muted">
              Totalt sökta jobb
            </Text>
            <Heading size="lg" mt="1">
              {appliedJobsCount}
            </Heading>
          </Box>

          <Box flex="1" bg="bg.subtle" borderRadius="2xl" px="4" py="4">
            <Text fontSize="sm" color="fg.muted">
              Sparade men ej sökta
            </Text>
            <Heading size="lg" mt="1">
              {savedOnlyCount}
            </Heading>
          </Box>

          <Box flex="1" bg="bg.subtle" borderRadius="2xl" px="4" py="4">
            <Text fontSize="sm" color="fg.muted">
              Vanligaste rollen
            </Text>
            <Heading size="sm" mt="2" lineHeight="1.3">
              {topOccupation ? topOccupation.name : 'Ingen ännu'}
            </Heading>
            {topOccupation && (
              <Badge mt="3" variant="subtle" borderRadius="full" px="2.5">
                {topOccupation.count}
              </Badge>
            )}
          </Box>

          <Box flex="1" bg="bg.subtle" borderRadius="2xl" px="4" py="4">
            <Text fontSize="sm" color="fg.muted">
              Mest aktiv månad
            </Text>
            <Heading size="sm" mt="2" lineHeight="1.3" textTransform="capitalize">
              {mostActiveMonth ? mostActiveMonth[0] : 'Ingen ännu'}
            </Heading>
            {mostActiveMonth && (
              <Badge mt="3" variant="subtle" borderRadius="full" px="2.5">
                {mostActiveMonth[1].length}
              </Badge>
            )}
          </Box>
        </Stack>

        <HistoryStatList
          title="Totalt per roll"
          items={allOccupationStats}
          emptyText="Ingen total statistik ännu."
        />

        <HistoryStatList
          title="Toppföretag"
          items={topCompanies.slice(0, 5)}
          emptyText="Ingen företagsstatistik ännu."
        />
      </Stack>
    </Box>
  );
}
