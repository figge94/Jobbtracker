type DeadlineState = {
  label: string;
  colorPalette: 'red' | 'orange' | 'green';
  bg: string;
  borderColor: string;
  darkBg: string;
  darkBorderColor: string;
};

export function getDeadlineState(daysLeft: number): DeadlineState {
  if (daysLeft < 0) {
    return {
      label: 'Ansökningstiden har gått ut',
      colorPalette: 'red',
      bg: 'red.50',
      borderColor: 'red.200',
      darkBg: 'red.950',
      darkBorderColor: 'red.800',
    };
  }

  if (daysLeft === 0) {
    return {
      label: 'Sista ansökningsdagen',
      colorPalette: 'red',
      bg: 'red.50',
      borderColor: 'red.200',
      darkBg: 'red.950',
      darkBorderColor: 'red.800',
    };
  }

  if (daysLeft <= 7) {
    return {
      label: `${daysLeft} dagar kvar`,
      colorPalette: 'orange',
      bg: 'orange.50',
      borderColor: 'orange.200',
      darkBg: 'orange.950',
      darkBorderColor: 'orange.800',
    };
  }

  return {
    label: `${daysLeft} dagar kvar`,
    colorPalette: 'green',
    bg: 'green.50',
    borderColor: 'green.200',
    darkBg: 'green.950',
    darkBorderColor: 'green.800',
  };
}

export function formatDeadlineDate(deadline: string, compact: boolean): string {
  return new Date(deadline).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: compact ? 'short' : 'long',
    year: 'numeric',
  });
}
