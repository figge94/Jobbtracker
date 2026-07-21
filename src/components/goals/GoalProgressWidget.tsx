import { Badge, Box, Heading, Stack, Text } from '@chakra-ui/react';

type GoalRowProps = {
  label: string;
  value: number;
  goal: number;
  emphasized?: boolean;
};

type Props = {
  title?: string;
  totalCount: number;
  totalGoal: number;
  outsideCommuteCount: number;
  outsideCommuteGoal: number;
  otherOccupationCount: number;
  otherOccupationGoal: number;
};

function getGoalProgress(value: number, goal: number) {
  if (goal <= 0) {
    return {
      progress: 0,
      isDone: false,
    };
  }

  return {
    progress: Math.min((value / goal) * 100, 100),
    isDone: value >= goal,
  };
}

function GoalRow({ label, value, goal, emphasized = false }: GoalRowProps) {
  const { progress, isDone } = getGoalProgress(value, goal);

  return (
    <Stack gap="2.5">
      <Box display="flex" justifyContent="space-between" alignItems="center" gap="3">
        <Text
          fontSize={emphasized ? 'md' : 'sm'}
          fontWeight={emphasized ? 'semibold' : 'medium'}
          lineHeight="1.3"
        >
          {label}
        </Text>

        <Badge
          variant={isDone ? 'solid' : 'subtle'}
          colorPalette={isDone ? 'green' : 'gray'}
          borderRadius="full"
          px="2.5"
          py="0.5"
          minW="58px"
          justifyContent="center"
          flexShrink="0"
          fontVariantNumeric="tabular-nums"
        >
          {value} / {goal}
        </Badge>
      </Box>

      <Box
        w="full"
        h={emphasized ? '8px' : '6px'}
        bg="bg.muted"
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          h="full"
          w={`${progress}%`}
          bg={isDone ? 'green.400' : emphasized ? 'blue.400' : 'gray.400'}
          borderRadius="full"
          transition="width 0.25s ease"
        />
      </Box>
    </Stack>
  );
}

export default function GoalProgressWidget({
  title,
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
      borderRadius="2xl"
      px={{ base: '4', md: '5' }}
      py={{ base: '4', md: '5' }}
      borderWidth="1px"
      borderColor="border.subtle"
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

          <Heading size="md">{title ?? 'Din plan'}</Heading>

          <Text color="fg.muted" fontSize="sm" lineHeight="1.5">
            Följ hur långt du kommit i dina jobbsökningsmål.
          </Text>
        </Stack>

        <GoalRow label="Totalt sökta jobb" value={totalCount} goal={totalGoal} emphasized />

        <Box borderTopWidth="1px" borderColor="border.subtle" />

        <Stack gap="4">
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
