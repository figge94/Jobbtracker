import type { JobStatus } from './job';

export type UserSettings = {
  totalGoal: number;
  outsideCommuteGoal: number;
  otherOccupationGoal: number;
  defaultJobStatus: JobStatus;
};

export const defaultSettings: UserSettings = {
  totalGoal: 20,
  outsideCommuteGoal: 5,
  otherOccupationGoal: 3,
  defaultJobStatus: 'sokt',
};
