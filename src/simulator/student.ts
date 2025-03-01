import studentsJson, { Student as RawStudent } from "@/data/students.json";
import equipmentJson, {
  EquipmentCategory,
  EquipmentStatType,
} from "@/data/equipment.json";
import { range, round, sum } from "@/utils";

export interface EquipmentState {
  id: number;
  level?: number;
}

export interface StudentState {
  id: number;
  level?: number;
  bond?: number;
  stars?: number;
  weaponStars?: number;
  weaponLevel?: number;

  equipment1?: EquipmentState;
  equipment2?: EquipmentState;
  equipment3?: EquipmentState;
}

export function findMaxTierEquipment(category: EquipmentCategory) {
  const arr = equipmentJson.filter((e) => e.category === category);
  const maxTier = Math.max(...arr.map((e) => e.tier));
  return arr.find((e) => e.tier === maxTier);
}

export class Student {
  id: number;
  raw: RawStudent;
  level: number;
  bond: number;
  stars: number;
  weaponStars: number;
  weaponLevel: number;

  equipment1: EquipmentState;
  equipment2: EquipmentState;
  equipment3: EquipmentState;

  constructor(state: StudentState) {
    const raw = studentsJson[state.id];
    this.id = state.id;
    this.raw = raw;
    this.level = state.level || 90;
    this.bond = state.bond || 50;
    this.stars = state.stars || 5;

    if (this.stars >= 5) {
      this.weaponStars = state.weaponStars ?? 3;
    } else {
      this.weaponStars = 0;
    }

    if (state.weaponLevel === undefined) {
      if (this.weaponStars === 1) {
        this.weaponLevel = 30;
      } else if (this.weaponStars === 2) {
        this.weaponLevel = 40;
      } else if (this.weaponStars === 3) {
        this.weaponLevel = 50;
      } else {
        this.weaponLevel = 0;
      }
    } else {
      this.weaponLevel = state.weaponLevel;
    }

    const getDefaultEquipment = (i: number) => ({
      id: findMaxTierEquipment(raw.Equipment[i])?.id || 0,
    });

    this.equipment1 = state.equipment1 || getDefaultEquipment(0);
    this.equipment2 = state.equipment2 || getDefaultEquipment(1);
    this.equipment3 = state.equipment3 || getDefaultEquipment(2);
  }

  equipments() {
    return equipmentJson.filter((e) =>
      [this.equipment1?.id, this.equipment2?.id, this.equipment3?.id].includes(
        e.id
      )
    );
  }

  sumEquipmentStatsBy(key: EquipmentStatType) {
    return sum(
      this.equipments()
        .flatMap((e) => e.stats)
        .filter((stat) => stat.type === key)
        .map((stat) => stat.max)
    );
  }

  // https://docs.google.com/document/d/1Ui0FRgG8h8RB1-cA639F3ETDrVM7q9FKftg4vBKBAAQ/edit?tab=t.0#heading=h.h4m5cg5fnapl
  maxHpBase(): number {
    const { MaxHP1: stat1, MaxHP100: stat100 } = this.raw;
    const constants = [0, 500, 700, 900, 1400];
    const transcendence = 1 + sum(constants.slice(0, this.stars)) / 10000;
    return interpolateStat(stat1, stat100, this.level, transcendence);
  }

  maxHp(): number {
    const base = this.maxHpBase();
    const flatBonus =
      this.sumEquipmentStatsBy("MaxHP_Base") + this.weaponStats().MaxHP;
    const coefficientBonus =
      10000 + this.sumEquipmentStatsBy("MaxHP_Coefficient");

    return Math.round(((base + flatBonus) * coefficientBonus) / 10000);
  }

  attackPowerBase(): number {
    const { AttackPower1: stat1, AttackPower100: stat100 } = this.raw;
    const constants = [0, 1000, 1200, 1400, 1700];
    const transcendence = 1 + sum(constants.slice(0, this.stars)) / 10000;
    return interpolateStat(stat1, stat100, this.level, transcendence);
  }

