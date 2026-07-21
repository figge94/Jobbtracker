import { Box, Card, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { JOB_GOALS } from '../../utils/job-rules';

type Props = {
  totalJobs: number;
  appliedJobs: number;
  interviewJobs: number;
  outsideCommuteCount: number;
  otherOccupationCount: number;
};

type StatProps = {
  label: string;
  value: number;
};

function SummaryStat({ label, value }: StatProps) {
  return (
    <Stack gap="1">
      <Text fontSize="xl" fontWeight="semibold" lineHeight="1" fontVariantNumeric="tabular-nums">
        {value}
      </Text>

      <Text fontSize="xs" color="fg.muted">
        {label}
      </Text>
    </Stack>
  );
}

type GoalRowProps = {
  label: string;
  value: number;
  goal: number;
};

function GoalRow({ label, value, goal }: GoalRowProps) {
  const progress = goal > 0 ? Math.min((value / goal) * 100, 100) : 0;
  const isDone = goal > 0 && value >= goal;

  return (
    <Stack gap="2">
      <HStack justify="space-between" gap="4">
        <Text fontSize="sm" fontWeight="medium">
          {label}
        </Text>

        <Text
          flexShrink="0"
          fontSize="sm"
          color={isDone ? 'green.fg' : 'fg.muted'}
          fontWeight="semibold"
          fontVariantNumeric="tabular-nums"
        >
          {value} / {goal}
        </Text>
      </HStack>

      <Box h="6px" bg="bg.muted" borderRadius="full" overflow="hidden">
        <Box
          h="full"
          w={`${progress}%`}
          bg={isDone ? 'green.400' : 'blue.400'}
          borderRadius="full"
          transition="width 0.25s ease"
        />
      </Box>
    </Stack>
  );
}

export default function ProfileSummaryCard({
  totalJobs,
  appliedJobs,
  interviewJobs,
  outsideCommuteCount,
  otherOccupationCount,
}: Props) {
  const totalProgress =
    JOB_GOALS.total > 0 ? Math.min((appliedJobs / JOB_GOALS.total) * 100, 100) : 0;

  const remainingToGoal = Math.max(JOB_GOALS.total - appliedJobs, 0);
  const totalGoalReached = appliedJobs >= JOB_GOALS.total;

  return (
    <Card.Root
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border.subtle"
      bg="bg.panel"
      boxShadow="none"
    >
      <Card.Body p="5">
        <Stack gap="6">
          <Stack gap="3">
            <HStack justify="space-between" align="flex-end" gap="4">
              <Stack gap="1">
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                  color="fg.muted"
                  fontWeight="semibold"
                >
                  Månadens mål
                </Text>

                <Text
                  fontSize="3xl"
                  lineHeight="1"
                  fontWeight="bold"
                  fontVariantNumeric="tabular-nums"
                >
                  {appliedJobs}
                  <Text as="span" ml="1" fontSize="md" color="fg.muted" fontWeight="medium">
                    / {JOB_GOALS.total}
                  </Text>
                </Text>
              </Stack>

              <Text
                fontSize="sm"
                color={totalGoalReached ? 'green.fg' : 'fg.muted'}
                fontWeight="medium"
                textAlign="right"
              >
                {totalGoalReached ? 'Målet är uppnått' : `${remainingToGoal} kvar`}
              </Text>
            </HStack>

            <Box h="8px" bg="bg.muted" borderRadius="full" overflow="hidden">
              <Box
                h="full"
                w={`${totalProgress}%`}
                bg={totalGoalReached ? 'green.400' : 'blue.400'}
                borderRadius="full"
                transition="width 0.25s ease"
              />
            </Box>
          </Stack>

          <SimpleGrid columns={3} gap="4">
            <SummaryStat label="Sparade" value={totalJobs} />
            <SummaryStat label="Sökta" value={appliedJobs} />
            <SummaryStat label="Intervjuer" value={interviewJobs} />
          </SimpleGrid>

          <Box borderTopWidth="1px" borderColor="border.subtle" />

          <Stack gap="4">
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color="fg.muted"
              fontWeight="semibold"
            >
              Övriga mål
            </Text>

            <GoalRow
              label="Utanför pendlingsavstånd"
              value={outsideCommuteCount}
              goal={JOB_GOALS.outsideCommute}
            />

            <GoalRow
              label="Andra yrkesområden"
              value={otherOccupationCount}
              goal={JOB_GOALS.otherOccupation}
            />
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
