import { useEffect, useMemo, useState } from 'react';
import type { Job } from '../types/job';
import { groupJobsByMonth } from '../utils/job-grouping';
import {
  formatMonthYear,
  getCompanyStats,
  getOccupationStats,
  getTopItem,
} from '../utils/history-stats';

export function useHistoryData(jobs: Job[]) {
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

  const selectedMonthJobs = useMemo(
    () => jobsByMonth.find(([month]) => month === selectedMonth)?.[1] ?? [],
    [jobsByMonth, selectedMonth]
  );

  const selectedMonthAppliedJobs = useMemo(
    () => selectedMonthJobs.filter((job) => job.status !== 'vill_soka'),
    [selectedMonthJobs]
  );

  const selectedMonthSavedOnlyJobs = useMemo(
    () => selectedMonthJobs.filter((job) => job.status === 'vill_soka'),
    [selectedMonthJobs]
  );

  const allAppliedJobs = useMemo(() => jobs.filter((job) => job.status !== 'vill_soka'), [jobs]);

  const selectedMonthOccupationStats = useMemo(
    () => getOccupationStats(selectedMonthAppliedJobs),
    [selectedMonthAppliedJobs]
  );

  const allOccupationStats = useMemo(() => getOccupationStats(allAppliedJobs), [allAppliedJobs]);

  const topCompanies = useMemo(() => getCompanyStats(allAppliedJobs), [allAppliedJobs]);

  const outsideCommuteCount = useMemo(
    () => selectedMonthAppliedJobs.filter((job) => job.isOutsideCommuteDistance).length,
    [selectedMonthAppliedJobs]
  );

  const otherOccupationCount = useMemo(
    () => selectedMonthAppliedJobs.filter((job) => job.isOtherOccupation).length,
    [selectedMonthAppliedJobs]
  );

  const startedMonth = useMemo(() => {
    if (jobs.length === 0) {
      return '';
    }

    const oldestJob = jobs.reduce((oldest, current) =>
      new Date(current.createdAt).getTime() < new Date(oldest.createdAt).getTime()
        ? current
        : oldest
    );

    return formatMonthYear(oldestJob.createdAt);
  }, [jobs]);

  const mostActiveMonth = useMemo(() => {
    if (jobsByMonth.length === 0) {
      return null;
    }

    return jobsByMonth.reduce((max, current) =>
      current[1].length > max[1].length ? current : max
    );
  }, [jobsByMonth]);

  const topOccupation = useMemo(() => getTopItem(allOccupationStats), [allOccupationStats]);

  const topMonthOccupation = useMemo(
    () => getTopItem(selectedMonthOccupationStats),
    [selectedMonthOccupationStats]
  );

  return {
    monthKeys,
    selectedMonth,
    setSelectedMonth,

    selectedMonthJobs,
    selectedMonthAppliedJobs,
    selectedMonthSavedOnlyJobs,
    selectedMonthOccupationStats,

    allAppliedJobs,
    allOccupationStats,
    topCompanies,

    outsideCommuteCount,
    otherOccupationCount,
    startedMonth,
    mostActiveMonth,
    topOccupation,
    topMonthOccupation,
  };
}
