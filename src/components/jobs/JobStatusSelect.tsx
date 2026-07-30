import { Button, Menu, Portal } from '@chakra-ui/react';
import { Check, ChevronDown } from 'lucide-react';
import type { JobStatus } from '../../types/job';
import { JOB_STATUSES, getStatusColor, getStatusLabel } from '../../utils/job-status';

type Props = {
  value: JobStatus;
  onChange: (status: JobStatus) => void;
};

export function JobStatusSelect({ value, onChange }: Props) {
  const color = getStatusColor(value);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          size="sm"
          bg={`${color}.100`}
          color={`${color}.700`}
          borderWidth="1px"
          borderColor={`${color}.200`}
          borderRadius="lg"
          minW="140px"
          justifyContent="space-between"
          _hover={{
            bg: `${color}.200`,
          }}
          _dark={{
            bg: `${color}.900`,
            color: `${color}.200`,
            borderColor: `${color}.700`,
            _hover: {
              bg: `${color}.800`,
            },
          }}
        >
          {getStatusLabel(value)}
          <ChevronDown size={15} aria-hidden="true" />
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="170px" borderRadius="xl">
            {JOB_STATUSES.map((status) => {
              const isSelected = status === value;

              return (
                <Menu.Item
                  key={status}
                  value={status}
                  onClick={() => onChange(status)}
                  justifyContent="space-between"
                  fontWeight={isSelected ? 'semibold' : 'normal'}
                >
                  {getStatusLabel(status)}

                  {isSelected && <Check size={16} aria-hidden="true" />}
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
