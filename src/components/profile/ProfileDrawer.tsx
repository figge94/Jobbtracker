import { Button, CloseButton, Drawer, Stack, Text } from '@chakra-ui/react';
import type { JobStatus } from '../../types/job';
import ProfileCityStatsCard from './ProfileCityStatsCard';
import ProfileStatusGrid from './ProfileStatusGrid';
import ProfileSummaryCard from './ProfileSummaryCard';

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenHistory: () => void;
  stats: Record<JobStatus, number>;
  cityStats: [string, number][];
  totalJobs: number;
  outsideCommuteCount: number;
  otherOccupationCount: number;
};

export default function ProfileDrawer({
  open,
  onClose,
  onOpenHistory,
  stats,
  cityStats,
  totalJobs,
  outsideCommuteCount,
  otherOccupationCount,
}: Props) {
  const monthName = new Date().toLocaleDateString('sv-SE', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Drawer.Root
      open={open}
      placement="end"
      onOpenChange={(event) => {
        if (!event.open) {
          onClose();
        }
      }}
    >
      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content maxW={{ base: 'full', sm: '420px' }} bg="bg.canvas">
          <Drawer.Header
            px={{ base: '5', md: '6' }}
            pt={{ base: '5', md: '6' }}
            pb="4"
            borderBottomWidth="1px"
            borderColor="border.subtle"
          >
            <Stack gap="1" pr="8">
              <Drawer.Title fontSize="xl">Månadens progress</Drawer.Title>

              <Text fontSize="sm" color="fg.muted">
                Din utveckling under {monthName}.
              </Text>
            </Stack>
          </Drawer.Header>

          <Drawer.CloseTrigger asChild>
            <CloseButton position="absolute" top="4" right="4" size="sm" aria-label="Stäng" />
          </Drawer.CloseTrigger>

          <Drawer.Body px={{ base: '5', md: '6' }} py="5">
            <Stack gap="6">
              <ProfileSummaryCard
                totalJobs={totalJobs}
                appliedJobs={stats.sokt}
                interviewJobs={stats.intervju}
                outsideCommuteCount={outsideCommuteCount}
                otherOccupationCount={otherOccupationCount}
              />

              <ProfileStatusGrid stats={stats} />

              <ProfileCityStatsCard cityStats={cityStats} />
            </Stack>
          </Drawer.Body>

          <Drawer.Footer
            px={{ base: '5', md: '6' }}
            py="4"
            borderTopWidth="1px"
            borderColor="border.subtle"
            bg="bg.panel"
          >
            <Button onClick={onOpenHistory} variant="solid" size="lg" w="full">
              Visa fullständig historik
            </Button>
          </Drawer.Footer>

          <Drawer.CloseTrigger />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
