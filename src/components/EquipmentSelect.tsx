// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { EquipmentCategory } from "basim";

import equipmentJson, { Equipment } from "@/data/equipments.json";

import Select from "./Select";
import { useMemo } from "react";
import { range } from "@/utils";

function findMaxTier(category: EquipmentCategory) {
  return Math.max(
    ...equipmentJson.filter((e) => e.category === category).map((e) => e.tier)
  );
}

function findEquipment(category: EquipmentCategory, tier: number) {
  return equipmentJson.find((e) => e.category === category && e.tier === tier);
}

interface EquipmentSelectProps {
  category: EquipmentCategory;
  id?: number;
  onChange?: (equipment: Equipment | undefined) => void;
}

export default function EquipmentSelect(props: EquipmentSelectProps) {
  const { category, id, onChange } = props;

  const maxTier = findMaxTier(category);
  const currentTier = equipmentJson.find((e) => e.id === id)?.tier || 0;

  const options = useMemo(() => range(maxTier + 1), [maxTier]);

  const handleChange = (tier: number) => {
    const found = findEquipment(category, tier);
    onChange?.(found);
  };

  return (
    <Select
      label={category}
      options={options}
      getOptionLabel={(tier) => `T${tier}`}
      value={currentTier}
      onChange={handleChange}
    />
  );
}
