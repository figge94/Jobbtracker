import { useEffect, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { toaster } from './ui/toaster';

export function PwaUpdatePrompt() {
  const shownRef = useRef(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  useEffect(() => {
    if (!needRefresh || shownRef.current) return;

    shownRef.current = true;

    toaster.create({
      title: 'Ny version finns',
      description: 'En uppdatering av Jobbtracker är redo att installeras.',
      type: 'info',
      duration: 10000,
      closable: true,
      action: {
        label: 'Uppdatera',
        onClick: () => updateServiceWorker(true),
      },
      onStatusChange({ status }) {
        if (status === 'unmounted') {
          shownRef.current = false;
          setNeedRefresh(false);
        }
      },
    });
  }, [needRefresh, setNeedRefresh, updateServiceWorker]);

  return null;
}
