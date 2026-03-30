import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { JobForm } from "./form/JobForm";
import type { Job } from "../../types/job";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (job: Job) => void;
  onUpdate: (job: Job) => void;
  editingJob: Job | null;
};

export function JobModal({
  open,
  onClose,
  onAdd,
  onUpdate,
  editingJob,
}: Props) {
  const isEditing = editingJob !== null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p="0">
          <Dialog.Content
            maxW="4xl"
            border="none"
            boxShadow="0"
            borderRadius="2xl"
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton
                position="absolute"
                top="4"
                right="4"
                zIndex="1"
                rounded="full"
                variant="ghost"
              />
            </Dialog.CloseTrigger>

            <Dialog.Body overflowY="auto" px="6" py="6" pt="8">
              <JobForm
                isEditing={isEditing}
                onClose={onClose}
                onAdd={(job) => {
                  onAdd(job);
                  onClose();
                }}
                editingJob={editingJob}
                onUpdate={(job) => {
                  onUpdate(job);
                  onClose();
                }}
                onCancelEdit={onClose}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
