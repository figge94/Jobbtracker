import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { LuClock3 } from "react-icons/lu";
import { getDaysLeft } from "../../utils/job-deadline";

type Props = {
  deadline: string;
  compact?: boolean;
};

export function JobDeadline({ deadline, compact = false }: Props) {
  const daysLeft = getDaysLeft(deadline);

  const formattedDate = new Date(deadline).toLocaleDateString("sv-SE", {
    day: "numeric",
    month: compact ? "short" : "long",
    year: "numeric"
  });

  let label = `${daysLeft} dagar kvar`;
  let color: "red" | "orange" | "green" = "green";
  let accentBg = "green.50";
  let accentBorder = "green.200";

  if (daysLeft < 0) {
    label = "Utgången";
    color = "red";
    accentBg = "red.50";
    accentBorder = "red.200";
  } else if (daysLeft === 0) {
    label = "Sista dagen";
    color = "red";
    accentBg = "red.50";
    accentBorder = "red.200";
  } else if (daysLeft <= 7) {
    color = "orange";
    accentBg = "orange.50";
    accentBorder = "orange.200";
  }

  return (
    <Box
      px="3.5"
      py="3"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={accentBorder}
      bg={accentBg}
      boxShadow="sm"
      _dark={{
        borderColor: "whiteAlpha.200"
      }}>
      <HStack justify="space-between" align="start" gap="3">
        <HStack gap="2.5" align="center">
          <Box
            p="1.5"
            borderRadius="full"
            bg="blackAlpha.50"
            _dark={{ bg: "whiteAlpha.100" }}>
            <LuClock3 size={14} />
          </Box>

          <VStack align="start" gap="0">
            <Text fontSize="sm" fontWeight="semibold" lineHeight="1.2">
              {label}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {compact ? formattedDate : `Sista ansökan: ${formattedDate}`}
            </Text>
          </VStack>
        </HStack>

        <Badge
          colorPalette={color}
          variant="surface"
          borderRadius="full"
          px="2"
          py="0.5"
          fontSize="0.7rem"
          fontWeight="semibold"
          whiteSpace="nowrap">
          {daysLeft >= 0 ? `${daysLeft}d` : "Stängd"}
        </Badge>
      </HStack>
    </Box>
  );
}
