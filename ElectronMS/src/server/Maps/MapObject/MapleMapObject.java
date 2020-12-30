package server.Maps.MapObject;

import java.awt.Point;

import client.MapleClient;

public interface MapleMapObject {

    int getObjectId();

    void setObjectId(final int id);

    MapleMapObjectType getType();

    Point getPosition();

    void setPosition(final Point position);

    void sendSpawnData(final MapleClient client);

    void sendDestroyData(final MapleClient client);
}
