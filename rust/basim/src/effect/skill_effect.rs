use serde::{Deserialize, Serialize};
use tsify::Tsify;

use crate::types::StatType;

#[derive(Debug, Clone, Serialize, Deserialize, Tsify)]
#[serde(tag = "tag")]

pub enum SkillEffect {
    Damage(SkillEffectDamage),
    Buff(SkillEffectBuff),
    Regen(SkillEffectRegen),
    Heal(SkillEffectHeal),
    Summon(SkillEffectSummon),
    Knockback(SkillEffectKnockback),
    CrowdControl(SkillEffectCrowdControl),
    Shield(SkillEffectShield),
    Special(SkillEffectSpecial),
    DamageDebuff(SkillEffectDamageDebuff),
    ConcentratedTarget(SkillEffectConcentratedTarget),
    Dispel(SkillEffectDispel),
    Accumulation(SkillEffectAccumulation),
    CostChange(SkillEffectCostChange),
}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectDamage {
    hits: Vec<i32>,
    scale: Vec<i32>,
    block: u8,
    #[serde(default)]
    critical: u8,
}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectBuff {
    pub stat: StatType,
    pub value: Vec<Vec<i32>>,
    pub channel: i32,
}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectRegen {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectHeal {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectSummon {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectKnockback {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectCrowdControl {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectShield {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectSpecial {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectDamageDebuff {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectConcentratedTarget {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectDispel {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectAccumulation {}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct SkillEffectCostChange {}
