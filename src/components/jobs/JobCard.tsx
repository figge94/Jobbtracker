import { useState } from 'react';
import { Badge, Box, Card, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { LuExternalLink } from 'react-icons/lu';
import type { Job, JobStatus } from '../../types/job';
import { getJobDateLabel } from '../../utils/job-date';
import { getStatusColor } from '../../utils/job-status';
import { toaster } from '../ui/toaster';
import { JobCardHeader } from './JobCardHeader';
import { JobDeadline } from './JobDeadline';
import { JobDeleteDialog } from './JobDeleteDialog';
import { JobMeta } from './JobMeta';

const MotionBox = motion.create(Box);

type Props = {
  job: Job;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
  onEdit: (job: Job) => void;
  compact?: boolean;
};

export function JobCard({ job, onDelete, onStatusChange, onEdit, compact = false }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const x = useMotionValue(0);
  const swipeEnabled = !compact;
  const dateLabel = getJobDateLabel(job);

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    animate(x, 0);
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
    animate(x, 0);
  };

  const handleDelete = () => {
    onDelete(job.id);
    setDeleteDialogOpen(false);

    toaster.create({
      title: 'Jobb borttaget',
      description: `"${job.title}" togs bort`,
      type: 'success',
    });
  };

  return (
    <>
      <Box position="relative">
        {swipeEnabled && (
          <Box
            position="absolute"
            inset="0"
            bg="red.500"
            borderRadius={{ base: 'xl', md: '2xl' }}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            px="6"
            color="white"
            fontWeight="bold"
            opacity={isDragging ? 1 : 0}
            transition="opacity 0.2s"
          >
            Ta bort
          </Box>
        )}

        <MotionBox
          position="relative"
          zIndex={1}
          style={{ x }}
          drag={swipeEnabled ? 'x' : false}
          dragConstraints={{ left: -140, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDrag={(_, info) => {
            setIsDragging(info.offset.x < -8);
          }}
          onDragStart={() => {
            if (swipeEnabled) {
              setIsDragging(true);
            }
          }}
          onDragEnd={(_, info) => {
            setIsDragging(false);

            if (swipeEnabled && info.offset.x < -120) {
              openDeleteDialog();
              return;
            }

            animate(x, 0);
          }}
        >
          <Card.Root
            variant="outline"
            borderRadius="2xl"
            overflow="hidden"
            bg="bg.panel"
            transition="0.2s"
            _hover={{
              shadow: 'md',
              translateY: '-1px',
            }}
          >
            {!compact && (
              <Box h={{ base: '1', md: '1.5' }} bg={`${getStatusColor(job.status)}.400`} />
            )}

            <Card.Body p={compact ? '4' : { base: '4', md: '5' }}>
              <Stack gap={{ base: '3.5', md: '4' }}>
                <JobCardHeader
                  job={job}
                  compact={compact}
                  onStatusChange={(status) => onStatusChange(job.id, status)}
                  onEdit={() => onEdit(job)}
                  onDelete={openDeleteDialog}
                />

                <JobMeta
                  occupation={job.occupation}
                  city={job.city}
                  employmentType={job.employmentType}
                />

                {(job.isOutsideCommuteDistance || job.isOtherOccupation) && (
                  <HStack gap="2" wrap="wrap">
                    {job.isOutsideCommuteDistance && (
                      <Badge variant="subtle" borderRadius="full" px="2.5">
                        Utanför pendling
                      </Badge>
                    )}

                    {job.isOtherOccupation && (
                      <Badge variant="subtle" borderRadius="full" px="2.5">
                        Annat yrke
                      </Badge>
                    )}
                  </HStack>
                )}

                {job.url && (
                  <Link
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    display="inline-flex"
                    alignItems="center"
                    gap="1.5"
                    color="blue.600"
                    fontWeight="semibold"
                    _hover={{
                      color: 'blue.500',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                    }}
                  >
                    Öppna annons
                    <Box as={LuExternalLink} boxSize="3.5" />
                  </Link>
                )}

                {job.deadline && <JobDeadline deadline={job.deadline} compact />}

                {!compact && dateLabel && (
                  <Text fontSize="xs" color="fg.muted">
                    {dateLabel}
                  </Text>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>
        </MotionBox>
      </Box>

      <JobDeleteDialog
        open={deleteDialogOpen}
        jobTitle={job.title}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
      />
    </>
  );
}
