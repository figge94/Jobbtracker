import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { JobBoard } from "./components/jobs/JobBoard";
import { JobList } from "./components/jobs/JobList";
import { JobStats } from "./components/jobs/JobStats";
import { JobFilters } from "./components/jobs/JobFilters";
import { JobModal } from "./components/jobs/JobModal";
import { useJobs } from "./hooks/useJobs";
import { AppHeader } from "./components/AppHeader";
import { groupJobsByMonth } from "./utils/job-grouping";
import { JOB_STATUSES } from "./utils/job-status";
import type { Job, JobStatus } from "./types/job";
import { LuPlus } from "react-icons/lu";

function groupJobsByStatus<T extends { status: JobStatus }>(jobs: T[]) {
  return Object.fromEntries(
    JOB_STATUSES.map((status) => [
      status,
      jobs.filter((job) => job.status === status),
    ])
  ) as Record<JobStatus, T[]>;
}

export default function App() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredJobs,
    stats,
    addJob,
    updateJob,
    deleteJob,
    changeStatus,
  } = useJobs();

  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [showJobs, setShowJobs] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const jobsByMonth = groupJobsByMonth(filteredJobs);
  const { open, onOpen, onClose } = useDisclosure();

  function handleCloseModal() {
    setEditingJob(null);
    onClose();
  }

  return (
    <Container maxW="7xl" py={{ base: "6", md: "10" }} pb="120">
      <Stack gap="8">
        <AppHeader search={search} onSearchChange={setSearch} />

        <JobStats stats={stats} />

        <JobFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <Button
          alignSelf="flex-start"
          variant="outline"
          size="sm"
          onClick={() => setShowJobs((prev) => !prev)}>
          {showJobs ? "Dölj jobb" : "Visa jobb"}
        </Button>

        {showJobs &&
          (viewMode === "list" ? (
            <JobList
              jobs={filteredJobs}
              onDelete={deleteJob}
              onStatusChange={changeStatus}
              onEdit={(job) => {
                setEditingJob(job);
                onOpen();
              }}
            />
          ) : (
            <Stack gap="8">
              {jobsByMonth.map(([month, monthJobs]) => (
                <Stack key={month} gap="4">
                  <Heading size="md" textTransform="capitalize">
                    {month} ({monthJobs.length})
                  </Heading>

                  <JobBoard
                    jobsByStatus={groupJobsByStatus(monthJobs)}
                    onStatusChange={changeStatus}
                    onDelete={deleteJob}
                    onEdit={(job) => {
                      setEditingJob(job);
                      onOpen();
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          ))}
      </Stack>

      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        h="72px"
        borderTopWidth="1px"
        bg="bg"
        zIndex="1000">
        <Box position="relative" h="full">
          <IconButton
            aria-label="Lägg till jobb"
            boxSize="68px"
            rounded="full"
            bg="white"
            color="gray.800"
            boxShadow="lg"
            _hover={{
              bg: "gray.50",
              transform: "translateX(-50%) scale(1.05)",
            }}
            _active={{
              transform: "translateX(-50%) scale(0.95)",
            }}
            transition="all 0.15s ease"
            position="absolute"
            left="50%"
            top="-34px"
            transform="translateX(-50%)"
            onClick={() => {
              setEditingJob(null);
              onOpen();
            }}>
            <LuPlus size={30} />
          </IconButton>
        </Box>
      </Box>

      <JobModal
        open={open}
        onClose={handleCloseModal}
        onAdd={addJob}
        onUpdate={updateJob}
        editingJob={editingJob}
      />
    </Container>
  );
}
