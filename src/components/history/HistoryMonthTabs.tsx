import { Heading, Stack, Tabs, Text } from '@chakra-ui/react';

type Props = {
  monthKeys: string[];
  selectedMonth: string;
  onChange: (value: string) => void;
};

export default function HistoryMonthTabs({ monthKeys, selectedMonth, onChange }: Props) {
  return (
    <Stack gap="5">
      <Stack gap="1">
        <Text fontSize="sm" color="fg.muted" fontWeight="medium">
          Månad för månad
        </Text>
        <Heading size="md">Välj period</Heading>
      </Stack>

      <Tabs.Root value={selectedMonth} onValueChange={(details) => onChange(details.value)}>
        <Tabs.List bg="transparent" p="0" display="flex" flexWrap="wrap" gap="2">
          {monthKeys.map((month) => (
            <Tabs.Trigger
              key={month}
              value={month}
              textTransform="capitalize"
              borderRadius="full"
              px="4"
              py="2"
              bg="bg"
              _selected={{
                bg: 'colorPalette.subtle',
              }}
            >
              {month}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Stack>
  );
}
