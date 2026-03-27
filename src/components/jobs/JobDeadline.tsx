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
    year: "numeric",
  });

  let label = `${daysLeft} dagar kvar`;
  let colorPalette: "red" | "orange" | "green" = "green";
  let bg = "green.50";
  let borderColor = "green.200";
  let darkBg = "green.950";
  let darkBorderColor = "green.800";

  if (daysLeft < 0) {
    label = "Utgången";
    colorPalette = "red";
    bg = "red.50";
    borderColor = "red.200";
    darkBg = "red.950";
    darkBorderColor = "red.800";
  } else if (daysLeft === 0) {
    label = "Sista dagen";
    colorPalette = "red";
    bg = "red.50";
    borderColor = "red.200";
    darkBg = "red.950";
    darkBorderColor = "red.800";
  } else if (daysLeft <= 7) {
    colorPalette = "orange";
    bg = "orange.50";
    borderColor = "orange.200";
    darkBg = "orange.950";
    darkBorderColor = "orange.800";
  }

  return (
    <Box
      px="3"
      py="2"
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      bg={bg}
      opacity={0.95}
      _dark={{
        borderColor: darkBorderColor,
        bg: darkBg,
      }}>
      <HStack justify="space-between" align="center" gap="3">
        <HStack gap="2.5" minW={0}>
          <Box
            p="1.25"
            borderRadius="full"
            bg="blackAlpha.100"
            color="fg.muted"
            _dark={{ bg: "whiteAlpha.100" }}>
            <LuClock3 size={13} />
          </Box>

          <VStack align="start" gap="0" minW={0}>
            <Text fontSize="sm" fontWeight="semibold" lineHeight="1.2">
              {label}
            </Text>

            <Text fontSize="xs" color="fg.muted" lineHeight="1.2">
              {compact ? formattedDate : `Sista ansökan: ${formattedDate}`}
            </Text>
          </VStack>
        </HStack>

        <Badge
          colorPalette={colorPalette}
          variant="subtle"
          borderRadius="full"
          px="1.5"
          py="0.5"
          fontSize="0.7rem"
          fontWeight="medium"
          whiteSpace="nowrap"
          flexShrink={0}>
          {daysLeft >= 0 ? `${daysLeft}d` : "Stängd"}
        </Badge>
      </HStack>
    </Box>
  );
}
