import { TrainCommand } from "~/types/form/TrainCommand";
import { ICharacter } from "~/types/ICharacter";
import {
  PoolExtendTraining,
  SkillType,
  StatType,
  TrainingCost,
  trainingCostPerUnit,
  TrainingIncrements,
} from "~/engine/training/trainingTypes";
import prisma from "~/server/database/client";

const getStatChangeAfterTraining = (tc: TrainCommand): TrainingIncrements => {
  const ti: TrainingIncrements = {
    endurance: 0,
    genjutsu: 0,
    intelligence: 0,
    maxChakra: 0,
    maxHealth: 0,
    maxStamina: 0,
    ninjutsu: 0,
    speed: 0,
    strength: 0,
    taijustu: 0,
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
    case SkillType.GENJUTSU: {
      ti.genjutsu = tc.value;
      break;
    }
    case SkillType.NINJUTSTU: {
      ti.ninjutsu = tc.value;
      break;
    }
    case SkillType.TAIJUTSU: {
      ti.taijustu = tc.value;
      break;
    }
    case StatType.ENDURANCE: {
      ti.endurance = tc.value;
      break;
    }
    case StatType.INTELLIGENCE: {
      ti.intelligence = tc.value;
      break;
    }
    case StatType.SPEED: {
      ti.speed = tc.value;
      break;
    }
    case StatType.STRENGTH: {
      ti.strength = tc.value;
    }
  }

  return ti;
};

export const trainSkills = async (tc: TrainCommand, character: ICharacter) => {
  const unitTrainCost = trainingCostPerUnit[tc.trainType];

  const trainCost: TrainingCost = {
    chakra: unitTrainCost.chakra * tc.value,
    stamina: unitTrainCost.stamina * tc.value,
  };

  const skillIncrement = getStatChangeAfterTraining(tc);

  await prisma.character.update({
    where: {
      id: character.id,
    },
    data: {
      characterPool: {
        update: {
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
      ninjutsu: {
        increment: skillIncrement.ninjutsu,
      },
      genjutsu: {
        increment: skillIncrement.genjutsu,
      },
      taijutsu: {
        increment: skillIncrement.taijustu,
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
  });
};
