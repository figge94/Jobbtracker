'use client';

import {
  Box,
  Portal,
  Spinner,
  Stack,
  Toaster as ChakraToaster,
  Toast,
  createToaster,
} from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'bottom',
  pauseOnPageIdle: true,
});

function getToastStyles(type?: string) {
  switch (type) {
    case 'success':
      return {
        bg: 'rgba(34, 197, 94, 0.18)',
        color: 'green.900',
        borderColor: 'rgba(34, 197, 94, 0.35)',
        darkBg: 'rgba(34, 197, 94, 0.16)',
        darkColor: 'green.100',
        darkBorderColor: 'rgba(34, 197, 94, 0.28)',
      };
    case 'error':
      return {
        bg: 'rgba(239, 68, 68, 0.18)',
        color: 'red.900',
        borderColor: 'rgba(239, 68, 68, 0.35)',
        darkBg: 'rgba(239, 68, 68, 0.16)',
        darkColor: 'red.100',
        darkBorderColor: 'rgba(239, 68, 68, 0.28)',
      };
    case 'warning':
      return {
        bg: 'rgba(249, 115, 22, 0.18)',
        color: 'orange.900',
        borderColor: 'rgba(249, 115, 22, 0.35)',
        darkBg: 'rgba(249, 115, 22, 0.16)',
        darkColor: 'orange.100',
        darkBorderColor: 'rgba(249, 115, 22, 0.28)',
      };
    case 'info':
      return {
        bg: 'rgba(59, 130, 246, 0.18)',
        color: 'blue.900',
        borderColor: 'rgba(59, 130, 246, 0.35)',
        darkBg: 'rgba(59, 130, 246, 0.16)',
        darkColor: 'blue.100',
        darkBorderColor: 'rgba(59, 130, 246, 0.28)',
      };
    case 'loading':
      return {
        bg: 'rgba(107, 114, 128, 0.22)',
        color: 'gray.900',
        borderColor: 'rgba(107, 114, 128, 0.35)',
        darkBg: 'rgba(255, 255, 255, 0.08)',
        darkColor: 'white',
        darkBorderColor: 'rgba(255, 255, 255, 0.16)',
      };
    default:
      return {
        bg: 'rgba(107, 114, 128, 0.18)',
        color: 'gray.900',
        borderColor: 'rgba(107, 114, 128, 0.3)',
        darkBg: 'rgba(255, 255, 255, 0.08)',
        darkColor: 'white',
        darkBorderColor: 'rgba(255, 255, 255, 0.16)',
      };
  }
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => {
          const styles = getToastStyles(toast.type);

          return (
            <Toast.Root
              width={{ base: 'calc(100vw - 32px)', md: 'sm' }}
              mx="auto"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={styles.borderColor}
              bg={styles.bg}
              color={styles.color}
              backdropFilter="blur(16px)"
              boxShadow="0 12px 30px rgba(0,0,0,0.18)"
              _dark={{
                bg: styles.darkBg,
                color: styles.darkColor,
                borderColor: styles.darkBorderColor,
              }}
            >
              <Box px="4" py="3" w="100%">
                <Stack direction="row" gap="3" align="start">
                  {toast.type === 'loading' ? (
                    <Spinner size="sm" mt="1" />
                  ) : (
                    <Toast.Indicator mt="1" />
                  )}

                  <Stack gap="1" flex="1" maxWidth="100%">
                    {toast.title && <Toast.Title fontWeight="bold">{toast.title}</Toast.Title>}

                    {toast.description && (
                      <Toast.Description opacity={0.85}>{toast.description}</Toast.Description>
                    )}
                  </Stack>

                  {toast.action && (
                    <Toast.ActionTrigger
                      borderRadius="lg"
                      px="3"
                      py="1"
                      fontSize="sm"
                      fontWeight="medium"
                      bg="whiteAlpha.300"
                      _hover={{ bg: 'whiteAlpha.400' }}
                      _dark={{
                        bg: 'whiteAlpha.200',
                        _hover: { bg: 'whiteAlpha.300' },
                      }}
                    >
                      {toast.action.label}
                    </Toast.ActionTrigger>
                  )}

                  {toast.closable && <Toast.CloseTrigger />}
                </Stack>
              </Box>
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
