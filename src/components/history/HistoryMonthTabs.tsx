import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import HistoryMonthSelect from './HistoryMonthSelect';
import HistoryMonthTabList from './HistoryMonthTabList';

type Props = {
  monthKeys: string[];
  selectedMonth: string;
  onChange: (value: string) => void;
};

export default function HistoryMonthTabs({ monthKeys, selectedMonth, onChange }: Props) {
  return (
    <Stack gap={{ base: '3', md: '4' }}>
      <Box>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="fg.muted"
          fontWeight="semibold"
        >
          Månad för månad
        </Text>

        <Heading size={{ base: 'sm', md: 'md' }} mt="1">
          Välj period
        </Heading>
      </Box>

      {monthKeys.length === 0 ? (
        <Box
          bg="bg.subtle"
          borderRadius="xl"
          px="4"
          py="5"
          borderWidth="1px"
          borderColor="border.subtle"
        >
          <Text color="fg.muted" fontSize="sm">
            Det finns ingen historik ännu.
          </Text>
        </Box>
      ) : (
        <>
          <HistoryMonthSelect
            monthKeys={monthKeys}
            selectedMonth={selectedMonth}
            onChange={onChange}
          />

          <HistoryMonthTabList
            monthKeys={monthKeys}
            selectedMonth={selectedMonth}
            onChange={onChange}
          />
        </>
      )}
    </Stack>
  );
}
