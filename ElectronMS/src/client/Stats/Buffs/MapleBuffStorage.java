package client.Stats.Buffs;

import client.Skills.CoolDownValueHolder;
import client.Stats.Diseases.MapleDiseaseValueHolder;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class MapleBuffStorage {

    private final Map<Integer, List<MapleBuffValueHolder>> buffs = new LinkedHashMap<>();
    private final Map<Integer, List<CoolDownValueHolder>> coolDowns = new LinkedHashMap<>();
    private final Map<Integer, List<MapleDiseaseValueHolder>> diseases = new LinkedHashMap<>();

    public final void addBuffsToStorage(final int playerId, final List<MapleBuffValueHolder> toStore) {
        buffs.remove(playerId);
        buffs.put(playerId, toStore);
    }

    public final void addCooldownsToStorage(final int playerId, final List<CoolDownValueHolder> toStore) {
        coolDowns.remove(playerId);
        coolDowns.put(playerId, toStore);
    }

    public final void addDiseaseToStorage(final int playerId, final List<MapleDiseaseValueHolder> toStore) {
        diseases.remove(playerId);
        diseases.put(playerId, toStore);
    }

    public final List<MapleBuffValueHolder> getBuffsFromStorage(final int playerId) {
        if (buffs.containsKey(playerId)) {
            return buffs.get(playerId);
        }
        return new ArrayList<>();
    }

    public final List<CoolDownValueHolder> getCooldownsFromStorage(final int playerId) {
        if (coolDowns.containsKey(playerId)) {
            return coolDowns.get(playerId);
        }
        return new ArrayList<>();
    }

    public final List<MapleDiseaseValueHolder> getDiseaseFromStorage(final int playerId) {
        if (diseases.containsKey(playerId)) {
            return diseases.get(playerId);
        }
        return new ArrayList<>();
    }
}
