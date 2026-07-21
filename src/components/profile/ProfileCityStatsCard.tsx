import { Badge, Card, HStack, Stack, Text } from '@chakra-ui/react';

type Props = {
  cityStats: [string, number][];
};

export default function ProfileCityStatsCard({ cityStats }: Props) {
  return (
    <Card.Root borderRadius="2xl" borderWidth="1px" borderColor="border.subtle">
      <Card.Body>
        <Stack gap="4">
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color="fg.muted"
            fontWeight="semibold"
          >
            Sökta jobb per stad
          </Text>

          {cityStats.length === 0 ? (
            <Text color="fg.muted" fontSize="sm">
              Inga sökta jobb ännu.
            </Text>
          ) : (
            <Stack gap="0">
              {cityStats.map(([city, count], index) => (
                <HStack
                  key={city}
                  justify="space-between"
                  py="3"
                  borderBottomWidth={index < cityStats.length - 1 ? '1px' : '0'}
                  borderColor="border.subtle"
                >
                  <Text fontSize="sm" fontWeight="medium" lineClamp="2">
                    {city}
                  </Text>

                  <Badge variant="subtle" borderRadius="full" minW="8" justifyContent="center">
                    {count}
                  </Badge>
                </HStack>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
