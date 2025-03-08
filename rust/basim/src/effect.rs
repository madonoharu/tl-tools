mod skill_effect;

pub use skill_effect::*;

pub enum Effect {
    Skill(SkillEffect),
}
