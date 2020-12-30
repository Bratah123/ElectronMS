package client.ItemInventory.Items;

import java.util.List;
import java.util.Map;

public class PotentialOption {

    private Map<Integer, List<Integer>> option;

    public PotentialOption(final Map<Integer, List<Integer>> option) {
        this.option = option;
    }

    public Map<Integer, List<Integer>> getPotentialOption() {
        return option;
    }
}
