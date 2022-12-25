import { AttackSkill, DamageCalculator } from "../../engine/battle/DamageCalculator";
import { ICharacter } from "../../types/ICharacter";
import { AICharacter } from "../../types/battle/AiCharacter";
import { describe, test } from "vitest";


describe("DamageCalculator", () => {

  test("should calculate damage", async () => {
    // given
    const attacker: ICharacter = {
      id: "fake",
      name: "fake",
      userId: "fake",
      village: "SAND",
      rank: "STUDENT",
      offensiveNinjutsu: 100,
      offensiveTaijutsu: 100,
      offensiveGenjutsu: 100,
      offensiveBukijutsu: 100,
      defensiveNinjutsu: 100,
      defensiveTaijutsu: 100,
      defensiveGenjutsu: 100,
      defensiveBukijutsu: 100,
      speed: 100,
      intelligence: 100,
      strength: 100,
      endurance: 100,
      characterPool: null
    };
    const defender: AICharacter = {
      name: "Dummy",
      health: 100,
      offensiveNinjutsu: 20,
      offensiveTaijutsu: 14,
      offensiveGenjutsu: 16,
      offensiveBukijutsu: 12,
      defensiveNinjutsu: 15,
      defensiveTaijutsu: 11,
      defensiveGenjutsu: 16,
      defensiveBukijutsu: 13,
      speed: 12,
      intelligence: 15,
      strength: 13,
      endurance: 15
    };
    const skill: AttackSkill = {
      attackCoeficients: {
        NINJUTSU: 0.7,
        TAIJUTSU: 0,
        GENJUTSU: 0.3,
        BUKIJUTSU: 0
      },

      attackGenerals: {
        SPEED: 0.7,
        INTELLIGENCE: 0,
        STRENGTH: 0.3,
        ENDURANCE: 0
      },
      element: null

    };

    // when
    DamageCalculator.calculate(attacker, defender, skill);

  });
});