import {
  Box,
  Button,
  Drawer,
  Field,
  Heading,
  Input,
  NativeSelect,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { JOB_STATUSES, getStatusLabel } from '../../utils/job-status';
import { ColorModeButton } from '../ui/color-mode';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SettingsDrawer({ open, onClose }: Props) {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose();
        }
      }}
      size={{ base: 'full', sm: 'sm' }}
    >
      <Drawer.Backdrop />

      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header borderBottomWidth="1px" borderColor="border.subtle">
            <Drawer.Title>Inställningar</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body py="6">
            <Stack gap="7">
              <SettingsSection title="Utseende" description="Anpassa hur appen visas.">
                <SettingsRow label="Tema" description="Växla mellan ljust och mörkt läge.">
                  <ColorModeButton flexShrink="0" />
                </SettingsRow>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Mål" description="Ställ in vad du vill uppnå varje månad.">
                <Stack gap="5">
                  <GoalSettingField
                    label="Totalt sökta jobb"
                    description="Hur många jobb du vill söka varje månad."
                    value={settings.totalGoal}
                    onChange={(value) => {
                      updateSettings({
                        totalGoal: value,
                      });
                    }}
                  />

                  <GoalSettingField
                    label="Utanför dagpendlingsavstånd"
                    description="Hur många jobb utanför dagpendlingsavstånd du vill söka."
                    value={settings.outsideCommuteGoal}
                    onChange={(value) => {
                      updateSettings({
                        outsideCommuteGoal: value,
                      });
                    }}
                  />

                  <GoalSettingField
                    label="Andra yrken än nuvarande"
                    description="Hur många jobb inom andra yrken du vill söka."
                    value={settings.otherOccupationGoal}
                    onChange={(value) => {
                      updateSettings({
                        otherOccupationGoal: value,
                      });
                    }}
                  />
                </Stack>
              </SettingsSection>

              <Separator />

              <SettingsSection
                title="Nya jobb"
                description="Bestäm vilka värden som ska vara förvalda."
              >
                <Field.Root>
                  <Field.Label>Standardstatus</Field.Label>

                  <Field.HelperText>
                    Status som väljs när du lägger till ett nytt jobb.
                  </Field.HelperText>

                  <NativeSelect.Root maxW="64">
                    <NativeSelect.Field
                      value={settings.defaultJobStatus}
                      onChange={(event) => {
                        updateSettings({
                          defaultJobStatus: event.target.value as typeof settings.defaultJobStatus,
                        });
                      }}
                    >
                      {JOB_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {getStatusLabel(status)}
                        </option>
                      ))}
                    </NativeSelect.Field>

                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
              </SettingsSection>

              <Separator />

              <SettingsSection
                title="Data"
                description="Hantera information som sparats lokalt i appen."
              >
                <Stack align="flex-start">
                  <Button variant="outline" disabled>
                    Exportera data
                  </Button>

                  <Text fontSize="xs" color="fg.muted">
                    Exportfunktion kan läggas till senare.
                  </Text>
                </Stack>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Återställ">
                <Button
                  variant="ghost"
                  colorPalette="red"
                  alignSelf="flex-start"
                  onClick={resetSettings}
                >
                  Återställ inställningar
                </Button>
              </SettingsSection>

              <Separator />

              <SettingsSection title="Om appen">
                <Text fontSize="sm" color="fg.muted">
                  Jobbtracker hjälper dig hålla koll på jobb du vill söka, har sökt och gått vidare
                  med.
                </Text>

                <Text fontSize="xs" color="fg.muted">
                  Version 1.0.0
                </Text>
              </SettingsSection>
            </Stack>
          </Drawer.Body>

          <Drawer.CloseTrigger />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

type SettingsSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <Stack gap="4">
      <Box>
        <Heading size="sm">{title}</Heading>

        {description && (
          <Text fontSize="sm" color="fg.muted" mt="1">
            {description}
          </Text>
        )}
      </Box>

      {children}
    </Stack>
  );
}

type SettingsRowProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap="4">
      <Box minW="0">
        <Text fontWeight="medium">{label}</Text>

        {description && (
          <Text fontSize="sm" color="fg.muted">
            {description}
          </Text>
        )}
      </Box>

      <Box flexShrink="0">{children}</Box>
    </Box>
  );
}

type GoalSettingFieldProps = {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
};

function GoalSettingField({ label, description, value, onChange }: GoalSettingFieldProps) {
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>

      <Field.HelperText>{description}</Field.HelperText>

      <Input
        type="number"
        min="0"
        max="999"
        value={value}
        onChange={(event) => {
          const nextValue = Number(event.target.value);

          if (Number.isFinite(nextValue) && nextValue >= 0) {
            onChange(nextValue);
          }
        }}
        maxW="32"
      />
    </Field.Root>
  );
}
