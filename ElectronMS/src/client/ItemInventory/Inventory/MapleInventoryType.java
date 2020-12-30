package client.ItemInventory.Inventory;

public enum MapleInventoryType {

    UNDEFINED(0), EQUIP(1), USE(2), SETUP(3), ETC(4), CASH(5), EQUIPPED(-1);
    final byte type;

    MapleInventoryType(int type) {
        this.type = (byte) type;
    }

    public byte getType() {
        return type;
    }

    public short getBitfieldEncoding() {
        return (short) (2 << type);
    }

    public static MapleInventoryType getByType(byte type) {
        for (MapleInventoryType l : MapleInventoryType.values()) {
            if (l.getType() == type) {
                return l;
            }
        }
        return null;
    }

    public static MapleInventoryType getByWZName(String name) {
        switch (name) {
            case "Install":
                return SETUP;
            case "Consume":
                return USE;
            case "Etc":
                return ETC;
            case "Cash":
            case "Pet":
                return CASH;
        }
        return UNDEFINED;
    }
}
