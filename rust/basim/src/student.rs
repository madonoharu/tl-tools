use serde::Deserialize;
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use crate::{
    effect::SkillEffectBuff,
    master_data::{
        EquipmentCategory, MasterEquipment, MasterEquipmentStat, MasterStudent, MasterWeapon,
    },
    types::StatType,
};

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct Student {
    state: StudentState,
    pub(crate) master: MasterStudent,
    equipments: [Option<MasterEquipment>; 3],
    base_stats: StudentBaseStats,
    buffs: Vec<SkillEffectBuff>,
}

#[wasm_bindgen]
impl Student {
    pub(crate) fn new(
        state: StudentState,
        master: MasterStudent,
        equipments: [Option<MasterEquipment>; 3],
        buffs: Vec<SkillEffectBuff>,
    ) -> Self {
        let base_stats = StudentBaseStats::new(&state, &master);

        Self {
            state,
            master,
            equipments,
            base_stats,
            buffs,
        }
    }

    pub fn id(&self) -> u16 {
        self.master.id
    }

    pub fn name(&self) -> String {
        self.master.name.clone()
    }

    pub fn level(&self) -> u8 {
        self.base_stats.level
    }

    pub fn stars(&self) -> u8 {
        self.base_stats.stars
    }

    pub fn weapon_stars(&self) -> u8 {
        self.state.weapon_stars
    }

    pub fn gear_level(&self) -> u8 {
        self.state.gear_level
    }

    pub fn max_hp(&self) -> i32 {
        let base = self.base_stats.max_hp as f64;

        let flat_bonus = self.sum_stats_by(StatType::MaxHP_Base);
        let coefficient_bonus = 10000.0 + self.sum_stats_by(StatType::MaxHP_Coefficient) as f64;

        ((base + flat_bonus) * coefficient_bonus / 10000.0).round() as i32
    }

    pub fn attack_power(&self) -> i32 {
        let base = self.base_stats.attack_power as f64;

        let flat_bonus = self.sum_stats_by(StatType::AttackPower_Base);
        let coefficient_bonus = 10000.0 + self.sum_stats_by(StatType::AttackSpeed_Coefficient);

        ((base + flat_bonus) * coefficient_bonus / 10000.0).round() as i32
    }

    pub fn defense_power(&self) -> i32 {
        let base = self.base_stats.defense_power as f64;

        let flat_bonus = self.sum_stats_by(StatType::DefensePower_Base);
        let coefficient_bonus = 10000.0;

        ((base + flat_bonus) * coefficient_bonus / 10000.0).round() as i32
    }

    pub fn healing_power(&self) -> i32 {
        let base = self.base_stats.healing_power as f64;

        let flat_bonus = self.sum_stats_by(StatType::HealPower_Base);
        let coefficient_bonus = 10000.0 + self.sum_stats_by(StatType::HealPower_Coefficient);

        ((base + flat_bonus) * coefficient_bonus / 10000.0).round() as i32
    }

    pub fn accuracy(&self) -> i32 {
        let base = self.base_stats.accuracy as f64;
        let flat_bonus = self.sum_stats_by(StatType::AccuracyPoint_Base);
        let coefficient_bonus = 10000.0 + self.sum_stats_by(StatType::AccuracyPoint_Coefficient);

        ((base + flat_bonus) * coefficient_bonus / 10000.0).round() as i32
    }

    pub fn evasion(&self) -> i32 {
        self.base_stats.evasion as i32
    }

    pub fn critical_chance_point(&self) -> i32 {
        self.base_stats.critical_chance_point as i32
    }

    pub fn critical_damage_rate(&self) -> i32 {
        self.base_stats.critical_damage_rate as i32
    }

