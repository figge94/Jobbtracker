import { IconButton, Text, VStack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';

type Props = {
  onClick: () => void;
};

export function BottomNavCreateButton({ onClick }: Props) {
  return (
    <VStack justifySelf="center" gap="1" mt="-42px">
      <IconButton
        aria-label="Lägg till jobb"
        boxSize="82px"
        rounded="full"
        backdropFilter="blur(20px) saturate(180%)"
        bg="rgba(255,255,255,0.6)"
        border="1px solid rgba(255,255,255,0.5)"
        boxShadow="0 10px 30px rgba(0,0,0,0.15)"
        color="gray.700"
        borderWidth="1px"
        borderColor="gray.200"
        
        _hover={{
          bg: 'gray.50',
          transform: 'scale(1.05)',
        }}
        _active={{
          transform: 'scale(0.96)',
        }}
        _dark={{
          bg: 'gray.800',
          color: 'gray.200',
          borderColor: 'gray.700',
          _hover: {
            bg: 'gray.700',
          },
        }}
        transition="all 0.15s ease"
        onClick={onClick}
      >
        <LuPlus size={34} />
      </IconButton>

      <Text fontSize="xs" color="fg.muted">
        Lägg till
      </Text>
    </VStack>
  );
}
