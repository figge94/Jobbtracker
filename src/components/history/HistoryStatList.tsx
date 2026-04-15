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
      <Text fontSize="sm" color="fg.muted" fontWeight="medium">
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
              borderRadius="xl"
            >
              <Text fontWeight="medium">{item.name}</Text>
              <Badge variant="subtle" borderRadius="full" px="2.5">
                {item.count}
              </Badge>
            </HStack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
