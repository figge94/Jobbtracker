import { Box, SimpleGrid } from "@chakra-ui/react";
import type { Job, JobStatus } from "../../types/job";
import { JOB_STATUSES } from "../../utils/job-status";
import { JobBoardColumn } from "./JobBoardColumn";

type Props = {
  jobsByStatus: Record<JobStatus, Job[]>;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
};

export function JobBoard({
  jobsByStatus,
  onStatusChange,
  onDelete,
  onEdit,
}: Props) {
  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        gap="5"
        alignItems="start"
      >
        {JOB_STATUSES.map((status) => (
          <JobBoardColumn
            key={status}
            status={status}
            jobs={jobsByStatus[status]}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
