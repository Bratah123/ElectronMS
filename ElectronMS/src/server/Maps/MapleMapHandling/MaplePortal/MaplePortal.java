package server.Maps.MapleMapHandling.MaplePortal;

import java.awt.Point;

import client.MapleClient;

public interface MaplePortal {

    int MAP_PORTAL = 2;
    int DOOR_PORTAL = 6;

    int getType();

    int getId();

    Point getPosition();

    String getName();

    String getTarget();

    String getScriptName();

    void setScriptName(String newName);

    int getTargetMapId();

    void enterPortal(MapleClient c);
}
