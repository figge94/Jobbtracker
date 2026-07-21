import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { LuClock3 } from 'react-icons/lu';
import { getDaysLeft } from '../../utils/job-deadline';
import { formatDeadlineDate, getDeadlineState } from '../../utils/job-deadline-display';

type Props = {
  deadline: string;
  compact?: boolean;
};

export function JobDeadline({ deadline, compact = false }: Props) {
  const daysLeft = getDaysLeft(deadline);
  const state = getDeadlineState(daysLeft);
  const formattedDate = formatDeadlineDate(deadline, compact);

  return (
    <HStack
      gap="3"
      px="3"
      py="2.5"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={state.borderColor}
      bg={state.bg}
      align="center"
      _dark={{
        borderColor: state.darkBorderColor,
        bg: state.darkBg,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        color={`${state.colorPalette}.600`}
        _dark={{ color: `${state.colorPalette}.300` }}
        flexShrink={0}
      >
        <LuClock3 size={16} />
      </Box>

      <Stack gap="0" minW="0">
        <Text fontSize="sm" fontWeight="semibold" lineHeight="1.3">
          {state.label}
        </Text>

        <Text fontSize="xs" color="fg.muted" lineHeight="1.3">
          {compact ? formattedDate : `Sista ansökan ${formattedDate}`}
        </Text>
      </Stack>
    </HStack>
  );
}
