import { SegmentGroup, VisuallyHidden } from '@chakra-ui/react';
import { Grid2x2, List } from 'lucide-react';

type ViewMode = 'list' | 'board';

type Props = {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export function JobViewToggle({ viewMode, onChange }: Props) {
  return (
    <SegmentGroup.Root
      value={viewMode}
      onValueChange={(event) => {
        if (event.value) {
          onChange(event.value as ViewMode);
        }
      }}
      size="md"
      aria-label="Välj visningsläge"
    >
      <SegmentGroup.Indicator />

      <SegmentGroup.Items
        items={[
          {
            value: 'list',
            label: (
              <>
                <List size={18} aria-hidden="true" />
                <VisuallyHidden>Listvy</VisuallyHidden>
              </>
            ),
          },
          {
            value: 'board',
            label: (
              <>
                <Grid2x2 size={18} aria-hidden="true" />
                <VisuallyHidden>Boardvy</VisuallyHidden>
              </>
            ),
          },
        ]}
      />
    </SegmentGroup.Root>
  );
}
