import { HStack, IconButton } from "@chakra-ui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export function JobActions({ onEdit, onDelete }: Props) {
  return (
    <HStack justify="flex-end">
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Redigera jobb"
        onClick={onEdit}
        color="fg.muted"
        opacity={0.7}
        _hover={{ opacity: 1, bg: "bg.subtle" }}
      >
        <LuPencil />
      </IconButton>

      <IconButton
        size="sm"
        variant="ghost"
        colorPalette="red"
        aria-label="Ta bort jobb"
        onClick={onDelete}
        opacity={0.75}
        _hover={{
          opacity: 1,
          bg: "red.100",
          _dark: { bg: "red.900" },
        }}
      >
        <LuTrash2 />
      </IconButton>
    </HStack>
  );
}