    pub fn critical_chance_resistance(&self) -> i32 {
        100
    }
    pub fn critical_damage_resistance(&self) -> i32 {
        5000
    }
    pub fn stability_point(&self) -> i32 {
        0
    }
    pub fn stability_rate(&self) -> i32 {
        2000
    }
    pub fn ammo_count(&self) -> i32 {
        self.base_stats.ammo_count as i32
    }
    pub fn ammo_cost(&self) -> i32 {
        self.base_stats.ammo_cost as i32
    }
    pub fn range(&self) -> i32 {
        self.base_stats.range as i32
    }
    pub fn cost_recovery(&self) -> i32 {
        self.base_stats.cost_recovery as i32
    }
    pub fn damage_ratio(&self) -> i32 {
        10000
    }
    pub fn damaged_ratio(&self) -> i32 {
        10000
    }
    pub fn heal_effectiveness_rate(&self) -> i32 {
        10000
    }
    pub fn oppression_power(&self) -> i32 {
        100
    }
    pub fn oppression_resistance(&self) -> i32 {
        100
    }
    pub fn attack_speed(&self) -> i32 {
        10000
    }
    pub fn block_rate(&self) -> i32 {
        0
    }
    pub fn defense_penetration(&self) -> i32 {
        self.base_stats.defense_penetration
    }
    pub fn movement_speed(&self) -> i32 {
        200
    }
    pub fn explosive_effectiveness(&self) -> i32 {
        10000
    }
    pub fn piercing_effectiveness(&self) -> i32 {
        10000
    }
    pub fn mystic_effectiveness(&self) -> i32 {
        10000
    }
    pub fn sonic_effectiveness(&self) -> i32 {
        10000
    }
    pub fn extend_buff_duration(&self) -> i32 {
        10000
    }
    pub fn extend_debuff_duration(&self) -> i32 {
        10000
    }
    pub fn extend_cc_duration(&self) -> i32 {
        10000
    }
    pub fn ex_damage_rate(&self) -> i32 {
        0
    }

    fn sum_stats_by(&self, key: StatType) -> f64 {
        let equipment = self
            .equipment_stats()
            .filter(|stat| stat.stat_type == key)
            .map(|stat| stat.max)
            .sum::<u16>() as f64;

        let gear = if self.gear_level() >= 1 {
            self.master
                .gear
                .iter()
                .flat_map(|gear| gear.stats.iter())
                .filter(|stat| stat.stat_type == key)
                .map(|stat| stat.value)
                .sum::<u16>() as f64
        } else {
            0.0
        };

        let weapon = match key {
            StatType::MaxHP_Base => self.base_stats.weapon_bonuses.max_hp,
            StatType::AttackPower_Base => self.base_stats.weapon_bonuses.attack_power,
            StatType::HealPower_Base => self.base_stats.weapon_bonuses.healing_power,
            _ => 0,
        } as f64;

        equipment + gear + weapon
    }

    fn equipment_stats(&self) -> impl Iterator<Item = &MasterEquipmentStat> {
        self.equipments
            .iter()
            .flatten()
            .flat_map(|e| e.stats.iter())
    }

    pub fn get_equipment_id(&self, index: usize) -> u16 {
        self.equipments
            .get(index)
            .map(|e| e.as_ref())
            .flatten()
            .map_or(0, |e| e.id)
    }

    pub fn get_equipment_category(&self, index: usize) -> EquipmentCategory {
        self.master.equipment[index]
    }
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
pub struct EquipmentState {
    pub id: u16,
    #[serde(default)]
    pub level: u16,
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
#[tsify(from_wasm_abi)]
pub struct StudentState {
    pub id: u16,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub level: Option<u8>,
    #[serde(default)]
    pub bond: u8,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub stars: Option<u8>,
    #[serde(default)]
    pub weapon_stars: u8,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub weapon_level: Option<u8>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub equipment0: Option<EquipmentState>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub equipment1: Option<EquipmentState>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub equipment2: Option<EquipmentState>,
    #[serde(default)]
    pub gear_level: u8,
}

#[derive(Debug, Clone)]
pub struct StudentBaseStats {
    pub level: u8,
    pub stars: u8,
    pub weapon_stars: u8,
    pub weapon_level: u8,

    pub max_hp: i32,
    pub attack_power: i32,
    pub defense_power: i32,
    pub healing_power: i32,
    pub defense_penetration: i32,
    pub evasion: u16,
    pub accuracy: u16,
    pub critical_chance_point: u16,
    pub critical_damage_rate: u16,
    pub ammo_count: u16,
    pub ammo_cost: u16,
    pub range: u16,
    pub cost_recovery: u16,

