package server.Shops;

import java.util.List;

import client.Character.MapleCharacter;
import client.MapleClient;
import server.Shops.AbstractPlayerStore.BoughtItem;
import tools.Pair;

public interface IMapleCharacterShop {

    byte OMOK = 1;
    byte CARD = 2;
    byte PLAYER_SHOP = 5;
    byte HIRED_MERCHANT = 6;

    String getOwnerName();

    String getDescription();

    List<Pair<Byte, MapleCharacter>> getVisitors();

    List<MapleCharacterShopItem> getItems();

    boolean isOpen();

    boolean removeItem(int item);

    boolean isOwner(MapleCharacter chr);

    byte getShopType();

    byte getVisitorSlot(MapleCharacter visitor);

    byte getFreeSlot();

    int getGameType();

    int getItemId();

    int getMeso();

    int getOwnerId();

    int getOwnerAccId();

    void setOpen(boolean open);

    void setMeso(int meso);

    void addItem(MapleCharacterShopItem item);

    void removeFromSlot(int slot);

    void broadcastToVisitors(byte[] packet);

    void addVisitor(MapleCharacter visitor);

    void removeVisitor(MapleCharacter visitor);

    void removeAllVisitors(int error, int type);

    void buy(MapleClient c, int item, short quantity);

    void closeShop(boolean saveItems, boolean remove);

    int getMaxSize();

    int getSize();

    List<BoughtItem> getBoughtItems();

    void setPassword(String password);

    String getPassword();

    List<Pair<String, Byte>> getMessages();
}
