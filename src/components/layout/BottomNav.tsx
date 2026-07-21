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

function triggerHapticFeedback() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(10);
  }
}

export function BottomNav({ onOpenProfile, onOpenSettings, onCreateJob, active = 'none' }: Props) {
  function handleAction(action: () => void) {
    triggerHapticFeedback();
    action();
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="1000"
      borderTopWidth="1px"
      borderColor="border.subtle"
      borderTopRadius="2xl"
      bg="rgba(255, 255, 255, 0.78)"
      backdropFilter="blur(20px)"
      boxShadow="0 -8px 24px rgba(0, 0, 0, 0.08)"
      _dark={{
        bg: 'rgba(20, 20, 20, 0.78)',
        borderColor: 'whiteAlpha.200',
        boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.35)',
      }}
    >
      <Box
        maxW="460px"
        mx="auto"
        px={{ base: '4', sm: '6' }}
        pt="2"
        pb="calc(0.5rem + env(safe-area-inset-bottom))"
      >
        <Grid templateColumns="1fr auto 1fr" alignItems="center" minH="72px">
          <BottomNavItem
            label="Profil"
            ariaLabel="Öppna profil"
            active={active === 'profile'}
            onClick={() => handleAction(onOpenProfile)}
          >
            <Avatar.Root size="sm">
              <Avatar.Fallback name="Victoria" />
            </Avatar.Root>
          </BottomNavItem>

          <Box display="flex" justifyContent="center" px="4">
            <BottomNavCreateButton onClick={() => handleAction(onCreateJob)} />
          </Box>

          <BottomNavItem
            label="Inställningar"
            ariaLabel="Öppna inställningar"
            active={active === 'settings'}
            onClick={() => handleAction(onOpenSettings)}
          >
            <LuSettings size={22} />
          </BottomNavItem>
        </Grid>
      </Box>
    </Box>
  );
}
