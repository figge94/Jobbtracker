"use client";

import {
  Box,
  HStack,
  Portal,
  Spinner,
  Stack,
  Text,
  Toast,
  Toaster as ChakraToaster,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root
            width={{ base: "full", md: "sm" }}
            borderRadius="xl"
            borderWidth="1px"
            shadow="lg"
            px="4"
            py="3"
            color="gray.800"
            borderColor="gray.200"
            bgGradient="to-r"
            gradientFrom="green.400"
            gradientTo="blue.400"
            _dark={{
              bg: "gray.800",
              color: "white",
              borderColor: "gray.700",
            }}
          >
            <HStack align="start" gap="3" width="full">
              <Box pt="1">
                {toast.type === "loading" ? (
                  <Spinner size="md" color="blue.500" />
                ) : (
                  <Toast.Indicator />
                )}
              </Box>

              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && (
                  <Toast.Title fontWeight="semibold" lineHeight="1.2">
                    {toast.title}
                  </Toast.Title>
                )}

                {toast.description && (
                  <Toast.Description>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.300" }}
                    >
                      {toast.description}
                    </Text>
                  </Toast.Description>
                )}
              </Stack>

              <HStack gap="2" align="start">
                {toast.action && (
                  <Toast.ActionTrigger
                    px="3"
                    py="1.5"
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="medium"
                    bg="blackAlpha.50"
                    _hover={{ bg: "blackAlpha.100" }}
                    _dark={{
                      bg: "whiteAlpha.100",
                      _hover: { bg: "whiteAlpha.200" },
                    }}
                  >
                    {toast.action.label}
                  </Toast.ActionTrigger>
                )}

                {toast.closable && <Toast.CloseTrigger mt="1" />}
              </HStack>
            </HStack>
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
