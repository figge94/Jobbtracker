import { Badge, Box, HStack, Stack, Text } from '@chakra-ui/react';
import type { StatItem } from '../../utils/history-stats';

type Props = {
  title?: string;
  items: StatItem[];
  emptyText: string;
};

export default function HistoryStatList({ title, items, emptyText }: Props) {
  return (
    <Stack gap="3">
      {title && (
        <Text
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="fg.muted"
          fontWeight="semibold"
        >
          {title}
        </Text>
      )}

      {items.length === 0 ? (
        <Box py="4" px="3" bg="bg.subtle" borderRadius="xl" textAlign="center">
          <Text color="fg.muted" fontSize="sm">
            {emptyText}
          </Text>
        </Box>
      ) : (
        <Stack gap="0">
          {items.map((item, index) => (
            <HStack
              key={item.name}
              justify="space-between"
              gap="4"
              py="3"
              borderBottomWidth={index < items.length - 1 ? '1px' : '0'}
              borderColor="border.subtle"
            >
              <Text
                minW="0"
                fontSize="sm"
                fontWeight="medium"
                lineClamp="2"
                overflowWrap="anywhere"
              >
                {item.name}
              </Text>

              <Badge
                flexShrink="0"
                variant="subtle"
                borderRadius="full"
                minW="8"
                px="2.5"
                justifyContent="center"
                fontVariantNumeric="tabular-nums"
              >
                {item.count}
              </Badge>
            </HStack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
