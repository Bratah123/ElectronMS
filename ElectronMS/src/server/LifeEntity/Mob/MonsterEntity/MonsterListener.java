package server.LifeEntity.Mob.MonsterEntity;

public interface MonsterListener {

    /**
     *
     * monster The monster that was killed
     * highestDamageChar The char that did the highest damage to the
     * monster. Can be null if that char is offline.
     */
 void monsterKilled();
}
