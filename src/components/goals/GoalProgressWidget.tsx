import { Badge, Box, Heading, Stack, Text } from '@chakra-ui/react';

type GoalRowProps = {
  label: string;
  value: number;
  goal: number;
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

function GoalRow({ label, value, goal }: GoalRowProps) {
  const safeGoal = goal > 0 ? goal : 1;
  const progress = Math.min((value / safeGoal) * 100, 100);
  const isDone = value >= goal && goal > 0;

  return (
    <Stack gap="2.5">
      <Box display="flex" justifyContent="space-between" alignItems="center" gap="3">
        <Text fontSize="sm" fontWeight="medium" lineHeight="1.3">
          {label}
        </Text>

        <Badge
          variant={isDone ? 'solid' : 'subtle'}
          colorPalette={isDone ? 'green' : 'gray'}
          borderRadius="full"
          px="2.5"
          minW="56px"
          textAlign="center"
          justifyContent="center"
          flexShrink={0}
        >
          {value} / {goal}
        </Badge>
      </Box>

      <Box
        w="100%"
        h="8px"
        bg="blackAlpha.100"
        _dark={{ bg: 'whiteAlpha.200' }}
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          h="100%"
          w={`${progress}%`}
          bg={isDone ? 'green.400' : 'blue.400'}
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
      borderRadius="3xl"
      px={{ base: '4', md: '5' }}
      py={{ base: '4', md: '5' }}
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

          <Heading size="sm">{title ?? 'Din plan'}</Heading>

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
