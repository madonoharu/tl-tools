export interface Enemy {
  Id: number;
  DevName: string;
  Name: string;
  SquadType: string;
  Rank: string;
  BulletType: string;
  ArmorType: string;
  Size: string;
  Icon: string;
  StabilityPoint: number;
  StabilityRate: number;
  AttackPower1: number;
  AttackPower100: number;
  MaxHP1: number;
  MaxHP100: number;
  DefensePower1: number;
  DefensePower100: number;
  HealPower1: number;
  HealPower100: number;
  DodgePoint: number;
  AccuracyPoint: number;
  CriticalPoint: number;
  Range: number;
}

const enemies: {
  Enemies: Record<number, Enemy>;
  Skills: Record<string, unknown>;
};

export = enemies;
