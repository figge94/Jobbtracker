import { HStack, Box, Text } from "@chakra-ui/react";
import { LuBriefcase, LuMapPin, LuClock3 } from "react-icons/lu";

type Props = {
  occupation?: string;
  city?: string;
  employmentType?: string;
};

function MetaItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <HStack
      gap="1.5"
      px="2"
      py="1"
      borderRadius="md"
      bg="bg.subtle"
      _dark={{ bg: "whiteAlpha.50" }}
      fontSize="xs"
      color="fg.muted"
      align="center">
      <Box opacity={0.7} display="flex" alignItems="center">
        {icon}
      </Box>

      <Text lineHeight="1.2">{children}</Text>
    </HStack>
  );
}

export function JobMeta({ occupation, city, employmentType }: Props) {
  if (!occupation && !city && !employmentType) return null;

  return (
    <HStack gap="2" wrap="wrap">
      {occupation && (
        <MetaItem icon={<LuBriefcase size={12} />}>{occupation}</MetaItem>
      )}

      {city && <MetaItem icon={<LuMapPin size={12} />}>{city}</MetaItem>}

      {employmentType && (
        <MetaItem icon={<LuClock3 size={12} />}>{employmentType}</MetaItem>
      )}
    </HStack>
  );
}
