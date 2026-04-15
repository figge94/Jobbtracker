import { Avatar, Box, Grid } from '@chakra-ui/react';
import { LuSettings } from 'react-icons/lu';
import { BottomNavCreateButton } from './BottomNavCreateButton';
import { BottomNavItem } from './BottomNavItem';

type Props = {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onCreateJob: () => void;
  active?: 'profile' | 'settings' | 'none';
};

function vibrate() {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(10);
  }
}

export function BottomNav({ onOpenProfile, onOpenSettings, onCreateJob, active = 'none' }: Props) {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      minH="92px"
      pb="env(safe-area-inset-bottom)"
      zIndex="1000"
      backdropFilter="blur(24px) saturate(180%)"
      bg="rgba(255,255,255,0.65)"
      borderTop="1px solid rgba(255,255,255,0.4)"
      boxShadow="0 -10px 30px rgba(0,0,0,0.08)"
      borderTopRadius="2xl"
      _dark={{
        bg: 'rgba(20,20,20,0.6)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.4)',
      }}
    >
      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(to top, rgba(255,255,255,0.25), transparent)"
        pointerEvents="none"
      />

      <Box
        position="relative"
        minH="92px"
        pb="env(safe-area-inset-bottom)"
        maxW="460px"
        mx="auto"
        px="6"
      >
        <Grid templateColumns="1fr 1fr 1fr" alignItems="center" minH="92px">
          <BottomNavItem
            label="Profil"
            ariaLabel="Profil"
            active={active === 'profile'}
            onClick={() => {
              vibrate();
              onOpenProfile();
            }}
          >
            <Avatar.Root size="sm">
              <Avatar.Fallback name="Victoria" />
            </Avatar.Root>
          </BottomNavItem>

          <BottomNavCreateButton
            onClick={() => {
              vibrate();
              onCreateJob();
            }}
          />

          <BottomNavItem
            label="Inställningar"
            ariaLabel="Inställningar"
            active={active === 'settings'}
            onClick={() => {
              vibrate();
              onOpenSettings();
            }}
          >
            <LuSettings size={22} />
          </BottomNavItem>
        </Grid>
      </Box>
    </Box>
  );
}
