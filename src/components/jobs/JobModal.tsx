import { lazy, Suspense } from 'react';
import { Box, CloseButton, Dialog, Portal, Spinner } from '@chakra-ui/react';
import type { Job } from '../../types/job';

const JobForm = lazy(() => import('./form/JobForm'));

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (job: Job) => boolean;
  onUpdate: (job: Job) => void;
  editingJob: Job | null;
};

export default function JobModal({ open, onClose, onAdd, onUpdate, editingJob }: Props) {
  const isEditing = editingJob !== null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
      size={{ base: 'full', md: 'lg' }}
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner
          p={{ base: '0', md: '4' }}
          alignItems={{ base: 'stretch', md: 'center' }}
        >
          <Dialog.Content
            w="full"
            maxW={{ base: 'none', md: '4xl' }}
            h={{ base: '100dvh', md: 'auto' }}
            maxH={{ base: '100dvh', md: 'calc(100dvh - 2rem)' }}
            border="none"
            boxShadow={{ base: 'none', md: 'xl' }}
            borderRadius={{ base: '0', md: '2xl' }}
            overflow="hidden"
          >
            <Box
              position="sticky"
              top="0"
              zIndex="2"
              display="flex"
              justifyContent="flex-end"
              px={{ base: '3', md: '4' }}
              pt={{ base: '3', md: '4' }}
              pb="1"
              bg="bg"
            >
              <Dialog.CloseTrigger asChild>
                <CloseButton rounded="full" variant="ghost" aria-label="Stäng formulär" />
              </Dialog.CloseTrigger>
            </Box>

            <Dialog.Body
              overflowY="auto"
              px={{ base: '4', sm: '5', md: '6' }}
              pt={{ base: '2', md: '3' }}
              pb={{
                base: 'calc(1.5rem + env(safe-area-inset-bottom))',
                md: '6',
              }}
            >
              <Suspense
                fallback={
                  <Box minH="240px" display="grid" placeItems="center">
                    <Spinner />
                  </Box>
                }
              >
                <JobForm
                  isEditing={isEditing}
                  onClose={onClose}
                  onAdd={(job) => {
                    const wasAdded = onAdd(job);

                    if (wasAdded) {
                      onClose();
                    }

                    return wasAdded;
                  }}
                  editingJob={editingJob}
                  onUpdate={(job) => {
                    onUpdate(job);
                    onClose();
                  }}
                  onCancelEdit={onClose}
                />
              </Suspense>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
