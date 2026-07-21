import { Button, Dialog, Portal, Stack } from '@chakra-ui/react';

type Props = {
  open: boolean;
  jobTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export function JobDeleteDialog({ open, jobTitle, onClose, onConfirm }: Props) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(event) => {
        if (!event.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Ta bort jobb</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>Är du säker på att du vill ta bort &quot;{jobTitle}&quot;?</Dialog.Body>

            <Dialog.Footer>
              <Stack direction="row">
                <Button variant="ghost" onClick={onClose}>
                  Avbryt
                </Button>

                <Button colorPalette="red" onClick={onConfirm}>
                  Ta bort
                </Button>
              </Stack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
