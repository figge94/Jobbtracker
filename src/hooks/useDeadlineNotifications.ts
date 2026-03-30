import { useEffect } from 'react';
import type { Job } from '../types/job';
import { toaster } from '../components/ui/toaster';

function getDaysLeft(deadline: string) {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function useDeadlineNotifications(jobs: Job[]) {
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `jobbtracker.deadline-notices.${today}`;

    const shownToday = new Set<string>(JSON.parse(localStorage.getItem(storageKey) ?? '[]'));

    const jobsToNotify = jobs.filter((job) => {
      if (!job.deadline || job.status !== 'vill_soka') return false;

      const daysLeft = getDaysLeft(job.deadline);
      if (daysLeft < 0 || daysLeft > 3) return false;

      const uniqueKey = job.adId ?? job.id;
      return !shownToday.has(uniqueKey);
    });

    if (jobsToNotify.length === 0) return;

    const nextShown = new Set(shownToday);

    jobsToNotify.forEach((job) => {
      if (!job.deadline) return;

      const daysLeft = getDaysLeft(job.deadline);

      toaster.create({
        title: 'Deadline närmar sig',
        description:
          daysLeft === 0
            ? `${job.title} hos ${job.company} går ut idag.`
            : `${job.title} hos ${job.company} går ut om ${daysLeft} dagar.`,
        type: 'warning',
        closable: true,
      });

      nextShown.add(job.adId ?? job.id);
    });

    localStorage.setItem(storageKey, JSON.stringify([...nextShown]));
  }, [jobs]);
}
