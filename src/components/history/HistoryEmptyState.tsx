import { Card, Heading, Stack, Text } from '@chakra-ui/react';

export default function HistoryEmptyState() {
  return (
    <Card.Root
      bg="bg.subtle"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border.subtle"
      boxShadow="none"
    >
      <Card.Body py={{ base: '10', md: '14' }}>
        <Stack gap="2" align="center" textAlign="center">
          <Heading size="sm">Ingen historik ännu</Heading>

          <Text color="fg.muted" fontSize="sm" maxW="sm">
            När du sparar eller söker jobb kommer statistiken att visas här.
          </Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