  attackPower(): number {
    const base = this.attackPowerBase();
    const flatBonus = this.weaponStats().AttackPower;
    const coefficientBonus =
      10000 + this.sumEquipmentStatsBy("AttackPower_Coefficient");

    return Math.round(((base + flatBonus) * coefficientBonus) / 10000);
  }

  defensePower(): number {
    const { DefensePower1: stat1, DefensePower100: stat100 } = this.raw;
    const transcendence = 1;
    return interpolateStat(stat1, stat100, this.level, transcendence);
  }

  healPowerBase(): number {
    const { HealPower1: stat1, HealPower100: stat100 } = this.raw;
    const constants = [0, 750, 1000, 1200, 1500];
    const transcendence = 1 + sum(constants.slice(0, this.stars)) / 10000;
    return interpolateStat(stat1, stat100, this.level, transcendence);
  }

  healPower(): number {
    const base = this.healPowerBase();
    const flatBonus = this.weaponStats().HealPower;
    const coefficientBonus =
      10000 + this.sumEquipmentStatsBy("HealPower_Coefficient");

    return Math.round(((base + flatBonus) * coefficientBonus) / 10000);
  }

  bondStats(): [number, number] {
    const { FavorStatValue } = this.raw;
    let stat1 = 0;
    let stat2 = 0;

    range(this.bond).forEach((i) => {
      if (i < 20) {
        stat1 += FavorStatValue[Math.floor(i / 5)][0];
        stat2 += FavorStatValue[Math.floor(i / 5)][1];
      } else if (i < 50) {
        stat1 += FavorStatValue[2 + Math.floor(i / 10)][0];
        stat2 += FavorStatValue[2 + Math.floor(i / 10)][1];
      }
    });

    return [stat1, stat2];
  }

  weaponStats() {
    const weapon = this.raw.Weapon;

    let scale = (this.weaponLevel - 1) / 99;
    if (this.raw.Weapon.StatLevelUpType == "Standard") {
      scale = round(scale, 4);
    }

    return {
      AttackPower: Math.round(
        weapon.AttackPower1 +
          (weapon.AttackPower100 - weapon.AttackPower1) * scale
      ),
      MaxHP: Math.round(
        weapon.MaxHP1 + (weapon.MaxHP100 - weapon.MaxHP1) * scale
      ),
      HealPower: Math.round(
        weapon.HealPower1 + (weapon.HealPower100 - weapon.HealPower1) * scale
      ),
    };
  }
}

function getTimeAttackLevelScale(level: number) {
  if (level <= 1) {
    return 0;
  } else if (level == 2) {
    return 0.0101;
  } else if (level <= 24) {
    return 0.0707;
  } else if (level == 25) {
    return 0.0808;
  } else if (level <= 39) {
    return 0.1919;
  } else if (level == 40) {
    return 0.202;
  } else if (level <= 64) {
    return 0.4444;
  } else if (level == 65) {
    return 0.4545;
  } else if (level <= 77) {
    return 0.7172;
  } else if (level == 78) {
    return 0.7273;
  } else {
    return round((level - 1) / 99, 4);
  }
}

type StatGrowthType = "Standard" | "TimeAttack" | "LateBloom" | "Premature";

function interpolateStat(
  stat1: number,
  stat100: number,
  level: number,
  transcendence = 1,
  statGrowthType: StatGrowthType = "Standard"
) {
  let levelScale: number;
  switch (statGrowthType) {
    case "TimeAttack":
      levelScale = getTimeAttackLevelScale(level);
      break;
    case "LateBloom":
    case "Premature":
      levelScale = (level - 1) / 99;
      break;
    case "Standard":
    default:
      levelScale = round((level - 1) / 99, 4);
      break;
  }

  return Math.ceil(
    round(
      Math.round(round(stat1 + (stat100 - stat1) * levelScale, 4)) *
        transcendence,
      4
    )
  );
}
