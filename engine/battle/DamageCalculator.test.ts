import * as DamageCalculator from "../../engine/battle/DamageCalculator";
import { AttackSkill } from "../../engine/battle/DamageCalculator";
import { ICharacter } from "../../types/ICharacter";
import { describe, test } from "vitest";
import Assert from "assert";

describe("DamageCalculator", () => {
  test("damage test for one opponent stronger then other", async () => {
    // given
    const attacker: ICharacter = createCharWithSameStats(10000);
    const defender: ICharacter = createCharWithSameStats(9000);
    const skill: AttackSkill = {
      attackCoefficients: {
        NINJUTSU: 0.7,
        TAIJUTSU: 0,
        GENJUTSU: 0.3,
        BUKIJUTSU: 0,
      },

      attackGenerals: {
        SPEED: 0.7,
        INTELLIGENCE: 0,
        STRENGTH: 0.3,
        ENDURANCE: 0,
      },
      element: null,
      skillLevel: 1,
      skillBasePower: 5.2,
    };

    // when
    const strongerAttack = DamageCalculator.calculate(
      attacker,
      defender,
      skill
    );
    const weakerAttack = DamageCalculator.calculate(defender, attacker, skill);

    Assert.equal(strongerAttack.damage, 10811);
    Assert.equal(weakerAttack.damage, 8725);
  });

  function createCharWithSameStats(stat: number): ICharacter {
    return {
      id: "fake",
      name: "fake",
      userId: "fake",
      village: "SAND",
      rank: "STUDENT",
      offensiveNinjutsu: stat,
      offensiveTaijutsu: stat,
      offensiveGenjutsu: stat,
      offensiveBukijutsu: stat,
      defensiveNinjutsu: stat,
      defensiveTaijutsu: stat,
      defensiveGenjutsu: stat,
      defensiveBukijutsu: stat,
      speed: stat,
      intelligence: stat,
      strength: stat,
      endurance: stat,
      characterPool: null,
      isInBattle: false,
      currentBattleId: null,
    };
  }
});
