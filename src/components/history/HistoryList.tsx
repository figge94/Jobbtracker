import { Box, Stack } from '@chakra-ui/react';
import type { Job } from '../../types/job';
import { JOB_GOALS } from '../../utils/job-rules';
import GoalProgressWidget from '../goals/GoalProgressWidget';
import HistoryEmptyState from './HistoryEmptyState';
import HistoryHeader from './HistoryHeader';
import HistoryMonthDetails from './HistoryMonthDetails';
import HistoryMonthTabs from './HistoryMonthTabs';
import HistoryOverview from './HistoryOverview';
import { useHistoryData } from '../../hooks/useHistoryData';

type Props = {
  jobs: Job[];
  onBack: () => void;
};

export default function HistoryList({ jobs, onBack }: Props) {
  const history = useHistoryData(jobs);

  return (
    <Stack gap={{ base: '6', md: '9' }}>
      <HistoryHeader onBack={onBack} />

      {jobs.length === 0 ? (
        <HistoryEmptyState />
      ) : (
        <Stack gap={{ base: '8', md: '10' }}>
          <GoalProgressWidget
            totalCount={history.selectedMonthAppliedJobs.length}
            totalGoal={JOB_GOALS.total}
            outsideCommuteCount={history.outsideCommuteCount}
            outsideCommuteGoal={JOB_GOALS.outsideCommute}
            otherOccupationCount={history.otherOccupationCount}
            otherOccupationGoal={JOB_GOALS.otherOccupation}
          />

          <HistoryOverview
            totalJobs={jobs.length}
            startedMonth={history.startedMonth}
            appliedJobsCount={history.allAppliedJobs.length}
            savedOnlyCount={jobs.length - history.allAppliedJobs.length}
            topOccupation={history.topOccupation}
            mostActiveMonth={history.mostActiveMonth}
            allOccupationStats={history.allOccupationStats}
            topCompanies={history.topCompanies}
          />

          <Box borderTopWidth="1px" borderColor="border.subtle" pt={{ base: '6', md: '8' }}>
            <Stack gap={{ base: '5', md: '7' }}>
              <HistoryMonthTabs
                monthKeys={history.monthKeys}
                selectedMonth={history.selectedMonth}
                onChange={history.setSelectedMonth}
              />

              <HistoryMonthDetails
                selectedMonth={history.selectedMonth}
                selectedMonthJobs={history.selectedMonthJobs}
                selectedMonthAppliedJobs={history.selectedMonthAppliedJobs}
                selectedMonthSavedOnlyJobs={history.selectedMonthSavedOnlyJobs}
                selectedMonthOccupationStats={history.selectedMonthOccupationStats}
                topMonthOccupation={history.topMonthOccupation}
              />
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
