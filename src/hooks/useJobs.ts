import { useEffect, useMemo, useState } from 'react';
import type { Job, JobStatus } from '../types/job';
import { JOB_STATUSES } from '../utils/job-status';

const STORAGE_KEY = 'jobbtracker.jobs';

function loadJobs(): Job[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Job[]) : [];
  } catch {
    return [];
  }
}

function normalize(value: string | undefined) {
  return (value ?? '').trim().toLowerCase();
}

function isDuplicateJob(existingJobs: Job[], newJob: Job) {
  return existingJobs.some((job) => {
    const sameAdId =
      newJob.adId && job.adId && normalize(String(job.adId)) === normalize(String(newJob.adId));

    const sameUrl = newJob.url && job.url && normalize(job.url) === normalize(newJob.url);

    const sameCompanyAndTitle =
      normalize(job.company) === normalize(newJob.company) &&
      normalize(job.title) === normalize(newJob.title);

    return sameAdId || sameUrl || sameCompanyAndTitle;
  });
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(() => loadJobs());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'alla'>('alla');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  function addJob(job: Job) {
    let wasAdded = false;

    setJobs((prev) => {
      if (isDuplicateJob(prev, job)) {
        return prev;
      }

      wasAdded = true;
      return [job, ...prev];
    });

    return wasAdded;
  }

  function updateJob(updatedJob: Job) {
    setJobs((prev) => prev.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  }

  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function changeStatus(id: string, status: JobStatus) {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, status } : job)));
  }

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return jobs
      .filter(
        (job) =>
          job.title.toLowerCase().includes(normalizedSearch) ||
          job.company.toLowerCase().includes(normalizedSearch) ||
          (job.city ?? '').toLowerCase().includes(normalizedSearch) ||
          (job.occupation ?? '').toLowerCase().includes(normalizedSearch)
      )
      .filter((job) => (statusFilter === 'alla' ? true : job.status === statusFilter));
  }, [jobs, search, statusFilter]);

  const stats = useMemo(() => {
    return Object.fromEntries(
      JOB_STATUSES.map((status) => [status, jobs.filter((job) => job.status === status).length])
    ) as Record<JobStatus, number>;
  }, [jobs]);

  const cityStats = useMemo(() => {
    const appliedJobs = jobs.filter((job) => job.status === 'sokt');

    const counts: Record<string, number> = {};

    for (const job of appliedJobs) {
      const city = job.city.trim();
      if (!city) continue;

      counts[city] = (counts[city] ?? 0) + 1;
    }

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [jobs]);

  const occupationStats = useMemo(() => {
    const counts = jobs.reduce<Record<string, number>>((acc, job) => {
      const key = job.occupation?.trim() || 'Okänt';
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'sv'));
  }, [jobs]);

  const jobsByStatus = useMemo(() => {
    return Object.fromEntries(
      JOB_STATUSES.map((status) => [status, filteredJobs.filter((job) => job.status === status)])
    ) as Record<JobStatus, Job[]>;
  }, [filteredJobs]);

  return {
    jobs,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredJobs,
    stats,
    cityStats,
    occupationStats,
    jobsByStatus,
    addJob,
    updateJob,
    deleteJob,
    changeStatus,
  };
}
