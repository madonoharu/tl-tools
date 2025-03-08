#![allow(unused)]
mod collection;
mod comp;
mod effect;
mod master_data;
mod student;
mod types;
mod utils;

use collection::Collection;
use comp::{Comp, CompState};
use effect::SkillEffectBuff;
use master_data::{MasterData, Skill};
use student::{Student, StudentState};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Basim {
    master_data: MasterData,
}

#[wasm_bindgen]
impl Basim {
    #[wasm_bindgen(constructor)]
    pub fn new(master_data: MasterData) -> Self {
        Self { master_data }
    }

    pub fn create_comp(&self, state: CompState) -> Comp {
        let CompState {
            st1,
            st2,
            st3,
            st4,
            sp1,
            sp2,
            buffs,
        } = state;

        let students = [st1, st2, st3, st4, sp1, sp2]
            .into_iter()
            .flatten()
            .filter_map(|state| self.create_student(state, buffs.clone()))
            .collect::<Vec<_>>();

        Comp { students }
    }

    fn create_student(&self, state: StudentState, buffs: Vec<SkillEffectBuff>) -> Option<Student> {
        let master = self.master_data.find_student(state.id)?.clone();

        let equipment_states = [&state.equipment0, &state.equipment1, &state.equipment2];

        let equip = |index: usize| {
            let state = equipment_states[index].as_ref();

            if let Some(state) = state {
                self.master_data.find_equipment(state.id)
            } else {
                let category = master.equipment[index];
                self.master_data.get_max_tier_equipment(category)
            }
            .cloned()
        };

        let equipments = [equip(0), equip(1), equip(2)];

        Some(Student::new(state, master, equipments, buffs))
    }

    pub fn create_student2(&self, state: StudentState) -> Option<Student> {
        self.create_student(state, vec![])
    }
}
