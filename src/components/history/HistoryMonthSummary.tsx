import { Badge, Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import type { StatItem } from '../../utils/history-stats';

type SummaryCardProps = {
  label: string;
  value: string | number;
  badgeText?: string | number;
};

type Props = {
  appliedCount: number;
  savedOnlyCount: number;
  topOccupation: StatItem | null;
};

function SummaryCard({ label, value, badgeText }: SummaryCardProps) {
  return (
    <Box
      minW="0"
      bg="bg.subtle"
      borderRadius="xl"
      px={{ base: '3.5', md: '5' }}
      py={{ base: '3.5', md: '4' }}
      borderWidth="1px"
      borderColor="border.subtle"
    >
      <Stack gap="2">
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.06em"
          color="fg.muted"
          fontWeight="semibold"
        >
          {label}
        </Text>

        <Heading size={{ base: 'sm', md: 'md' }} lineHeight="1.25" overflowWrap="anywhere">
          {value}
        </Heading>

        {badgeText !== undefined && (
          <Badge alignSelf="flex-start" variant="subtle" borderRadius="full" px="2.5">
            {badgeText} jobb
          </Badge>
        )}
      </Stack>
    </Box>
  );
}

export default function HistoryMonthSummary({
  appliedCount,
  savedOnlyCount,
  topOccupation,
}: Props) {
  return (
    <Grid
      templateColumns={{
        base: 'repeat(2, minmax(0, 1fr))',
        md: 'repeat(3, minmax(0, 1fr))',
      }}
      gap={{ base: '3', md: '4' }}
    >
      <SummaryCard label="Sökta" value={appliedCount} />

      <SummaryCard label="Inte sökta" value={savedOnlyCount} />

      <Box gridColumn={{ base: '1 / -1', md: 'auto' }}>
        <SummaryCard
          label="Vanligaste roll"
          value={topOccupation?.name ?? 'Ingen ännu'}
          badgeText={topOccupation?.count}
        />
      </Box>
    </Grid>
  );
}
