use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Debug, Default, Clone, Copy, Deserialize, Tsify)]
pub enum AdaptationType {
    #[default]
    Street,
    Outdoor,
    Indoor,
}

#[derive(Debug, Default, Clone, Copy, Deserialize, Tsify)]
pub enum StatLevelUpType {
    #[default]
    Standard,
    LateBloom,
    Premature,
}

impl StatLevelUpType {
    pub fn is_standard(self) -> bool {
        matches!(self, Self::Standard)
    }
}

#[allow(non_camel_case_types)]
#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
pub enum StatType {
    #[default]
    Unknown,
    AccuracyPoint_Base,
    AccuracyPoint_Coefficient,
    AmmoCount_Base,
    AttackPower_Base,
    AttackPower_Coefficient,
    AttackSpeed_Base,
    AttackSpeed_Coefficient,
    BlockRate_Base,
    ChillDamagedIncrease_Coefficient,
    CriticalChanceResistPoint_Base,
    CriticalChanceResistPoint_Coefficient,
    CriticalDamageRate_Base,
    CriticalDamageRate_Coefficient,
    CriticalDamageResistRate_Base,
    CriticalDamageResistRate_Coefficient,
    CriticalPoint_Base,
    CriticalPoint_BaseOuter,
    CriticalPoint_Coefficient,
    DamageRatio2_Coefficient,
    DamagedRatio2_Coefficient,
    DefensePenetration_Base,
    DefensePower_Base,
    DefensePower_Coefficient,
    DodgePoint_Base,
    DodgePoint_Coefficient,
    EnhanceExDamageRate_Base,
    EnhanceExplosionRate_Base,
    EnhanceMysticRate_Base,
    EnhancePierceRate_Base,
    EnhanceSonicRate_Base,
    ExtendBuffDuration_Base,
    ExtendDebuffDuration_Base,
    ExtendDebuffDuration_Coefficient,
    HealEffectivenessRate_Base,
    HealEffectivenessRate_Coefficient,
    HealPower_Base,
    HealPower_Coefficient,
    IgnoreDelayCount_Base,
    MaxHP_Base,
    MaxHP_Coefficient,
    MoveSpeed_Coefficient,
    OppressionPower_Base,
    OppressionPower_Coefficient,
    OppressionResist_Coefficient,
    Range_Base,
    Range_Coefficient,
    RegenCost_Base,
    RegenCost_Coefficient,
    StabilityPoint_Base,
}
