use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

use crate::{
    effect::{SkillEffect, SkillEffectBuff},
    master_data::SkillType,
    student::{Student, StudentState},
};

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
#[tsify(from_wasm_abi)]
pub struct CompState {
    pub st1: Option<StudentState>,
    pub st2: Option<StudentState>,
    pub st3: Option<StudentState>,
    pub st4: Option<StudentState>,
    pub sp1: Option<StudentState>,
    pub sp2: Option<StudentState>,
    pub buffs: Vec<SkillEffectBuff>,
}

#[wasm_bindgen]
pub struct Comp {
    pub(crate) students: Vec<Student>,
}

#[wasm_bindgen]
impl Comp {
    pub fn students_len(&self) -> usize {
        self.students.len()
    }

    pub fn get_student(&self, index: usize) -> Student {
        self.students[index].clone()
    }

    pub fn get_skill_info(&self) -> SkillInfo {
        let vec = self
            .students
            .iter()
            .flat_map(|s| {
                s.master.skills.iter().map(|skill| SkillInfoItem {
                    name: s.name(),
                    skill_type: skill.skill_type,
                    buffs: skill
                        .effects
                        .iter()
                        .filter_map(|e| {
                            if let SkillEffect::Buff(buff) = e {
                                Some(buff.clone())
                            } else {
                                None
                            }
                        })
                        .collect(),
                })
            })
            .collect();

        SkillInfo(vec)
    }
}

#[derive(Debug, Default, Clone, Serialize, Tsify)]
pub struct SkillInfoItem {
    name: String,
    skill_type: SkillType,
    buffs: Vec<SkillEffectBuff>,
}

#[derive(Debug, Default, Clone, Serialize, Tsify)]
#[tsify(into_wasm_abi)]
pub struct SkillInfo(Vec<SkillInfoItem>);
