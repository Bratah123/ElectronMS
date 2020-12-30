package provider;

import java.awt.Point;
import java.awt.image.BufferedImage;

import provider.WzXML.MapleDataType;

public class MapleDataTool {

    public static String getString(MapleData data, String def) {
        if (data == null || data.getData() == null) {
            return def;
        } else {
            if (data.getType() == MapleDataType.STRING) {
                return ((String) data.getData());
            } else {
                return String.valueOf(data.getData());
            }
        }
    }

    public static String getString(MapleData data) {
        if (data.getType() == MapleDataType.INT) {
            return String.valueOf(getInt(data));
        }
        return (String) data.getData();
    }

    public static String getString(String path, MapleData data) {
        return getString(data.getChildByPath(path));
    }

    public static String getString(String path, MapleData data, String def) {
        return getString(data.getChildByPath(path), def);
    }

    public static double getDouble(MapleData data) {
        return (Double) data.getData();
    }

    public static float getFloat(MapleData data, float def) {
        try {
            return (Float) data.getData();
        } catch (Exception e) {
            return def;
        }
    }

    public static float getFloat(MapleData data) {
        return getFloat(data, 0);
    }

    public static int getInt(MapleData data) {
        return getInt(data, 0);
    }

    public static long getLong(MapleData data) {
        return getLong(data, 0);
    }

    public static int getInt(MapleData data, int def) {
        if (data == null || data.getData() == null) {
            return def;
        } else if (data.getType() == MapleDataType.STRING) {
            return Integer.parseInt(getString(data));
        } else if (data.getType() == MapleDataType.SHORT) {
            return (int) (Short) data.getData();
        } else {
            return (Integer) data.getData();
        }
    }

    public static long getLong(MapleData data, long def) {
        if (data == null || data.getData() == null) {
            return def;
        } else if (data.getType() == MapleDataType.STRING) {
            return Long.parseLong(getString(data));
        } else if (data.getType() == MapleDataType.SHORT) {
            return (Short) data.getData();
        } else {
            return (Long) data.getData();
        }
    }

    public static int getInt(String path, MapleData data) {
        return getIntConvert(path, data);
    }

    public static int getIntConvert(MapleData data) {
        if (data.getType() == MapleDataType.STRING) {
            return Integer.parseInt(getString(data));
        } else {
            return getInt(data);
        }
    }

    public static int getIntConvert(String path, MapleData data) {
        MapleData d = data.getChildByPath(path);
        if (d.getType() == MapleDataType.STRING) {
            return Integer.parseInt(getString(d));
        } else {
            return getInt(d);
        }
    }

    public static long getLongConvert(String path, MapleData data) {
        MapleData d = data.getChildByPath(path);
        if (d == null) {
            return 0L;
        }
        if (d.getType() == MapleDataType.STRING) {
            if (getString(d).equals("??????")) {
                return 1L;
            }
            return Long.parseLong(getString(d));
        }
        return getLong(d);
    }

    public static int getInt(String path, MapleData data, int def) {
        return getIntConvert(path, data, def);
    }

    public static int getIntConvert(String path, MapleData data, int def) {
        try {
            MapleData d = data.getChildByPath(path);
            if (d == null) {
                return def;
            }
            if (d.getType() == MapleDataType.STRING) {
                try {
                    return Integer.parseInt(getString(d));
                } catch (Exception nfe) {
                    return def;
                }
            } else {
                return getInt(d, def);
            }
        } catch (Exception e) {
            return def;
        }
    }

    public static long getLongConvert(String path, MapleData data, long def) {
        try {
            MapleData d = data.getChildByPath(path);

            if (d == null) {
                return def;
            }
            if (d.getType() == MapleDataType.STRING) {
                try {
                    return Long.parseLong(getString(d));
                } catch (Exception nfe) {
                    return def;
                }
            } else {
                return getLong(d, def);
            }
        } catch (Exception e) {
            return def;
        }
    }

    public static BufferedImage getImage(MapleData data) {
        return ((MapleCanvas) data.getData()).getImage();
    }

    public static Point getPoint(MapleData data) {
        return ((Point) data.getData());
    }

    public static Point getPoint(String path, MapleData data) {
        return getPoint(data.getChildByPath(path));
    }

    public static Point getPoint(String path, MapleData data, Point def) {
        final MapleData pointData = data.getChildByPath(path);
        if (pointData == null) {
            return def;
        }
        return getPoint(pointData);
    }

    public static String getFullDataPath(MapleData data) {
        StringBuilder path = new StringBuilder();
        MapleDataEntity myData = data;
        while (myData != null) {
            path.insert(0, myData.getName() + "/");
            myData = myData.getParent();
        }
        return path.substring(0, path.length() - 1);
    }
}
