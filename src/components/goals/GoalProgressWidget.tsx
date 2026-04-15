import { Box, Heading, Progress, Stack, Text } from '@chakra-ui/react';

type GoalRowProps = {
  label: string;
  value: number;
  goal: number;
};

type Props = {
  totalCount: number;
  totalGoal: number;
  outsideCommuteCount: number;
  outsideCommuteGoal: number;
  otherOccupationCount: number;
  otherOccupationGoal: number;
};

function GoalRow({ label, value, goal }: GoalRowProps) {
  const safeGoal = goal > 0 ? goal : 1;
  const progress = Math.min((value / safeGoal) * 100, 100);

  return (
    <Stack gap="2">
      <Box display="flex" justifyContent="space-between" gap="3">
        <Text fontWeight="medium">{label}</Text>
        <Text color="fg.muted">
          {value} / {goal}
        </Text>
      </Box>

      <Progress.Root value={progress} borderRadius="full" size="sm">
        <Progress.Track borderRadius="full">
          <Progress.Range borderRadius="full" />
        </Progress.Track>
      </Progress.Root>
    </Stack>
  );
}

export default function GoalProgressWidget({
  totalCount,
  totalGoal,
  outsideCommuteCount,
  outsideCommuteGoal,
  otherOccupationCount,
  otherOccupationGoal,
}: Props) {
  return (
    <Box
      bg="bg.panel"
      borderRadius="3xl"
      px={{ base: '5', md: '6' }}
      py={{ base: '5', md: '6' }}
      borderWidth="1px"
      borderColor="border.subtle"
      boxShadow="sm"
    >
      <Stack gap="5">
        <Stack gap="1">
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color="fg.muted"
            fontWeight="semibold"
          >
            Mål
          </Text>

          <Heading size="md">Din plan</Heading>

          <Text color="fg.muted" fontSize="sm">
            Följ upp hur långt du kommit i dina jobbsökningsmål.
          </Text>
        </Stack>

        <Stack gap="4">
          <GoalRow label="Totalt sökta jobb" value={totalCount} goal={totalGoal} />
          <GoalRow
            label="Utanför dagpendlingsavstånd"
            value={outsideCommuteCount}
            goal={outsideCommuteGoal}
          />
          <GoalRow
            label="Andra yrken än nuvarande"
            value={otherOccupationCount}
            goal={otherOccupationGoal}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
