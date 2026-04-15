'use client';

import { Card, Checkbox, Stack, Text } from '@chakra-ui/react';

type Props = {
  isOutsideCommuteDistance: boolean;
  setIsOutsideCommuteDistance: (value: boolean) => void;
  isOtherOccupation: boolean;
  setIsOtherOccupation: (value: boolean) => void;
};

export function JobGoalSection({
  isOutsideCommuteDistance,
  setIsOutsideCommuteDistance,
  isOtherOccupation,
  setIsOtherOccupation,
}: Props) {
  return (
    <Card.Root variant="outline">
      <Card.Body>
        <Stack gap="4">
          <Stack gap="1">
            <Text fontWeight="semibold">Mål / kategori</Text>
            <Text fontSize="sm" color="fg.muted">
              Markera om jobbet räknas mot något av dina mål.
            </Text>
            <Text fontSize="xs" color="fg.muted">
              Sätts automatiskt – men du kan ändra
            </Text>
          </Stack>

          <Checkbox.Root
            checked={isOutsideCommuteDistance}
            onCheckedChange={(details) => setIsOutsideCommuteDistance(details.checked === true)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Utanför dagpendlingsavstånd</Checkbox.Label>
          </Checkbox.Root>

          <Checkbox.Root
            checked={isOtherOccupation}
            onCheckedChange={(details) => setIsOtherOccupation(details.checked === true)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Annat yrke än nuvarande</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
