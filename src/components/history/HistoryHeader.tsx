import { Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';

type Props = {
  onBack: () => void;
};

export default function HistoryHeader({ onBack }: Props) {
  return (
    <HStack justify="space-between" align="flex-start" gap="4">
      <Stack gap="1" minW="0">
        <Heading size={{ base: 'lg', md: 'xl' }}>Historik</Heading>

        <Text color="fg.muted" fontSize="sm">
          En överblick över jobb du sökt och sparat.
        </Text>
      </Stack>

      <Button variant="ghost" size="sm" flexShrink="0" onClick={onBack}>
        Tillbaka
      </Button>
    </HStack>
  );
}
