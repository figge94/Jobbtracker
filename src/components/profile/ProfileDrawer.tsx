import { Avatar, Box, Drawer, HStack, Stack, Text } from "@chakra-ui/react";

type Props = {
  open: boolean;
  onClose: () => void;
  totalJobs: number;
  appliedJobs: number;
  interviewJobs: number;
};

export function ProfileDrawer({
  open,
  onClose,
  totalJobs,
  appliedJobs,
  interviewJobs,
}: Props) {
  return (
    <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Profil</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <Stack gap="6">
              <HStack gap="4">
                <Avatar.Root size="xl">
                  <Avatar.Fallback name="Victoria" />
                </Avatar.Root>

                <Box>
                  <Text fontWeight="bold" fontSize="lg">
                    Victoria
                  </Text>
                  <Text color="fg.muted" fontSize="sm">
                    Din jobböversikt
                  </Text>
                </Box>
              </HStack>

              <Stack gap="3">
                <Box borderWidth="1px" rounded="xl" p="4">
                  <Text fontSize="sm" color="fg.muted">
                    Totalt antal jobb
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {totalJobs}
                  </Text>
                </Box>

                <Box borderWidth="1px" rounded="xl" p="4">
                  <Text fontSize="sm" color="fg.muted">
                    Sökt
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {appliedJobs}
                  </Text>
                </Box>

                <Box borderWidth="1px" rounded="xl" p="4">
                  <Text fontSize="sm" color="fg.muted">
                    Intervjuer
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {interviewJobs}
                  </Text>
                </Box>
              </Stack>
            </Stack>
          </Drawer.Body>

          <Drawer.CloseTrigger />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
