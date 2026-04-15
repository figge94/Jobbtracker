import { Button, Card, Heading, HStack, Stack, Text, Box } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import type { Job } from '../../types/job';
import { groupJobsByMonth } from '../../utils/job-grouping';
import {
  formatMonthYear,
  getCompanyStats,
  getOccupationStats,
  getTopItem,
} from '../../utils/history-stats';
import HistoryMonthDetails from './HistoryMonthDetails';
import HistoryMonthTabs from './HistoryMonthTabs';
import HistoryOverview from './HistoryOverview';

type Props = {
  jobs: Job[];
  onBack: () => void;
};

export default function HistoryList({ jobs, onBack }: Props) {
  const jobsByMonth = useMemo(() => groupJobsByMonth(jobs), [jobs]);

  const monthKeys = useMemo(() => jobsByMonth.map(([month]) => month), [jobsByMonth]);

  const [selectedMonth, setSelectedMonth] = useState(monthKeys[0] ?? '');

  useEffect(() => {
    if (monthKeys.length === 0) {
      setSelectedMonth('');
      return;
    }

    if (!monthKeys.includes(selectedMonth)) {
      setSelectedMonth(monthKeys[0]);
    }
  }, [monthKeys, selectedMonth]);

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

  const topCompanies = useMemo(() => {
    return getCompanyStats(allAppliedJobs);
  }, [allAppliedJobs]);

  const startedMonth = useMemo(() => {
    if (jobs.length === 0) return '';

    const sorted = [...jobs].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return formatMonthYear(sorted[0].createdAt);
  }, [jobs]);

  const mostActiveMonth = useMemo(() => {
    if (jobsByMonth.length === 0) return null;

    return jobsByMonth.reduce((max, current) =>
      current[1].length > max[1].length ? current : max
    );
  }, [jobsByMonth]);

  const topOccupation = useMemo(() => getTopItem(allOccupationStats), [allOccupationStats]);

  const topMonthOccupation = useMemo(
    () => getTopItem(selectedMonthOccupationStats),
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
          <HistoryOverview
            totalJobs={jobs.length}
            startedMonth={startedMonth}
            appliedJobsCount={allAppliedJobs.length}
            savedOnlyCount={jobs.length - allAppliedJobs.length}
            topOccupation={topOccupation}
            mostActiveMonth={mostActiveMonth}
            allOccupationStats={allOccupationStats}
            topCompanies={topCompanies}
          />

          <Box
            bg="bg.subtle"
            borderRadius="3xl"
            px={{ base: '4', md: '6' }}
            py={{ base: '5', md: '6' }}
          >
            <Stack gap="5">
              <HistoryMonthTabs
                monthKeys={monthKeys}
                selectedMonth={selectedMonth}
                onChange={setSelectedMonth}
              />

              <HistoryMonthDetails
                selectedMonth={selectedMonth}
                selectedMonthJobs={selectedMonthJobs}
                selectedMonthAppliedJobs={selectedMonthAppliedJobs}
                selectedMonthSavedOnlyJobs={selectedMonthSavedOnlyJobs}
                selectedMonthOccupationStats={selectedMonthOccupationStats}
                topMonthOccupation={topMonthOccupation}
              />
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
