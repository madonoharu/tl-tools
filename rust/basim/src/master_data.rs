use serde::{Deserialize, Serialize};
use tsify::Tsify;

use crate::{
    effect::SkillEffect,
    types::{AdaptationType, StatLevelUpType, StatType},
};

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
#[tsify(from_wasm_abi)]
pub struct MasterData {
    pub students: Vec<MasterStudent>,
    pub equipments: Vec<MasterEquipment>,
}

impl MasterData {
    pub fn find_student(&self, id: u16) -> Option<&MasterStudent> {
        self.students.iter().find(|s| s.id == id)
    }

    pub fn find_equipment(&self, id: u16) -> Option<&MasterEquipment> {
        self.equipments.iter().find(|s| s.id == id)
    }

    pub fn get_max_tier_equipment(&self, category: EquipmentCategory) -> Option<&MasterEquipment> {
        self.equipments
            .iter()
            .filter(|e| e.category == category)
            .max_by_key(|e| e.tier)
    }
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
pub struct MasterStudent {
    pub id: u16,
    pub name: String,
    pub squad_type: String,
    pub school: String,
    pub equipment: [EquipmentCategory; 3],
    pub attack_power: (u16, u16),
    pub max_hp: (u16, u16),
    pub defense_power: (u16, u16),
    pub healing_power: (u16, u16),
    #[serde(default)]
    pub defense_penetration: (u16, u16),
    pub evasion: u16,
    pub accuracy: u16,
    pub critical_chance_point: u16,
    pub critical_damage_rate: u16,
    pub ammo_count: u16,
    pub ammo_cost: u16,
    pub range: u16,
    pub cost_recovery: u16,
    pub weapon: MasterWeapon,
    pub gear: Option<MasterGear>,
    pub auto_attack: Option<Vec<SkillEffect>>,
    pub skills: Vec<Skill>,
}

#[derive(Debug, Default, Clone, Serialize, Deserialize, Tsify)]
pub struct Skill {
    pub skill_type: SkillType,
    pub name: String,
    pub desc: String,
    pub effects: Vec<SkillEffect>,
}

#[derive(Debug, Default, Clone, Copy, Serialize, Deserialize, Tsify)]
pub enum SkillType {
    #[default]
    Unknown,
    Ex,
    Public,
    GearPublic,
    Passive,
    WeaponPassive,
    ExtraPassive,
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
pub struct MasterWeapon {
    pub name: String,
    pub adaptation_type: AdaptationType,
    pub adaptation_value: u8,
    pub attack_power: (u16, u16),
    pub max_hp: (u16, u16),
    pub healing_power: (u16, u16),
    pub stat_level_up_type: StatLevelUpType,
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
pub struct MasterGear {
    pub name: String,
    pub stats: Vec<MasterGearStat>,
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
pub struct MasterGearStat {
    pub stat_type: StatType,
    pub value: u16,
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
pub struct MasterEquipment {
    pub id: u16,
    pub category: EquipmentCategory,
    pub tier: u8,
    pub icon: String,
    pub name: String,
    pub stats: Vec<MasterEquipmentStat>,
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
pub struct MasterEquipmentStat {
    pub stat_type: StatType,
    pub min: u16,
    pub max: u16,
}

#[derive(Debug, Default, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Tsify)]
#[tsify(into_wasm_abi)]
pub enum EquipmentCategory {
    #[default]
    Unknown,
    Hat,
    Gloves,
    Shoes,
    Bag,
    Badge,
    Hairpin,
    Charm,
    Watch,
    Necklace,
}
