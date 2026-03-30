import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { InstallAppButton } from "./InstallAppButton";
import { ExpandableSearch } from "./ExpandableSearch";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function AppHeader({ search, onSearchChange }: Props) {
  return (
    <Stack gap="4">
      <Stack direction="row" justify="space-between" align="start" gap="4">
        <Box flex="1" p="2">
          <Heading size="4xl">Jobbtracker</Heading>
          <Text mt="2" color="fg.muted">
            Håll koll på jobb du har sökt eller vill söka.
          </Text>
        </Box>

        <Box pt="2">
          <ExpandableSearch value={search} onChange={onSearchChange} />
        </Box>
        <Stack
          direction="row"
          gap="3"
          justify={{ base: "flex-end", sm: "start" }}
        >
          <InstallAppButton />
        </Stack>
      </Stack>
    </Stack>
  );
}
