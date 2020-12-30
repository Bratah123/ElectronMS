package client.AntiCheat;

public class CheaterData implements Comparable<CheaterData> {

    private int points;
    private String info;

    public CheaterData(int points, String info) {
        this.points = points;
        this.info = info;
    }

    public String getInfo() {
        return info;
    }

    public int getPoints() {
        return points;
    }

    public int compareTo(CheaterData o) {
        int thisVal = getPoints();
        int anotherVal = o.getPoints();
        return (Integer.compare(anotherVal, thisVal));
    }
}
