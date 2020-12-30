package client.ItemInventory;

import client.ItemInventory.Inventory.MapleInventory;

import java.util.Collection;

public interface InventoryContainer {

    Collection<MapleInventory> allInventories();
}