    pub weapon_bonuses: WeaponBonuses,
}

impl StudentBaseStats {
    pub fn new(state: &StudentState, master: &MasterStudent) -> Self {
        let level = state.level.unwrap_or(90);
        let stars = state.stars.unwrap_or(3);
        let weapon_stars = if stars < 5 { 0 } else { state.weapon_stars };

        let weapon_level_limit = match weapon_stars {
            1 => 30,
            2 => 40,
            3 => 50,
            _ => 0,
        };

        let weapon_level = state.weapon_level.unwrap_or(50).min(weapon_level_limit);

        fn calc_basic_stat(
            level: u8,
            stars: u8,
            interval: (u16, u16),
            transcendence: [u16; 5],
        ) -> i32 {
            let stat1 = interval.0 as f64;
            let stat100 = interval.1 as f64;
            let scale = round((level - 1) as f64 / 99.0, 4);

            let post_level_scale = (stat1 + (stat100 - stat1) * scale).round();
            let transcendence = transcendence[0..(stars as usize)].iter().sum::<u16>() as f64;

            (post_level_scale * transcendence / 10000.0).ceil() as i32
        }

        let max_hp = calc_basic_stat(level, stars, master.max_hp, [10000, 500, 700, 900, 1400]);
        let attack_power = calc_basic_stat(
            level,
            stars,
            master.attack_power,
            [10000, 1000, 1200, 1400, 1700],
        );
        let defense_power =
            calc_basic_stat(level, stars, master.defense_power, [10000, 0, 0, 0, 0]);
        let healing_power = calc_basic_stat(
            level,
            stars,
            master.healing_power,
            [10000, 750, 1000, 1200, 1500],
        );
        let defense_penetration = calc_basic_stat(
            level,
            stars,
            master.defense_penetration,
            [10000, 0, 0, 0, 0],
        );

        let weapon_bonuses = WeaponBonuses::new(&master.weapon, weapon_level);

        Self {
            level,
            stars,
            weapon_stars,
            weapon_level,
            max_hp,
            attack_power,
            defense_power,
            healing_power,
            defense_penetration,
            evasion: master.evasion,
            accuracy: master.accuracy,
            critical_chance_point: master.critical_chance_point,
            critical_damage_rate: master.critical_damage_rate,
            ammo_count: master.ammo_count,
            ammo_cost: master.ammo_cost,
            range: master.range,
            cost_recovery: master.cost_recovery,
            weapon_bonuses,
        }
    }
}

#[derive(Debug, Clone)]
pub struct WeaponBonuses {
    attack_power: u16,
    max_hp: u16,
    healing_power: u16,
}

impl WeaponBonuses {
    fn new(master: &MasterWeapon, level: u8) -> Self {
        let mut scale = (level as f64 - 1.0) / 99.0;
        if master.stat_level_up_type.is_standard() {
            scale = round(scale, 4);
        }

        let f = |interval: (u16, u16)| {
            let stat1 = interval.0 as f64;
            let stat100 = interval.1 as f64;

            (stat1 + (stat100 - stat1) * scale).round() as u16
        };

        Self {
            attack_power: f(master.attack_power),
            max_hp: f(master.max_hp),
            healing_power: f(master.healing_power),
        }
    }
}

fn round(v: f64, n: i32) -> f64 {
    let x = 10_f64.powi(n);
    (v * x).round() / x
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_student_base_stats() {
        let master = MasterStudent {
            id: 10000,
            max_hp: (2236, 19390),
            attack_power: (369, 3690),
            defense_power: (19, 119),
            healing_power: (1408, 4225),
            ..Default::default()
        };

        let stats = StudentBaseStats::new(
            &StudentState {
                level: Some(90),
                stars: Some(1),
                ..Default::default()
            },
            &master,
        );

        assert_eq!(stats.max_hp, 17657);
        assert_eq!(stats.attack_power, 3355);
        assert_eq!(stats.defense_power, 109);
        assert_eq!(stats.healing_power, 3940);

        let stats = StudentBaseStats::new(
            &StudentState {
                level: Some(90),
                stars: Some(5),
                ..Default::default()
            },
            &master,
        );

        assert_eq!(stats.max_hp, 23837);
        assert_eq!(stats.attack_power, 5134);
        assert_eq!(stats.defense_power, 109);
        assert_eq!(stats.healing_power, 5694);
    }
}
