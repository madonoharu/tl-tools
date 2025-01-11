type SkillEffectTarget =
  | "Self"
  | "Enemy"
  | "Ally"
  | "Any"
  | "AllyMain"
  | "AllySupport";

export interface SkillEffectDamage {
  Type: "Damage";
  Hits: number[];
  Scale: number[];
  Block: number;
  CriticalCheck?: "Check" | "Always";
  DescParamId?: number;
  Condition?: Condition;
  SubstituteCondition?: string;
  SubstituteScale?: number[];
  MultiplySource?: string;
  MultiplierConstant?: number[];
  Group?: number;
  IgnoreDef?: number[];
  ZoneHitInterval?: number;
  ZoneDuration?: number;
  Critical?: number;
  HideFormChangeIcon?: boolean;
  Frames?: AttackFrames;
  Reposition?: string[];
  SourceStat?: string;
  HpRateDamageModifier?: HpRateDamageModifier;
  HitFrames?: number[];
}

export interface Condition {
  Type: string;
  Parameter: string;
  Operand?: string;
  Value: unknown;
}

export interface AttackFrames {
  AttackEnterDuration: number;
  AttackStartDuration: number;
  AttackEndDuration: number;
  AttackBurstRoundOverDelay: number;
  AttackIngDuration: number;
  AttackReloadDuration: number;
}

export interface HpRateDamageModifier {
  MinHpRate: number;
  MaxHpRate: number;
  MultiplierMin: number;
  MultiplierMax: number;
}

export interface SkillEffectBuff {
  Type: "Buff";
  Target: SkillEffectTarget[];
  Stat: BuffStat;
  Channel: number;
  Value: number[][];
  Duration?: number;
  ApplyFrame?: number;
  Reposition?: string[];
  StackSame?: number;
  Icon?: string;
  Restrictions?: Restriction[];
  StackLabel?: StackLabel[];
  OverrideSlot?: "Passive";
}

export type BuffStat =
  | "AccuracyPoint_Base"
  | "AccuracyPoint_Coefficient"
  | "AmmoCount_Base"
  | "AttackPower_Base"
  | "AttackPower_Coefficient"
  | "AttackSpeed_Base"
  | "AttackSpeed_Coefficient"
  | "BlockRate_Base"
  | "ChillDamagedIncrease_Coefficient"
  | "CriticalChanceResistPoint_Coefficient"
  | "CriticalDamageRate_Base"
  | "CriticalDamageRate_Coefficient"
  | "CriticalDamageResistRate_Base"
  | "CriticalDamageResistRate_Coefficient"
  | "CriticalPoint_BaseOuter"
  | "CriticalPoint_Coefficient"
  | "DamageRatio2_Coefficient"
  | "DamagedRatio2_Coefficient"
  | "DefensePenetration_Base"
  | "DefensePower_Base"
  | "DefensePower_Coefficient"
  | "DodgePoint_Base"
  | "DodgePoint_Coefficient"
  | "EnhanceExDamageRate_Base"
  | "EnhanceExplosionRate_Base"
  | "EnhanceMysticRate_Base"
  | "EnhancePierceRate_Base"
  | "EnhanceSonicRate_Base"
  | "ExtendBuffDuration_Base"
  | "ExtendDebuffDuration_Base"
  | "ExtendDebuffDuration_Coefficient"
  | "HealEffectivenessRate_Base"
  | "HealEffectivenessRate_Coefficient"
  | "HealPower_Base"
  | "HealPower_Coefficient"
  | "IgnoreDelayCount_Base"
  | "MaxHP_Base"
  | "MaxHP_Coefficient"
  | "MoveSpeed_Coefficient"
  | "OppressionPower_Base"
  | "OppressionPower_Coefficient"
  | "OppressionResist_Coefficient"
  | "Range_Base"
  | "Range_Coefficient"
  | "RegenCost_Base"
  | "RegenCost_Coefficient"
  | "StabilityPoint_Base";

export interface Restriction {
  Property: string;
  Operand: string;
  Value: unknown;
}

export interface StackLabel {
  Icon: string;
  Label: string;
}

export interface SkillEffectRegen {
  Type: "Regen";
  Target: SkillEffectTarget;
  Duration: number;
  Period: number;
  ExtraStatSource?: string;
  ApplyFrame?: number;
  Scale: number[];
  ExtraStatRate?: number[];
  Group?: number;
}

export interface SkillEffectHeal {
  Type: "Heal";
  Target: SkillEffectTarget;
  ApplyFrame?: number;
  Scale: number[];
  Condition?: Condition;
  Reposition?: string[];
  HitFrames?: number[];
}

export interface SkillEffectSummon {
  Type: "Summon";
  SummonId: number;
  Value: number[][];
  Stat: string;
  CasterStat: string;
  Channel: number;
  Duration?: number;
}

export interface SkillEffectKnockback {
  Type: "Knockback";
  Scale: number[];
}

export interface SkillEffectCrowdControl {
  Type: "CrowdControl";
  Chance: number;
  Icon: string;
  ApplyFrame?: number;
  Scale: number[];
  Group?: number;
  Condition?: Condition;
}

export interface SkillEffectShield {
  Type: "Shield";
  Target: SkillEffectTarget;
  Scale: number[];
  Reposition?: string[];
  ApplyFrame?: number;
}

export interface SkillEffectSpecial {
  Type: "Special";
  Target: SkillEffectTarget[];
  Value: (
    | number[]
    | { ApplyCount: number; DamageRate: number; Interval: number }[]
  )[];
  Key: string;
  Channel: number;
  ApplyFrame?: number;
}

export interface SkillEffectDamageDebuff {
  Type: "DamageDebuff";
  Duration: number;
  Period?: number;
  Icon: string;
  ApplyFrame?: number;
  Scale: number[];
  Reposition?: string[];
}

export interface SkillEffectConcentratedTarget {
  Type: "ConcentratedTarget";
  ApplyFrame: number;
  Scale: number[];
}

export interface SkillEffectDispel {
  Type: "Dispel";
  Target: SkillEffectTarget;
}

export interface SkillEffectAccumulation {
  Type: "Accumulation";
  Scale: number[];
}

export interface SkillEffectCostChange {
  Type: "CostChange";
  Target: SkillEffectTarget;
  ValueType: "Coefficient" | "BaseAmount";
  Uses: number;
  ApplyFrame?: number;
  Scale: number[];
}

export type SkillEffect =
  | SkillEffectDamage
  | SkillEffectBuff
  | SkillEffectRegen
  | SkillEffectHeal
  | SkillEffectSummon
  | SkillEffectKnockback
  | SkillEffectCrowdControl
  | SkillEffectShield
  | SkillEffectSpecial
  | SkillEffectDamageDebuff
  | SkillEffectConcentratedTarget
  | SkillEffectDispel
  | SkillEffectAccumulation
  | SkillEffectCostChange;

export interface Skill {
  Effects: SkillEffect[];
}

export interface Student {
  Id: number;
  Name: string;
  SquadType: "Main" | "Support";
  School: string;
  AttackPower1: number;
  AttackPower100: number;
  Skills: {
    Normal: Skill;
    Ex: Skill;
    Public: Skill;
    GearPublic?: Skill;
    Passive: Skill;
    WeaponPassive?: Skill;
  };
  FavorStatValue: [number, number][];
}

const students: Record<number, Student>;
export = students;
