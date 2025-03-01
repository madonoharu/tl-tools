export type EquipmentCategory =
  | "Hat"
  | "Gloves"
  | "Shoes"
  | "Bag"
  | "Badge"
  | "Hairpin"
  | "Charm"
  | "Watch"
  | "Necklace";

export type EquipmentStatType =
  | "AttackPower_Coefficient"
  | "CriticalDamageRate_Base"
  | "CriticalPoint_Base"
  | "AccuracyPoint_Base"
  | "MaxHP_Coefficient"
  | "MaxHP_Base"
  | "DefensePower_Base"
  | "HealEffectivenessRate_Base"
  | "DodgePoint_Base"
  | "OppressionResist_Coefficient"
  | "CriticalChanceResistPoint_Base"
  | "CriticalDamageResistRate_Base"
  | "HealPower_Coefficient"
  | "OppressionPower_Coefficient";

export interface EquipmentStat {
  type: EquipmentStatType;
  min: number;
  max: number;
}

export interface Equipment {
  id: number;
  category: EquipmentCategory;
  tier: number;
  icon: string;
  name: string;
  stats: EquipmentStat[];
}

const equipmentJson: Equipment[];
export = equipmentJson;
