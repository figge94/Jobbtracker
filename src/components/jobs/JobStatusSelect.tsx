import { Button, Menu, Portal } from "@chakra-ui/react";
import type { JobStatus } from "../../types/job";
import {
  JOB_STATUSES,
  getStatusColor,
  getStatusLabel,
} from "../../utils/job-status";

type Props = {
  value: JobStatus;
  onChange: (status: JobStatus) => void;
};

export function JobStatusSelect({ value, onChange }: Props) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          size="sm"
          bg={`${getStatusColor(value)}.100`}
          color={`${getStatusColor(value)}.700`}
          border="1px solid"
          borderColor={`${getStatusColor(value)}.200`}
          borderRadius="lg"
          justifyContent="space-between"
          minW="140px"
          _hover={{
            bg: `${getStatusColor(value)}.200`,
            _dark: {
              bg: `${getStatusColor(value)}.800`,
            },
          }}
          _dark={{
            bg: `${getStatusColor(value)}.900`,
            color: `${getStatusColor(value)}.200`,
            borderColor: `${getStatusColor(value)}.700`,
          }}
        >
          {getStatusLabel(value)}
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {JOB_STATUSES.map((status) => (
              <Menu.Item
                key={status}
                value={status}
                onClick={() => onChange(status)}
              >
                {getStatusLabel(status)}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
