import { useEffect, useState } from 'react';
import { defaultSettings, type UserSettings } from '../types/settings';

const STORAGE_KEY = 'jobtracker-settings';

function loadSettings(): UserSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultSettings;
    }

    return {
      ...defaultSettings,
      ...JSON.parse(saved),
    };
  } catch {
    return defaultSettings;
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function updateSettings(values: Partial<UserSettings>) {
    setSettings((current) => ({
      ...current,
      ...values,
    }));
  }

  function resetSettings() {
    setSettings(defaultSettings);
  }

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
