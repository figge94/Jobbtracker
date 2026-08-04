import { Checkbox, Stack, Text } from '@chakra-ui/react';

type Props = {
  isRegistered: boolean;
  onRegisteredChange: (value: boolean) => void;
};

export function ActivityReportSettings({ isRegistered, onRegisteredChange }: Props) {
  return (
    <Stack gap="3">
      <Checkbox.Root
        checked={isRegistered}
        onCheckedChange={(details) => {
          onRegisteredChange(details.checked === true);
        }}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Jag är inskriven på Arbetsförmedlingen</Checkbox.Label>
      </Checkbox.Root>

      <Text fontSize="sm" color="fg.muted">
        Då visas knappen för aktivitetsrapportering under rapporteringsperioden.
      </Text>
    </Stack>
  );
}
