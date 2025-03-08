use std::collections::HashMap;

use serde::Deserialize;
use tsify::Tsify;

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
#[tsify(from_wasm_abi)]
pub struct Collection {
    #[tsify(type = "Record<number, StudentState | undefined>")]
    students: HashMap<u32, StudentState>,
}

#[derive(Debug, Default, Clone, Deserialize, Tsify)]
struct StudentState {
    id: u32,
    #[serde(skip_serializing_if = "Option::is_none")]
    level: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    bond: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    stars: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    weapon_stars: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    weapon_level: Option<u32>,
}
