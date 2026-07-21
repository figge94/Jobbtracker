import { useState } from 'react';
import { toaster } from '../components/ui/toaster';
import { fetchAdById, getAdIdFromUrl, mapAdData, type JobAdData } from '../utils/job-ad';

export function useJobAdFetch() {
  const [isFetching, setIsFetching] = useState(false);
  const [adSource, setAdSource] = useState<JobAdData['source'] | null>(null);

  async function fetchAd(url: string): Promise<JobAdData | null> {
    if (!url.trim() || isFetching) {
      return null;
    }

    const adId = getAdIdFromUrl(url);

    if (!adId) {
      toaster.create({
        title: 'Ogiltig länk',
        description: 'Kunde inte hitta annons-id i länken.',
        type: 'error',
        closable: true,
      });

      return null;
    }

    setIsFetching(true);

    try {
      const result = await fetchAdById(adId);
      const ad = mapAdData(result.data, result.source);

      setAdSource(result.source);

      toaster.create({
        title: 'Annons hämtad',
        description:
          result.source === 'historical'
            ? 'Information hämtades från historiskt arkiv.'
            : 'Informationen fylldes i automatiskt.',
        type: 'success',
        closable: true,
      });

      return ad;
    } catch (error) {
      console.error(error);
      setAdSource(null);

      toaster.create({
        title: 'Kunde inte hämta annonsen',
        description: error instanceof Error ? error.message : 'Ett oväntat fel inträffade.',
        type: 'error',
        closable: true,
      });

      return null;
    } finally {
      setIsFetching(false);
    }
  }

  function resetAdFetch() {
    setAdSource(null);
    setIsFetching(false);
  }

  return {
    fetchAd,
    isFetching,
    adSource,
    resetAdFetch,
  };
}
