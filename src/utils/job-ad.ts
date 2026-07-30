type AdSource = 'jobsearch' | 'historical';

export type FetchAdResult = {
  data: unknown;
  source: AdSource;
};

export type JobAdData = {
  title: string;
  company: string;
  city: string;
  deadline: string;
  employmentType: string;
  occupation: string;
  source: AdSource;
};

type JobTechAd = {
  headline?: string;
  employer?: {
    name?: string;
  };
  workplace_address?: {
    municipality?: string;
    city?: string;
    region?: string;
  };
  application_details?: {
    location?: string;
  };
  occupation?: {
    label?: string;
  };
  occupation_group?: {
    label?: string;
  };
  profession?: {
    label?: string;
  };
  last_publication_date?: string;
  application_deadline?: string;
  working_hours_type?: {
    label?: string;
  };
};

export function getAdIdFromUrl(url: string): string | null {
  const match = url.match(/annonser\/(\d+)/);
  return match?.[1] ?? null;
}

export async function fetchAdById(adId: string): Promise<FetchAdResult> {
  const sources: Array<{
    source: AdSource;
    url: string;
  }> = [
    {
      source: 'jobsearch',
      url: `https://jobsearch.api.jobtechdev.se/ad/${adId}`,
    },
    {
      source: 'historical',
      url: `https://historical.api.jobtechdev.se/ad/${adId}`,
    },
  ];

  for (const { source, url } of sources) {
    const response = await fetch(url);

    if (response.ok) {
      return {
        data: await response.json(),
        source,
      };
    }

    if (response.status !== 404) {
      throw new Error(`API-fel ${response.status}`);
    }
  }

  throw new Error('Annonsen hittades inte i aktuellt eller historiskt API');
}

export function mapAdData(data: unknown, source: AdSource): JobAdData {
  const ad = data as JobTechAd;

  return {
    title: ad.headline ?? '',
    company: ad.employer?.name ?? '',
    city:
      ad.workplace_address?.municipality ??
      ad.workplace_address?.city ??
      ad.workplace_address?.region ??
      ad.application_details?.location ??
      '',
    deadline: (ad.last_publication_date ?? ad.application_deadline ?? '').slice(0, 10),
    employmentType: ad.working_hours_type?.label ?? '',
    occupation: ad.occupation?.label ?? ad.occupation_group?.label ?? ad.profession?.label ?? '',
    source,
  };
}
