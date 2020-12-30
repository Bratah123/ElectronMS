package client.Skills;

import java.util.HashMap;
import java.util.Map;

import tools.CaltechEval;

public class SkillStats {

    private final int level;
    private final Map<String, Integer> stats = new HashMap<>();

    public SkillStats(int skilllevel) {
        this.level = skilllevel;
    }

    public final void setStats(String name, int value) {
        if (stats.containsKey(name)) {
            stats.remove(name);
        }
        stats.put(name, value);
    }

    public final int getLevel() {
        return level;
    }

    public final void setStats(final String name, final String fomular, boolean rn) {
        if (stats.containsKey(name)) {
            stats.remove(name);
        }
        if (fomular != null) {
            String fomular_r = fomular;
            if (!rn) {
                if ((fomular.length() > 4)
                        && (fomular.endsWith("\\r\\n"))) { // Do not Skill Loading Fixed.
                    fomular_r = fomular_r.replace(fomular,
                            fomular.substring(0, fomular.length() - 4));
                }
                if (fomular.startsWith("-")) { // -30+3*x
                    fomular_r = fomular_r.replace(fomular,
                            "n" + fomular.substring(1)); // n30+3*x
                }
                if (fomular.contains("X")) { // 80000~ Skills Exception Fixed.
                    fomular_r = fomular_r.replace("X", "x");
                }
                if (fomular.contains("y")) { // Angelic Buster Exception
                    fomular_r = fomular_r.replace(fomular, "0");
                }
            }
            int result = (int) (new CaltechEval(fomular_r.replace("x", level + "")).evaluate());
            stats.put(name, result);
        }
    }

    public final int getStats(String key) {
        if (stats.containsKey(key)) {
            return stats.get(key);
        }
        return SkillEffectDefaultValues.getDef(key);
    }
}
