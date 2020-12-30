package client.Skills;

import client.Stats.MonsterStatus.Element;


public interface ISkill {
    
    int getHyper();

    int getHyperStat();

    int getId();

    void setName(String name);

    String getName();

    void setDecs(String name);

    String getDecs();

    SkillStatEffect getEffect(int level);

    byte getMaxLevel();

    int getAnimationTime();

    boolean canBeLearnedBy(int job);

    boolean isFourthJob();

    boolean getAction();

    Element getElement();

    boolean isBeginnerSkill();

    boolean hasRequiredSkill();

    boolean isInvisible();

    boolean isChargeSkill();

    int getRequiredSkillLevel();

    int getRequiredSkillId();

    int getMasterLevel();

    boolean canCombatOrdered();

    boolean haveMasterLevel();

    boolean CheckMasterLevel();

    boolean ishyper();

    int getPsdSkill();

    int getPsd();

    String getPsdDamR();

    boolean isNotRemoved();

    boolean notCancel();

    boolean isTimeLimited();

    int getVehicleID();

    boolean isPairSkill();
}
