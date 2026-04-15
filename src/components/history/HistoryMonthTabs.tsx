import { Heading, HStack, Tabs, Text } from '@chakra-ui/react';

type Props = {
  monthKeys: string[];
  selectedMonth: string;
  onChange: (value: string) => void;
};

export default function HistoryMonthTabs({ monthKeys, selectedMonth, onChange }: Props) {
  return (
    <>
      <HStack justify="space-between" align="end" wrap="wrap" gap="3">
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="fg.muted"
          fontWeight="semibold"
        >
          Månad för månad
        </Text>

        <Heading size="md">Välj period</Heading>
      </HStack>

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
              fontWeight="medium"
              bg="bg"
              borderWidth="1px"
              borderColor="border.subtle"
              _selected={{
                bg: 'colorPalette.subtle',
                borderColor: 'colorPalette.muted',
              }}
            >
              {month}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </>
  );
}
