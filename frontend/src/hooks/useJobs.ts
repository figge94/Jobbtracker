import { useEffect, useMemo, useState } from "react";
import type { Job, JobStatus } from "../types/job";
import { JOB_STATUSES } from "../utils/job-status";

const STORAGE_KEY = "jobbtracker.jobs";
const API_URL = "http://localhost:3001/jobs";

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

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "alla">("alla");
  const [useBackend, setUseBackend] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Kunde inte hämta jobb från backend");
        }

        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
        setUseBackend(true);
      } catch {
        const localJobs = loadJobs();
        setJobs(localJobs);
        setUseBackend(false);
      }
    }

    fetchJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  async function addJob(job: Job) {
    if (useBackend) {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(job)
        });

        if (!res.ok) {
          throw new Error("Kunde inte spara jobb");
        }

        const newJob = await res.json();
        setJobs((prev) => [newJob, ...prev]);
        return;
      } catch (error) {
        console.error(error);
      }
    }

    setJobs((prev) => [job, ...prev]);
  }

  async function deleteJob(id: string) {
    if (useBackend) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE"
        });

        if (!res.ok && res.status !== 204) {
          throw new Error("Kunde inte ta bort jobb");
        }
      } catch (error) {
        console.error(error);
      }
    }

    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  async function updateJob(updatedJob: Job) {
    if (useBackend) {
      try {
        const res = await fetch(`${API_URL}/${updatedJob.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedJob)
        });

        if (!res.ok) {
          throw new Error("Kunde inte uppdatera jobb");
        }

        const savedJob = await res.json();
        setJobs((prev) =>
          prev.map((job) => (job.id === savedJob.id ? savedJob : job))
        );
        return;
      } catch (error) {
        console.error(error);
      }
    }

    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  }

  async function changeStatus(id: string, status: JobStatus) {
    const existingJob = jobs.find((job) => job.id === id);
    if (!existingJob) return;

    const updatedJob = { ...existingJob, status };
    await updateJob(updatedJob);
  }

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      )
      .filter((job) =>
        statusFilter === "alla" ? true : job.status === statusFilter
      );
  }, [jobs, search, statusFilter]);

  const stats = useMemo(() => {
    return Object.fromEntries(
      JOB_STATUSES.map((status) => [
        status,
        jobs.filter((job) => job.status === status).length
      ])
    ) as Record<JobStatus, number>;
  }, [jobs]);

  const jobsByStatus = useMemo(() => {
    return Object.fromEntries(
      JOB_STATUSES.map((status) => [
        status,
        filteredJobs.filter((job) => job.status === status)
      ])
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
    jobsByStatus,
    addJob,
    deleteJob,
    changeStatus,
    updateJob
  };
}
