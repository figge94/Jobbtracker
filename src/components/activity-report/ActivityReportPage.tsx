import { useState } from 'react';
import { Badge, Box, Button, Card, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import type { Job } from '../../types/job';

type Props = {
  jobs: Job[];
  onBack: () => void;
};

export function ActivityReportPage({ jobs, onBack }: Props) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);

  const activityReportJobs = jobs
    .filter((job) => {
      if (!job.appliedAt) return false;

      const appliedAt = new Date(job.appliedAt);
      return appliedAt >= start && appliedAt < end;
    })
    .sort((a, b) => new Date(b.appliedAt!).getTime() - new Date(a.appliedAt!).getTime());

  const monthName = start.toLocaleDateString('sv-SE', {
    month: 'long',
    year: 'numeric',
  });

  async function copyValue(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);

      window.setTimeout(() => {
        setCopiedField(null);
      }, 3000);
    } catch (error) {
      console.error('Kunde inte kopiera värdet', error);
    }
  }

  return (
    <Stack gap={{ base: '5', md: '7' }}>
      <Button alignSelf="flex-start" variant="ghost" onClick={onBack}>
        ← Tillbaka
      </Button>

      <Card.Root
        variant="subtle"
        borderRadius="2xl"
        overflow="hidden"
        bg="teal.subtle"
        borderWidth="1px"
        borderColor="teal.muted"
      >
        <Card.Body py={{ base: '5', md: '6' }}>
          <Stack gap="3">
            <Badge
              alignSelf="flex-start"
              colorPalette="teal"
              variant="solid"
              borderRadius="full"
              px="3"
            >
              Rapporteringsunderlag
            </Badge>

            <Heading size={{ base: 'xl', md: '2xl' }}>Aktivitetsrapport</Heading>

            <Text color="fg.muted" maxW="2xl">
              Här hittar du uppgifterna för jobb du sökte under{' '}
              <Text as="span" fontWeight="semibold" color="fg">
                {monthName}
              </Text>
              .
            </Text>

            <Text fontSize="sm" color="fg.muted">
              Kopiera yrkesroll, arbetsgivare och ort direkt när du fyller i rapporten hos
              Arbetsförmedlingen.
            </Text>
          </Stack>
        </Card.Body>
      </Card.Root>

      {activityReportJobs.length === 0 ? (
        <Card.Root variant="outline" borderRadius="xl">
          <Card.Body py="10">
            <Stack align="center" textAlign="center" gap="2">
              <Heading size="md">Inga jobb hittades</Heading>

              <Text color="fg.muted">
                Det finns inga jobb med ansökningsdatum under {monthName}.
              </Text>
            </Stack>
          </Card.Body>
        </Card.Root>
      ) : (
        <Stack gap="4">
          {activityReportJobs.map((job, index) => (
            <Card.Root
              key={job.id}
              variant="outline"
              borderRadius="xl"
              overflow="hidden"
              borderColor="teal.muted"
              bg="bg.panel"
              shadow="sm"
            >
              <Card.Body py={{ base: '4', md: '5' }}>
                <Stack gap={{ base: '4', md: '5' }}>
                  <Flex justify="space-between" align="center" gap="3">
                    <Box minW="0">
                      <Text fontSize="xs" color="fg.muted">
                        Jobb {index + 1}
                      </Text>

                      <Heading size="sm" truncate>
                        {job.occupation || job.title}
                      </Heading>
                    </Box>

                    <Badge
                      colorPalette="orange"
                      variant="subtle"
                      borderRadius="full"
                      flexShrink="0"
                    >
                      {new Date(job.appliedAt!).toLocaleDateString('sv-SE')}
                    </Badge>
                  </Flex>

                  <Stack gap="0">
                    <CopyRow
                      label="Yrkesroll"
                      value={job.occupation || job.title}
                      copied={copiedField === `${job.id}-occupation`}
                      onCopy={() => copyValue(`${job.id}-occupation`, job.occupation || job.title)}
                    />

                    <CopyRow
                      label="Arbetsgivare"
                      value={job.company}
                      copied={copiedField === `${job.id}-company`}
                      onCopy={() => copyValue(`${job.id}-company`, job.company)}
                    />

                    <CopyRow
                      label="Ort"
                      value={job.city || 'Ej angivet'}
                      copied={copiedField === `${job.id}-city`}
                      onCopy={() => copyValue(`${job.id}-city`, job.city || 'Ej angivet')}
                    />
                  </Stack>

                  <Flex wrap="wrap" gapX="5" gapY="1" fontSize="xs" color="fg.muted">
                    <Text>{job.employmentType || 'Ej angivet'}</Text>
                    <Text>Annons: {job.url ? 'Ja' : 'Nej'}</Text>
                    <Text>Sökt: {new Date(job.appliedAt!).toLocaleDateString('sv-SE')}</Text>
                  </Flex>

                  {job.url && (
                    <Link
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      fontSize="sm"
                      fontWeight="semibold"
                      color="teal.fg"
                      alignSelf="flex-start"
                    >
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
  copied: boolean;
  onCopy: () => void;
};

function CopyRow({ label, value, copied, onCopy }: CopyRowProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap="3"
      py="2"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      <Box minW="0">
        <Text fontSize="xs" color="fg.muted">
          {label}
        </Text>

        <Text fontSize="sm" fontWeight="semibold" truncate>
          {value}
        </Text>
      </Box>

      <Button
        size="xs"
        variant={copied ? 'solid' : 'subtle'}
        colorPalette={copied ? 'green' : 'teal'}
        flexShrink="0"
        borderRadius="full"
        onClick={onCopy}
      >
        {copied ? 'Kopierat' : 'Kopiera'}
      </Button>
    </Flex>
  );
}
