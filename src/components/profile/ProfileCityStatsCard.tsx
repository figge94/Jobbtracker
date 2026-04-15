import { Badge, Card, HStack, Stack, Text } from '@chakra-ui/react';

type Props = {
  cityStats: [string, number][];
};

export default function ProfileCityStatsCard({ cityStats }: Props) {
  return (
    <Card.Root borderRadius="2xl" borderWidth="1px" borderColor="border.subtle" bg="bg.panel">
      <Card.Body p="4">
        <Stack gap="3">
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
            <Text fontSize="sm" color="fg.muted">
              Inga sökta jobb ännu.
            </Text>
          ) : (
            <Stack gap="2">
              {cityStats.map(([city, count]) => (
                <HStack
                  key={city}
                  justify="space-between"
                  px="3"
                  py="2.5"
                  borderRadius="xl"
                  bg="bg.subtle"
                >
                  <Text fontSize="sm" fontWeight="medium">
                    {city}
                  </Text>
                  <Badge borderRadius="full" px="2.5" variant="subtle">
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
