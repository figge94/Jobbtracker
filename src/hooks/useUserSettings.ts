import { useEffect, useState } from 'react';

const STORAGE_KEY = 'jobbtracker.user-settings';

type UserSettings = {
  isRegisteredWithArbetsformedlingen: boolean;
};

const defaultSettings: UserSettings = {
  isRegisteredWithArbetsformedlingen: false,
};

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultSettings;
    }

    try {
      return JSON.parse(stored) as UserSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function setRegisteredWithArbetsformedlingen(value: boolean) {
    setSettings((current) => ({
      ...current,
      isRegisteredWithArbetsformedlingen: value,
    }));
  }

  return {
    settings,
    setRegisteredWithArbetsformedlingen,
  };
}
