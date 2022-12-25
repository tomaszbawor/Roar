import { TrainCommand } from "~/types/form/TrainCommand";
import { ICharacter } from "~/types/ICharacter";
import {
  GeneralStats,
  PoolExtendTraining,
  SkillType,
  TrainingCost,
  trainingCostPerUnit,
  TrainingIncrements,
} from "~/engine/training/trainingTypes";
import prisma from "~/server/database/client";
import { checkForLevelUp } from "~/server/services/levelUpService";

const getStatChangeAfterTraining = (tc: TrainCommand): TrainingIncrements => {
  const ti: TrainingIncrements = {
    offensiveNinjutsu: 0,
    offensiveTaijutsu: 0,
    offensiveGenjutsu: 0,
    offensiveBukijutsu: 0,
    defensiveNinjutsu: 0,
    defensiveTaijutsu: 0,
    defensiveGenjutsu: 0,
    defensiveBukijutsu: 0,
    endurance: 0,
    intelligence: 0,
    maxChakra: 0,
    maxHealth: 0,
    maxStamina: 0,
    speed: 0,
    strength: 0,
  };

  switch (tc.trainType) {
    case PoolExtendTraining.CHAKRA_EXTEND: {
      ti.maxChakra = tc.value;
      break;
    }
    case PoolExtendTraining.STAMINA_EXTEND: {
      ti.maxStamina = tc.value;
      break;
    }
    case SkillType.OFFENSIVE_GENJUTSU: {
      ti.offensiveGenjutsu = tc.value;
      break;
    }
    case SkillType.DEFENSIVE_GENJUTSU: {
      ti.defensiveGenjutsu = tc.value;
      break;
    }
    case SkillType.OFFENSIVE_NINJUTSTU: {
      ti.offensiveNinjutsu = tc.value;
      break;
    }
    case SkillType.DEFENSIVE_NINJUTSTU: {
      ti.defensiveNinjutsu = tc.value;
      break;
    }
    case SkillType.OFFENSIVE_TAIJUTSU: {
      ti.offensiveTaijutsu = tc.value;
      break;
    }
    case SkillType.DEFENSIVE_TAIJUTSU: {
      ti.defensiveTaijutsu = tc.value;
      break;
    }
    case SkillType.OFFENSIVE_BUKIJUTSU: {
      ti.offensiveBukijutsu = tc.value;
      break;
    }
    case SkillType.DEFENSIVE_BUKIJUTSU: {
      ti.defensiveBukijutsu = tc.value;
      break;
    }
    case GeneralStats.ENDURANCE: {
      ti.endurance = tc.value;
      break;
    }
    case GeneralStats.INTELLIGENCE: {
      ti.intelligence = tc.value;
      break;
    }
    case GeneralStats.SPEED: {
      ti.speed = tc.value;
      break;
    }
    case GeneralStats.STRENGTH: {
      ti.strength = tc.value;
    }
  }

  return ti;
};

function calculateGainedExperience(trainCost: TrainingCost) {
  const totalResourcesSpend = trainCost.chakra + trainCost.stamina;
  return Math.round(totalResourcesSpend / 10);
}

export const trainSkills = async (
  tc: TrainCommand,
  character: ICharacter
): Promise<ICharacter> => {
  const unitTrainCost = trainingCostPerUnit[tc.trainType];

  const trainCost: TrainingCost = {
    chakra: unitTrainCost.chakra * tc.value,
    stamina: unitTrainCost.stamina * tc.value,
  };

  const skillIncrement = getStatChangeAfterTraining(tc);

  const experienceGained: number = calculateGainedExperience(trainCost);

  const trainedCharacter = await prisma.character.update({
    where: {
      id: character.id,
    },
    data: {
      characterPool: {
        update: {
          experience: {
            increment: experienceGained,
          },
          chakra: {
            decrement: trainCost.chakra,
          },
          stamina: {
            decrement: trainCost.stamina,
          },
          maxChakra: {
            increment: skillIncrement.maxChakra,
          },
          maxStamina: {
            increment: skillIncrement.maxStamina,
          },
        },
      },
      offensiveNinjutsu: {
        increment: skillIncrement.offensiveNinjutsu,
      },
      defensiveNinjutsu: {
        increment: skillIncrement.defensiveNinjutsu,
      },
      offensiveTaijutsu: {
        increment: skillIncrement.offensiveTaijutsu,
      },
      defensiveTaijutsu: {
        increment: skillIncrement.defensiveTaijutsu,
      },
      offensiveGenjutsu: {
        increment: skillIncrement.offensiveGenjutsu,
      },
      defensiveGenjutsu: {
        increment: skillIncrement.defensiveGenjutsu,
      },
      offensiveBukijutsu: {
        increment: skillIncrement.offensiveBukijutsu,
      },
      defensiveBukijutsu: {
        increment: skillIncrement.defensiveBukijutsu,
      },
      strength: {
        increment: skillIncrement.strength,
      },
      speed: {
        increment: skillIncrement.speed,
      },
      intelligence: {
        increment: skillIncrement.intelligence,
      },
      endurance: {
        increment: skillIncrement.endurance,
      },
    },
    include: {
      characterPool: true,
    },
  });
  return checkForLevelUp(trainedCharacter);
};
