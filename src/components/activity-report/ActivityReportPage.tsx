import { Button, Card, Heading, Link, Stack, Text } from '@chakra-ui/react';
import type { Job } from '../../types/job';

type Props = {
  jobs: Job[];
  onBack: () => void;
};

export function ActivityReportPage({ jobs, onBack }: Props) {
  const now = new Date();

  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);

  const activityReportJobs = jobs
    .filter((job) => {
      if (!job.appliedAt) {
        return false;
      }

      const appliedAt = new Date(job.appliedAt);

      return appliedAt >= start && appliedAt < end;
    })
    .sort((a, b) => new Date(b.appliedAt!).getTime() - new Date(a.appliedAt!).getTime());

  const monthName = start.toLocaleDateString('sv-SE', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Stack gap="6">
      <Button alignSelf="flex-start" variant="ghost" onClick={onBack}>
        ← Tillbaka
      </Button>

      <Stack gap="1">
        <Heading size="lg">Aktivitetsrapport</Heading>

        <Text color="fg.muted">Jobb du sökte under {monthName}.</Text>
      </Stack>

      {activityReportJobs.length === 0 ? (
        <Card.Root>
          <Card.Body>
            <Text>Inga sökta jobb hittades för {monthName}.</Text>
          </Card.Body>
        </Card.Root>
      ) : (
        <Stack gap="4">
          {activityReportJobs.map((job) => (
            <Card.Root key={job.id}>
              <Card.Body>
                <Stack gap="4">
                  <Heading size="sm">{job.occupation || job.title}</Heading>

                  <CopyRow label="Yrkesroll" value={job.occupation || job.title} />

                  <CopyRow label="Arbetsgivare" value={job.company} />

                  <CopyRow label="Ort" value={job.city || 'Ej angivet'} />

                  <InfoRow label="Omfattning" value={job.employmentType || 'Ej angivet'} />

                  <InfoRow label="Svarade du på en annons?" value={job.url ? 'Ja' : 'Nej'} />

                  <InfoRow
                    label="Datum då jobbet söktes"
                    value={new Date(job.appliedAt!).toLocaleDateString('sv-SE')}
                  />

                  {job.url && (
                    <Link href={job.url} target="_blank" rel="noreferrer">
                      Öppna annons
                    </Link>
                  )}
                </Stack>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

type CopyRowProps = {
  label: string;
  value: string;
};

function CopyRow({ label, value }: CopyRowProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error('Kunde inte kopiera värdet', error);
    }
  }

  return (
    <Stack direction="row" align="center" justify="space-between" gap="4">
      <Stack gap="0" minW="0">
        <Text fontSize="xs" color="fg.muted">
          {label}
        </Text>

        <Text fontWeight="medium" wordBreak="break-word">
          {value}
        </Text>
      </Stack>

      <Button size="xs" variant="outline" flexShrink="0" onClick={handleCopy}>
        Kopiera
      </Button>
    </Stack>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Stack gap="0">
      <Text fontSize="xs" color="fg.muted">
        {label}
      </Text>

      <Text fontWeight="medium" wordBreak="break-word">
        {value}
      </Text>
    </Stack>
  );
}
