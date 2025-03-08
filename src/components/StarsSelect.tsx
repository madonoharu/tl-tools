import Select from "./Select";

export interface StarsSelectProps {
  stars: number;
  weaponStars: number;
  onChange?: (stars: number, weaponStars: number) => void;
}

const OPTIONS: [number, number][] = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [5, 1],
  [5, 2],
  [5, 3],
];

function getOptionLabel([stars, weaponStars]: [number, number]) {
  if (weaponStars === 0) {
    return `★${stars}`;
  } else {
    return `固有${weaponStars}`;
  }
}

export default function StarsSelect(props: StarsSelectProps) {
  const { stars, weaponStars, onChange } = props;

  return (
    <Select
      options={OPTIONS}
      value={[stars, weaponStars]}
      equalFn={(v, o) => v[0] === o[0] && v[1] === o[1]}
      getOptionLabel={getOptionLabel}
      onChange={(o) => onChange?.(o[0], o[1])}
    />
  );
}
