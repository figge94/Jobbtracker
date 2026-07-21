import { Box, Tabs } from '@chakra-ui/react';

type Props = {
  monthKeys: string[];
  selectedMonth: string;
  onChange: (value: string) => void;
};

export default function HistoryMonthTabList({ monthKeys, selectedMonth, onChange }: Props) {
  return (
    <Box display={{ base: 'none', md: 'block' }} minW="0">
      <Tabs.Root
        value={selectedMonth}
        onValueChange={(details) => onChange(details.value)}
        colorPalette="blue"
      >
        <Box overflowX="auto" pb="1">
          <Tabs.List
            display="flex"
            flexWrap="nowrap"
            gap="1"
            minW="max-content"
            p="1"
            bg="bg.subtle"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="border.subtle"
          >
            {monthKeys.map((month) => (
              <Tabs.Trigger
                key={month}
                value={month}
                flexShrink="0"
                px="4"
                py="2"
                borderRadius="lg"
                textTransform="capitalize"
                whiteSpace="nowrap"
                fontSize="sm"
                fontWeight="medium"
                color="fg.muted"
                _hover={{
                  bg: 'bg',
                  color: 'fg',
                }}
                _selected={{
                  bg: 'bg',
                  color: 'fg',
                  fontWeight: 'semibold',
                  boxShadow: 'sm',
                }}
              >
                {month}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Box>
      </Tabs.Root>
    </Box>
  );
}
