import { Box, Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function ExpandableSearch({ value, onChange }: Props) {
  const [active, setActive] = useState(false);
  const expanded = active || value.length > 0;

  return (
    <Box
      w={expanded ? "280px" : "42px"}
      h="42px"
      transition="width 0.22s ease"
      borderRadius="full"
      overflow="hidden"
      bg="bg.subtle"
      borderWidth="1px"
      borderColor="border.muted"
      display="flex"
      alignItems="center"
      justifyContent={expanded ? "flex-start" : "center"}
      _dark={{
        bg: "whiteAlpha.100",
        borderColor: "whiteAlpha.200",
      }}
      _hover={{
        borderColor: "border.emphasized",
      }}>
      <InputGroup startElement={<LuSearch size={16} />}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={expanded ? "Sök jobb..." : ""}
          h="42px"
          pl={expanded ? "10" : "0"}
          pr="4"
          border="none"
          outline="none"
          boxShadow="none"
          bg="transparent"
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
          onFocus={() => setActive(true)}
          onBlur={() => {
            if (!value) setActive(false);
          }}
          cursor={expanded ? "text" : "pointer"}
        />
      </InputGroup>
    </Box>
  );
}
