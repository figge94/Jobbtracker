import { Badge, Box, Button, Card, Heading, HStack, Stack, Tabs, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import type { Job } from '../../types/job';
import { groupJobsByMonth } from '../../utils/job-grouping';

type Props = {
  jobs: Job[];
  onBack: () => void;
};

function getOccupationStats(jobs: Job[]) {
  const counts: Record<string, number> = {};

  jobs.forEach((job) => {
    const key = job.occupation?.trim() || 'Okänt';
    counts[key] = (counts[key] ?? 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'sv'));
}

function formatMonthYear(dateString: string) {
  return new Date(dateString).toLocaleDateString('sv-SE', {
    month: 'long',
    year: 'numeric',
  });
}

function getTopOccupation(stats: Array<{ name: string; count: number }>) {
  return stats[0] ?? null;
}

export default function HistoryList({ jobs, onBack }: Props) {
  const jobsByMonth = useMemo(() => groupJobsByMonth(jobs), [jobs]);

  const monthKeys = useMemo(() => jobsByMonth.map(([month]) => month), [jobsByMonth]);

  const [selectedMonth, setSelectedMonth] = useState(monthKeys[0] ?? '');

  const selectedMonthJobs = useMemo(() => {
    return jobsByMonth.find(([month]) => month === selectedMonth)?.[1] ?? [];
  }, [jobsByMonth, selectedMonth]);

  const selectedMonthAppliedJobs = useMemo(() => {
    return selectedMonthJobs.filter((job) => job.status !== 'vill_soka');
  }, [selectedMonthJobs]);

  const selectedMonthSavedOnlyJobs = useMemo(() => {
    return selectedMonthJobs.filter((job) => job.status === 'vill_soka');
  }, [selectedMonthJobs]);

  const selectedMonthOccupationStats = useMemo(() => {
    return getOccupationStats(selectedMonthAppliedJobs);
  }, [selectedMonthAppliedJobs]);

  const allAppliedJobs = useMemo(() => {
    return jobs.filter((job) => job.status !== 'vill_soka');
  }, [jobs]);

  const allOccupationStats = useMemo(() => {
    return getOccupationStats(allAppliedJobs);
  }, [allAppliedJobs]);

  const startedMonth = useMemo(() => {
    if (jobs.length === 0) return '';

    const sorted = [...jobs].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return formatMonthYear(sorted[0].createdAt);
  }, [jobs]);

  const topOccupation = useMemo(() => getTopOccupation(allOccupationStats), [allOccupationStats]);
  const topMonthOccupation = useMemo(
    () => getTopOccupation(selectedMonthOccupationStats),
    [selectedMonthOccupationStats]
  );

  return (
    <Stack gap="8">
      <HStack justify="space-between" align="center">
        <Stack gap="1">
          <Heading size="lg">Historik</Heading>
          <Text color="fg.muted" fontSize="sm">
            En överblick över vad du sökt och vad du sparat.
          </Text>
        </Stack>

        <Button variant="ghost" onClick={onBack}>
          Tillbaka
        </Button>
      </HStack>

      {jobs.length === 0 ? (
        <Card.Root borderRadius="3xl" bg="bg.subtle" border="none" boxShadow="none">
          <Card.Body py="10">
            <Text color="fg.muted" textAlign="center">
              Ingen historik ännu.
            </Text>
          </Card.Body>
        </Card.Root>
      ) : (
        <Stack gap="6">
          <Box
            bg="linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)"
            borderRadius="3xl"
            px={{ base: '4', md: '6' }}
            py={{ base: '5', md: '6' }}
            borderWidth="1px"
            borderColor="whiteAlpha.100"
          >
            <Stack gap="6">
              <Stack gap="1">
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  Översikt
                </Text>
                <Heading size="md">Din jobbhistorik</Heading>
                <Text color="fg.muted" maxW="2xl">
                  Sparat {jobs.length} jobb{startedMonth ? ` sedan ${startedMonth}` : ''}.
                </Text>
              </Stack>

              <Stack direction={{ base: 'column', md: 'row' }} gap="3" align="stretch">
                <Box flex="1" bg="bg.subtle" borderRadius="2xl" px="4" py="4">
                  <Text fontSize="sm" color="fg.muted">
                    Totalt sökta jobb
                  </Text>
                  <Heading size="lg" mt="1">
                    {allAppliedJobs.length}
                  </Heading>
                </Box>

                <Box flex="1" bg="bg.subtle" borderRadius="2xl" px="4" py="4">
                  <Text fontSize="sm" color="fg.muted">
                    Sparade men ej sökta
                  </Text>
                  <Heading size="lg" mt="1">
                    {jobs.length - allAppliedJobs.length}
                  </Heading>
                </Box>

                <Box flex="1" bg="bg.subtle" borderRadius="2xl" px="4" py="4">
                  <Text fontSize="sm" color="fg.muted">
                    Vanligaste rollen
                  </Text>
                  <Heading size="sm" mt="2" lineHeight="1.3">
                    {topOccupation ? topOccupation.name : 'Ingen ännu'}
                  </Heading>
                  {topOccupation && (
                    <Badge mt="3" variant="subtle" borderRadius="full" px="2.5">
                      {topOccupation.count}
                    </Badge>
                  )}
                </Box>
              </Stack>

              <Stack gap="3">
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  Totalt per roll
                </Text>

                {allOccupationStats.length === 0 ? (
                  <Text color="fg.muted">Ingen total statistik ännu.</Text>
                ) : (
                  <Stack gap="2">
                    {allOccupationStats.map((item) => (
                      <HStack
                        key={item.name}
                        justify="space-between"
                        px="4"
                        py="3"
                        bg="bg.subtle"
                        borderRadius="xl"
                      >
                        <Text fontWeight="medium">{item.name}</Text>
                        <Badge variant="subtle" borderRadius="full" px="2.5">
                          {item.count}
                        </Badge>
                      </HStack>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Box>

          <Box
            bg="bg.subtle"
            borderRadius="3xl"
            px={{ base: '4', md: '6' }}
            py={{ base: '5', md: '6' }}
          >
            <Stack gap="5">
              <Stack gap="1">
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                  Månad för månad
                </Text>
                <Heading size="md">Välj period</Heading>
              </Stack>

              <Tabs.Root
                value={selectedMonth}
                onValueChange={(details) => setSelectedMonth(details.value)}
              >
                <Tabs.List bg="transparent" p="0" display="flex" flexWrap="wrap" gap="2">
                  {monthKeys.map((month) => (
                    <Tabs.Trigger
                      key={month}
                      value={month}
                      textTransform="capitalize"
                      borderRadius="full"
                      px="4"
                      py="2"
                      bg="bg"
                      _selected={{
                        bg: 'colorPalette.subtle',
                      }}
                    >
                      {month}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </Tabs.Root>

              <Box
                bg="bg"
                borderRadius="2xl"
                px={{ base: '4', md: '5' }}
                py={{ base: '4', md: '5' }}
              >
                <Stack gap="5">
                  <Stack gap="1">
                    <Heading size="sm" textTransform="capitalize">
                      {selectedMonth || 'Ingen månad vald'}
                    </Heading>
                    <Text color="fg.muted">
                      {selectedMonthJobs.length} jobb totalt denna månad.
                    </Text>
                  </Stack>

                  <Stack direction={{ base: 'column', md: 'row' }} gap="3" align="stretch">
                    <Box flex="1" bg="bg.subtle" borderRadius="xl" px="4" py="3">
                      <Text fontSize="sm" color="fg.muted">
                        Sökta jobb
                      </Text>
                      <Heading size="md" mt="1">
                        {selectedMonthAppliedJobs.length}
                      </Heading>
                    </Box>

                    <Box flex="1" bg="bg.subtle" borderRadius="xl" px="4" py="3">
                      <Text fontSize="sm" color="fg.muted">
                        Ville söka men sökte inte
                      </Text>
                      <Heading size="md" mt="1">
                        {selectedMonthSavedOnlyJobs.length}
                      </Heading>
                    </Box>

                    <Box flex="1" bg="bg.subtle" borderRadius="xl" px="4" py="3">
                      <Text fontSize="sm" color="fg.muted">
                        Vanligaste roll
                      </Text>
                      <Heading size="sm" mt="2" lineHeight="1.3">
                        {topMonthOccupation ? topMonthOccupation.name : 'Ingen ännu'}
                      </Heading>
                      {topMonthOccupation && (
                        <Badge mt="3" variant="subtle" borderRadius="full" px="2.5">
                          {topMonthOccupation.count}
                        </Badge>
                      )}
                    </Box>
                  </Stack>

                  <Stack gap="3">
                    <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                      Sökta roller
                    </Text>

                    {selectedMonthOccupationStats.length === 0 ? (
                      <Text color="fg.muted">Ingen statistik för månaden.</Text>
                    ) : (
                      <Stack gap="2">
                        {selectedMonthOccupationStats.map((item) => (
                          <HStack
                            key={item.name}
                            justify="space-between"
                            px="4"
                            py="3"
                            bg="bg.subtle"
                            borderRadius="xl"
                          >
                            <Text fontWeight="medium">{item.name}</Text>
                            <Badge variant="subtle" borderRadius="full" px="2.5">
                              {item.count}
                            </Badge>
                          </HStack>
                        ))}
                      </Stack>
                    )}
                  </Stack>

                  <Stack gap="3">
                    <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                      Ville söka men sökte inte
                    </Text>

                    {selectedMonthSavedOnlyJobs.length === 0 ? (
                      <Text color="fg.muted">Inga sådana jobb denna månad.</Text>
                    ) : (
                      <Stack gap="2">
                        {selectedMonthSavedOnlyJobs.map((job) => (
                          <Box key={job.id} px="4" py="3" bg="bg.subtle" borderRadius="xl">
                            <Stack gap="1.5">
                              <Text fontWeight="medium">{job.title}</Text>
                              <Text fontSize="sm" color="fg.muted">
                                {job.company}
                              </Text>
                              {job.occupation && (
                                <Badge
                                  alignSelf="flex-start"
                                  variant="subtle"
                                  borderRadius="full"
                                  px="2.5"
                                >
                                  {job.occupation}
                                </Badge>
                              )}
                            </Stack>
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
