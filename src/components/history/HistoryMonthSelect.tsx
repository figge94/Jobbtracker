import { Box, Portal, Select, createListCollection } from '@chakra-ui/react';
import { useMemo } from 'react';

type Props = {
  monthKeys: string[];
  selectedMonth: string;
  onChange: (value: string) => void;
};

export default function HistoryMonthSelect({ monthKeys, selectedMonth, onChange }: Props) {
  const monthCollection = useMemo(
    () =>
      createListCollection({
        items: monthKeys.map((month) => ({
          label: month,
          value: month,
        })),
      }),
    [monthKeys]
  );

  return (
    <Box display={{ base: 'block', md: 'none' }}>
      <Select.Root
        collection={monthCollection}
        value={selectedMonth ? [selectedMonth] : []}
        onValueChange={(details) => {
          const value = details.value[0];

          if (value) {
            onChange(value);
          }
        }}
        size="lg"
      >
        <Select.HiddenSelect />

        <Select.Control>
          <Select.Trigger
            bg="bg.subtle"
            borderColor="border.subtle"
            borderRadius="xl"
            px="4"
            minH="12"
            fontWeight="semibold"
            _hover={{
              bg: 'bg.muted',
            }}
            _open={{
              borderColor: 'colorPalette.muted',
              boxShadow: '0 0 0 1px var(--chakra-colors-color-palette-muted)',
            }}
          >
            <Select.ValueText placeholder="Välj månad" textTransform="capitalize" />

            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Trigger>
        </Select.Control>

        <Portal>
          <Select.Positioner>
            <Select.Content
              bg="bg"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.subtle"
              boxShadow="lg"
              p="1.5"
              maxH="280px"
            >
              {monthCollection.items.map((month) => (
                <Select.Item
                  key={month.value}
                  item={month}
                  borderRadius="lg"
                  px="3"
                  py="2.5"
                  textTransform="capitalize"
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{
                    bg: 'bg.subtle',
                  }}
                  _highlighted={{
                    bg: 'bg.subtle',
                  }}
                  _selected={{
                    bg: 'colorPalette.subtle',
                    color: 'colorPalette.fg',
                    fontWeight: 'semibold',
                  }}
                >
                  <Select.ItemText>{month.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
}
