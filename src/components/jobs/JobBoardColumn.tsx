import { Badge, Box, Card, HStack, Stack, Text } from "@chakra-ui/react";
import type { Job, JobStatus } from "../../types/job";
import { getStatusColor, getStatusLabel } from "../../utils/job-status";
import { JobCard } from "./JobCard";

type Props = {
  status: JobStatus;
  jobs: Job[];
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
};

export function JobBoardColumn({
  status,
  jobs,
  onStatusChange,
  onDelete,
  onEdit,
}: Props) {
  const color = getStatusColor(status);

  return (
    <Card.Root
      variant="subtle"
      borderRadius="2xl"
      h="fit-content"
      overflow="hidden"
      bg="bg.subtle"
      border="1px solid"
      borderColor="border.muted"
      _dark={{
        bg: "whiteAlpha.50",
        borderColor: "whiteAlpha.200",
      }}>
      <Box h="1.5" bg={`${color}.400`} />

      <Card.Body p="4">
        <Stack gap="4">
          <HStack justify="space-between" align="center">
            <Text fontWeight="semibold" fontSize="sm" letterSpacing="0.01em">
              {getStatusLabel(status)}
            </Text>

            <Badge
              colorPalette={color}
              variant="subtle"
              borderRadius="full"
              minW="7"
              justifyContent="center"
              px="2"
              py="0.5"
              fontSize="xs"
              fontWeight="semibold">
              {jobs.length}
            </Badge>
          </HStack>

          {jobs.length === 0 ? (
            <Box
              py="8"
              px="4"
              borderRadius="xl"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="border.muted"
              bg="transparent"
              _dark={{
                borderColor: "whiteAlpha.200",
              }}
              textAlign="center">
              <Text fontSize="sm" color="fg.muted">
                Inga jobb här ännu
              </Text>
            </Box>
          ) : (
            <Stack gap="4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  compact
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
