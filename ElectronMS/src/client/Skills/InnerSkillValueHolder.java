package client.Skills;

public class InnerSkillValueHolder {

    private int skillId;
    private byte skillLevel;
    private byte maxLevel;
    private byte rank;

    public InnerSkillValueHolder(int skillId, byte skillLevel, byte maxLevel, byte rank) {
        this.skillId = skillId;
        this.skillLevel = skillLevel;
        this.maxLevel = maxLevel;
        this.rank = rank;
    }

    public int getSkillId() {
        return skillId;
    }

    public byte getSkillLevel() {
        return skillLevel;
    }

    public byte getMaxLevel() {
        return maxLevel;
    }

    public byte getRank() {
        return rank;
    }
}
