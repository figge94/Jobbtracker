import { Badge, HStack, Stack, Text } from '@chakra-ui/react';
import type { StatItem } from '../../utils/history-stats';

type Props = {
  title: string;
  items: StatItem[];
  emptyText: string;
};

export default function HistoryStatList({ title, items, emptyText }: Props) {
  return (
    <Stack gap="3">
      <Text
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="0.08em"
        color="fg.muted"
        fontWeight="semibold"
      >
        {title}
      </Text>

      {items.length === 0 ? (
        <Text color="fg.muted">{emptyText}</Text>
      ) : (
        <Stack gap="2">
          {items.map((item) => (
            <HStack
              key={item.name}
              justify="space-between"
              px="4"
              py="3"
              bg="bg.subtle"
              borderWidth="1px"
              borderColor="border.subtle"
              borderRadius="xl"
            >
              <Text fontWeight="medium" truncate>
                {item.name}
              </Text>

              <Badge variant="subtle" borderRadius="full" px="2.5" minW="8" justifyContent="center">
                {item.count}
              </Badge>
            </HStack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
