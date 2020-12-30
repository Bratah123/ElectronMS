package client.ItemInventory;

public interface IEquip extends IItem {

    public static enum ScrollResult {
        SUCCESS, FAIL, CURSE
    }

    byte getUpgradeSlots();

    byte getLevel();

    byte getViciousHammer();

    byte getItemLevel();

    int getItemEXP();

    short getStr();

    short getDex();

    short getInt();

    short getLuk();

    short getHp();

    short getMp();

    short getWatk();

    short getMatk();

    short getWdef();

    short getMdef();

    short getAcc();

    short getAvoid();

    short getHands();

    short getSpeed();

    short getJump();

    int getDurability();

    byte getEnhance();

    byte getState();

    byte getLines();

    int getFire();

    int getPotential1();

    int getPotential2();

    int getPotential3();

    int getPotential4();

    int getPotential5();

    int getPotential6();

    int getPotential7();

    int getanvil();

    short getHpR();

    short getMpR();

    byte getBossDamage();

    byte getAllDamageP();

    byte getAllStatP();

    short getDownLevel();

    short getIgnoreWdef();

    short getSoulEnchanter();

    short getSoulPotential();

    short getSoulName();

    int getSoulSkill();

    short getItemTrace();

    int[] getFireStat();

    String getFireStatToString();

    short getArc();

    int getArcEXP();

    int getArcLevel();

}
