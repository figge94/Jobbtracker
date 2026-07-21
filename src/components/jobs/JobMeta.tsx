import { HStack, Text, Wrap } from '@chakra-ui/react';
import { LuBriefcase, LuClock3, LuMapPin } from 'react-icons/lu';

type Props = {
  occupation?: string;
  city?: string;
  employmentType?: string;
};

type MetaItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

function MetaItem({ icon, children }: MetaItemProps) {
  return (
    <HStack gap="1.5" color="fg.muted" fontSize="sm" minW="0">
      <Text as="span" display="flex" alignItems="center" flexShrink="0" opacity={0.7}>
        {icon}
      </Text>

      <Text lineClamp={1}>{children}</Text>
    </HStack>
  );
}

export function JobMeta({ occupation, city, employmentType }: Props) {
  if (!occupation && !city && !employmentType) {
    return null;
  }

  return (
    <Wrap gapX="4" gapY="2">
      {occupation && <MetaItem icon={<LuBriefcase size={15} />}>{occupation}</MetaItem>}

      {city && <MetaItem icon={<LuMapPin size={15} />}>{city}</MetaItem>}

      {employmentType && <MetaItem icon={<LuClock3 size={15} />}>{employmentType}</MetaItem>}
    </Wrap>
  );
}
