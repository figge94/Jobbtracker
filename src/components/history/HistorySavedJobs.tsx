import { Badge, Box, Heading, Stack, Text } from '@chakra-ui/react';
import type { Job } from '../../types/job';

type Props = {
  jobs: Job[];
};

export default function HistorySavedJobs({ jobs }: Props) {
  return (
    <Stack gap="3">
      <Box>
        <Heading size="sm">Ville söka men sökte inte</Heading>

        <Text color="fg.muted" fontSize="sm" mt="1">
          Jobb som sparades men aldrig skickades in.
        </Text>
      </Box>

      {jobs.length === 0 ? (
        <Box bg="bg.subtle" borderRadius="xl" px="4" py="5" textAlign="center">
          <Text color="fg.muted" fontSize="sm">
            Inga sådana jobb denna månad.
          </Text>
        </Box>
      ) : (
        <Stack gap="2">
          {jobs.map((job) => (
            <Box
              key={job.id}
              px={{ base: '3.5', md: '4' }}
              py="3"
              bg="bg.subtle"
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.subtle"
            >
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                align={{ base: 'flex-start', sm: 'center' }}
                gap="2"
              >
                <Box minW="0">
                  <Text fontWeight="semibold" lineClamp="2" overflowWrap="anywhere">
                    {job.title}
                  </Text>

                  <Text fontSize="sm" color="fg.muted" lineClamp="1">
                    {job.company}
                  </Text>
                </Box>

                {job.occupation && (
                  <Badge flexShrink="0" variant="subtle" borderRadius="full" px="2.5">
                    {job.occupation}
                  </Badge>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
