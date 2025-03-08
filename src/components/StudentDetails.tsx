import { Student } from "basim";
import Box from "@mui/material/Box";

interface StudentDetailsProps {
  student: Student;
}

export default function StudentDetails({ student }: StudentDetailsProps) {
  return (
    <Box display="grid" gridTemplateColumns="400px 400px">
      <StatLabel label="最大HP" value={student.max_hp()} />
      <StatLabel label="攻撃力" value={student.attack_power()} />
      <StatLabel label="防御力" value={student.defense_power()} />
      <StatLabel label="治癒力" value={student.healing_power()} />
      <StatLabel label="命中値" value={student.accuracy()} />
      <StatLabel label="回避値" value={student.evasion()} />
      <StatLabel label="会心値" value={student.critical_chance_point()} />
      <StatLabel
        label="会心発生抵抗力"
        value={student.critical_chance_resistance()}
      />
      <StatLabel
        label="会心ダメージ率"
        value={student.critical_damage_rate()}
      />
      <StatLabel
        label="会心ダメージ抵抗率"
        value={student.critical_damage_resistance()}
      />
      <StatLabel label="安定値" value={student.stability_point()} />
      <StatLabel label="安定率" value={student.stability_rate()} />
      <StatLabel label="射程" value={student.range()} />
      <StatLabel label="CC強化力" value={student.oppression_power()} />
      <StatLabel label="CC抵抗力" value={student.oppression_resistance()} />
      <StatLabel label="被回復率" value={student.heal_effectiveness_rate()} />
      <StatLabel label="コスト回復力" value={student.cost_recovery()} />
      <StatLabel label="攻撃速度" value={student.attack_speed()} />
      <StatLabel label="移動速度" value={student.movement_speed()} />
      <StatLabel label="遮蔽ブロック率ボーナス" value={student.block_rate()} />
      <StatLabel label="防御貫通値" value={student.defense_penetration()} />
      <StatLabel label="装弾数" value={student.ammo_count()} />
      <StatLabel label="与ダメージ倍率" value={student.damage_ratio()} />
      <StatLabel label="被ダメージ倍率" value={student.damaged_ratio()} />
      <StatLabel
        label="EXスキル与ダメージ倍率"
        value={student.ex_damage_rate()}
      />
      <StatLabel label="爆発特効" value={student.explosive_effectiveness()} />
      <StatLabel label="貫通特効" value={student.piercing_effectiveness()} />
      <StatLabel label="神秘特効" value={student.mystic_effectiveness()} />
      <StatLabel label="振動特効" value={student.sonic_effectiveness()} />
      <StatLabel
        label="バフ効果持続力"
        value={student.extend_buff_duration()}
      />
      <StatLabel label="弱体状態持続力" value={student.extend_cc_duration()} />
    </Box>
  );
}

function StatLabel({ label, value }: { label: string; value: number }) {
  return (
    <Box display="flex" gap={1}>
      <span>{label}</span>
      <span>{value}</span>
    </Box>
  );
}
