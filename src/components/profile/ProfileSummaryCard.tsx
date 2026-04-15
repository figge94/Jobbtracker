import { Badge, Box, Card, HStack, Stack, Text } from '@chakra-ui/react';
import { JOB_GOALS } from '../../utils/job-rules';

type Props = {
  totalJobs: number;
  appliedJobs: number;
  interviewJobs: number;
  outsideCommuteCount: number;
  otherOccupationCount: number;
};

export default function ProfileSummaryCard({
  totalJobs,
  appliedJobs,
  interviewJobs,
  outsideCommuteCount,
  otherOccupationCount,
}: Props) {
  const remainingToGoal = Math.max(JOB_GOALS.total - appliedJobs, 0);
  const totalProgress = Math.min((appliedJobs / JOB_GOALS.total) * 100, 100);

  return (
    <Card.Root borderRadius="2xl" borderWidth="1px" borderColor="border.subtle" bg="bg.panel">
      <Card.Body p="4">
        <Stack gap="4">
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

            <Box>
              <HStack justify="space-between" align="center" mb="2">
                <Text fontSize="sm" fontWeight="medium">
                  Totalt sökta jobb
                </Text>
                <Badge
                  borderRadius="full"
                  px="2.5"
                  py="0.5"
                  variant="subtle"
                  colorPalette={appliedJobs >= JOB_GOALS.total ? 'green' : 'blue'}
                >
                  {appliedJobs} / {JOB_GOALS.total}
                </Badge>
              </HStack>

              <Box
                w="100%"
                h="7px"
                bg="blackAlpha.100"
                _dark={{ bg: 'whiteAlpha.200' }}
                borderRadius="full"
                overflow="hidden"
              >
                <Box
                  h="100%"
                  w={`${totalProgress}%`}
                  bg={appliedJobs >= JOB_GOALS.total ? 'green.400' : 'blue.400'}
                  borderRadius="full"
                  transition="width 0.25s ease"
                />
              </Box>
            </Box>

            <HStack gap="2" wrap="wrap" pt="1">
              <Badge borderRadius="full" px="2.5" py="1" variant="subtle">
                {totalJobs} sparade
              </Badge>
              <Badge borderRadius="full" px="2.5" py="1" variant="subtle">
                {appliedJobs} sökta
              </Badge>
              <Badge borderRadius="full" px="2.5" py="1" variant="subtle">
                {interviewJobs} intervju
              </Badge>
              <Badge borderRadius="full" px="2.5" py="1" variant="subtle">
                {remainingToGoal} kvar till mål
              </Badge>
            </HStack>
          </Stack>

          <Stack gap="2">
            <Text fontSize="sm" color="fg.muted">
              Mål: {outsideCommuteCount} / {JOB_GOALS.outsideCommute} utanför pendling
            </Text>
            <Text fontSize="sm" color="fg.muted">
              Mål: {otherOccupationCount} / {JOB_GOALS.otherOccupation} andra yrken
            </Text>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
