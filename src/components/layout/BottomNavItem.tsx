import { IconButton, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type Props = {
  label: string;
  ariaLabel: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function BottomNavItem({ label, ariaLabel, active = false, onClick, children }: Props) {
  return (
    <VStack justifySelf="center" gap="1">
      <IconButton
        aria-label={ariaLabel}
        rounded="full"
        variant="ghost"
        size="xl"
        color={active ? 'blue.500' : undefined}
        bg={active ? 'blue.50' : undefined}
        onClick={onClick}
        _hover={{
          bg: active ? 'blue.100' : 'blackAlpha.50',
          _dark: {
            bg: active ? 'blue.900' : 'whiteAlpha.100',
          },
        }}
        _dark={{
          color: active ? 'blue.300' : undefined,
          bg: active ? 'blue.900' : undefined,
        }}
      >
        {children}
      </IconButton>

      <Text
        fontSize="xs"
        color={active ? 'blue.500' : 'fg.muted'}
        _dark={{ color: active ? 'blue.300' : 'fg.muted' }}
      >
        {label}
      </Text>
    </VStack>
  );
}
