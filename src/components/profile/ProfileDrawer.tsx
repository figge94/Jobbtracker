import { Button, Drawer, Stack, Text } from '@chakra-ui/react';
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
  return (
    <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header pb="3">
            <Stack gap="1">
              <Drawer.Title>Profil</Drawer.Title>
              <Text fontSize="sm" color="fg.muted">
                Din översikt och progression.
              </Text>
            </Stack>
          </Drawer.Header>

          <Drawer.Body pb="6">
            <Stack gap="5">
              <ProfileSummaryCard
                totalJobs={totalJobs}
                appliedJobs={stats.sokt}
                interviewJobs={stats.intervju}
                outsideCommuteCount={outsideCommuteCount}
                otherOccupationCount={otherOccupationCount}
              />

              <ProfileStatusGrid stats={stats} />

              <ProfileCityStatsCard cityStats={cityStats} />

              <Button onClick={onOpenHistory} variant="outline" size="lg" w="full">
                Visa historik
              </Button>
            </Stack>
          </Drawer.Body>

          <Drawer.CloseTrigger />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
