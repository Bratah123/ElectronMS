package client.ItemInventory.PetsMounts;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import tools.Pair;

public class PetDataFactory {

    private static MapleDataProvider dataRoot = MapleDataProviderFactory.getDataProvider(new File("wz/Item.wz"));
    private static Map<Pair<Integer, Integer>, PetCommand> petCommands = new HashMap<>();
    private static Map<Integer, Integer> petHunger = new HashMap<>();

    public static PetCommand getPetCommand(final int petId, final int skillId) {
        PetCommand ret = petCommands.get(new Pair<>(petId, skillId));
        if (ret != null) {
            return ret;
        }
        final MapleData skillData = dataRoot.getData("Pet/" + petId + ".img");
        int prob = 0;
        int inc = 0;
        if (skillData != null) {
            prob = MapleDataTool.getInt("interact/" + skillId + "/prob", skillData, 0);
            inc = MapleDataTool.getInt("interact/" + skillId + "/inc", skillData, 0);
        }
        ret = new PetCommand(petId, skillId, prob, inc);
        petCommands.put(new Pair<>(petId, skillId), ret);

        return ret;
    }

    public static int getHunger(final int petId) {
        Integer ret = petHunger.get(petId);
        if (ret != null) {
            return ret;
        }
        final MapleData hungerData = dataRoot.getData("Pet/" + petId + ".img").getChildByPath("info/hungry");
        ret = MapleDataTool.getInt(hungerData, 1);
        petHunger.put(petId, ret);

        return ret;
    }
}
