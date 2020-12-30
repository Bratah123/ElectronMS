package server.LifeEntity.Mob;

import client.Stats.MonsterStatus.Element;
import client.Stats.MonsterStatus.ElementalEffectiveness;
import connections.Database.MYSQL;
import java.awt.Point;
import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

//final HP import constants.FinalMaxHpConstants;
import constants.ServerConstants;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import provider.WzXML.MapleDataType;
import server.LifeEntity.Mob.MonsterEntity.MapleMonster;
import client.Stats.MonsterStatus.MapleMonsterStats;
import server.LifeEntity.Npc.MapleNPC;
import server.LifeEntity.Npc.MapleNPCStats;
import server.LifeEntity.Npc.MaplePlayerNPC;
import server.Maps.BanishInfo;
import tools.Pair;
import tools.StringUtil;

public class MapleLifeProvider {

    private static final MapleDataProvider data = MapleDataProviderFactory.getDataProvider(new File("wz/Mob.wz"));
    private static final MapleDataProvider stringDataWZ = MapleDataProviderFactory
            .getDataProvider(new File("wz/String.wz"));
    private static final MapleDataProvider etcDataWZ = MapleDataProviderFactory.getDataProvider(new File("wz/Etc.wz"));
    private static final MapleData mobStringData = stringDataWZ.getData("Mob.img");
    private static final MapleData npcStringData = stringDataWZ.getData("Npc.img");
    private static final MapleData npclocData = etcDataWZ.getData("NpcLocation.img");
    private static Map<Integer, MapleMonsterStats> monsterStats = new HashMap<>();
    private static Map<Integer, Integer> NPCLoc = new HashMap<>();

    public static AbstractLoadedMapleLife getLife(int id, String type) {
        if (type.equalsIgnoreCase("n")) {
            return getNPC(id);
        } else if (type.equalsIgnoreCase("m")) {
            return getMonster(id);
        } else {
            System.err.println("Unknown Life type: " + type + "");
            return null;
        }
    }

    public static int getNPCLocation(int npcid) {
        if (NPCLoc.containsKey(npcid)) {
            return NPCLoc.get(npcid);
        }
        final int map = MapleDataTool.getIntConvert(npcid + "/0", npclocData);
        NPCLoc.put(npcid, map);
        return map;
    }

    public static MapleMonster getMonster(int mid) {
        MapleMonsterStats stats = monsterStats.get(mid);

        if (stats == null) {
            MapleData monsterData = data.getData(StringUtil.getLeftPaddedStr(mid + ".img", '0', 11));
            if (monsterData == null) {
                return null;
            }
            MapleData monsterInfoData = monsterData.getChildByPath("info");
            byte point = 0;
            stats = new MapleMonsterStats(point);
            try {
                stats.setHp(MapleDataTool.getIntConvert("maxHP", monsterInfoData));
            } catch (Exception ex) {
                stats.setHp(Long.MAX_VALUE);// temporary
            }
            stats.setMp(MapleDataTool.getIntConvert("maxMP", monsterInfoData, 0));
            stats.setExp(MapleDataTool.getIntConvert("exp", monsterInfoData, 0));
            stats.setLevel((short) MapleDataTool.getIntConvert("level", monsterInfoData));
            stats.setRemoveAfter(MapleDataTool.getIntConvert("removeAfter", monsterInfoData, 0));
            stats.setrareItemDropLevel((byte) MapleDataTool.getIntConvert("rareItemDropLevel", monsterInfoData, 0));
            stats.setFixedDamage(MapleDataTool.getIntConvert("fixedDamage", monsterInfoData, -1));
            stats.setOnlyNormalAttack(MapleDataTool.getIntConvert("onlyNormalAttack", monsterInfoData, 0) > 0);
            stats.setRealBoss(MapleDataTool.getIntConvert("hpTagBgcolor", monsterInfoData, 0) > 0);
            stats.setBoss(MapleDataTool.getIntConvert("boss", monsterInfoData, 0) > 0 || mid == 8810018
                    || (mid >= 8810118 && mid <= 8810122) || mid == 9410066);
            stats.setSkeleton(MapleDataTool.getIntConvert("skeleton", monsterInfoData, 0) > 0);
            stats.setExplosiveReward(MapleDataTool.getIntConvert("explosiveReward", monsterInfoData, 0) > 0);
            stats.setFfaLoot(MapleDataTool.getIntConvert("publicReward", monsterInfoData, 0) > 0);
            stats.setUndead(MapleDataTool.getIntConvert("undead", monsterInfoData, 0) > 0);
            stats.setName(MapleDataTool.getString(mid + "/name", mobStringData, "MISSINGNO"));
            stats.setBuffToGive(MapleDataTool.getIntConvert("buff", monsterInfoData, -1));
            stats.setFriendly(MapleDataTool.getIntConvert("damagedByMob", monsterInfoData, 0) > 0);
            stats.setCP((byte) MapleDataTool.getIntConvert("getCP", monsterInfoData, 0));
            stats.setPhysicalDefense((short) MapleDataTool.getIntConvert("PDDamage", monsterInfoData, 0));
            stats.setMagicDefense((short) MapleDataTool.getIntConvert("MDDamage", monsterInfoData, 0));
            stats.setEva((short) MapleDataTool.getIntConvert("eva", monsterInfoData, 0));
            stats.setCharismaEXP(MapleDataTool.getIntConvert("charismaEXP", monsterInfoData, 0));
            stats.setChangeableMob(MapleDataTool.getIntConvert("changeableMob", monsterInfoData, 0) == 1);
            stats.setMad(MapleDataTool.getIntConvert("MADamage", monsterInfoData, 0));
            stats.setPad(MapleDataTool.getIntConvert("PADamage", monsterInfoData, 0));
            stats.setAcc(MapleDataTool.getIntConvert("acc", monsterInfoData, 0));
            stats.setSpeed(MapleDataTool.getIntConvert("speed", monsterInfoData, 0));
            if (MapleDataTool.getLongConvert("finalmaxHP", monsterInfoData) > 0L) {
                stats.setHp(stats.getHp() + MapleDataTool.getLongConvert("finalmaxHP", monsterInfoData));
            }
            if (stats.getLevel() > 15) {
                if (!stats.isBoss()) {
                    stats.setPDRate((byte) (MapleDataTool.getIntConvert("PDRate", monsterInfoData, 0)));
                    stats.setMDRate((byte) (MapleDataTool.getIntConvert("MDRate", monsterInfoData, 0)));
                } else {
                    stats.setPDRate((byte) (MapleDataTool.getIntConvert("PDRate", monsterInfoData, 0)));
                    stats.setMDRate((byte) (MapleDataTool.getIntConvert("MDRate", monsterInfoData, 0)));
                }
            } else {
                stats.setPDRate((byte) MapleDataTool.getIntConvert("PDRate", monsterInfoData, 0));
                stats.setMDRate((byte) MapleDataTool.getIntConvert("MDRate", monsterInfoData, 0));
            }
            final MapleData selfd = monsterInfoData.getChildByPath("selfDestruction");
            if (selfd != null) {
                stats.setSelfDHP(MapleDataTool.getIntConvert("hp", selfd, 0));
                stats.setSelfD((byte) MapleDataTool.getIntConvert("action", selfd, -1));
            } else {
                stats.setSelfD((byte) -1);
            }

            final MapleData firstAttackData = monsterInfoData.getChildByPath("firstAttack");
            if (firstAttackData != null) {
                if (firstAttackData.getType() == MapleDataType.FLOAT) {
                    stats.setFirstAttack(Math.round(MapleDataTool.getFloat(firstAttackData)) > 0);
                } else {
                    stats.setFirstAttack(MapleDataTool.getInt(firstAttackData) > 0);
                }
            }
            if (stats.isBoss() || isDmgSponge(mid)) {
                if (monsterInfoData.getChildByPath("hpTagColor") == null
                        || monsterInfoData.getChildByPath("hpTagBgcolor") == null) {
                    stats.setTagColor(0);
                    stats.setTagBgColor(0);
                } else {
                    stats.setTagColor(MapleDataTool.getIntConvert("hpTagColor", monsterInfoData));
                    stats.setTagBgColor(MapleDataTool.getIntConvert("hpTagBgcolor", monsterInfoData));
                }
            }

            final MapleData banishData = monsterInfoData.getChildByPath("ban");
            if (banishData != null) {
                stats.setBanishInfo(new BanishInfo(MapleDataTool.getString("banMsg", banishData),
                        MapleDataTool.getInt("banMap/0/field", banishData, -1),
                        MapleDataTool.getString("banMap/0/portal", banishData, "sp")));
            }

            final MapleData reviveInfo = monsterInfoData.getChildByPath("revive");
            if (reviveInfo != null) {
                List<Integer> revives = new LinkedList<>();
                for (MapleData bdata : reviveInfo) {
                    revives.add(MapleDataTool.getInt(bdata));
                }
                stats.setRevives(revives);
            }

            final MapleData monsterSkillData = monsterInfoData.getChildByPath("skill");
            if (monsterSkillData != null) {
                int i = 0;
                List<Pair<Integer, Integer>> skills = new ArrayList<>();
                while (monsterSkillData.getChildByPath(Integer.toString(i)) != null) {
                    skills.add(new Pair<>(MapleDataTool.getInt(i + "/skill", monsterSkillData, 0),
                            MapleDataTool.getInt(i + "/level", monsterSkillData, 0)));
                    if (MapleDataTool.getInt(i + "/afterAttack", monsterSkillData, -1) != -1) {
                        stats.addAfterAttack(skills.get(i).left, skills.get(i).right,
                                MapleDataTool.getInt(i + "/afterAttack", monsterSkillData, -1));
                    }
                    if (MapleDataTool.getInt(i + "/skillAfter", monsterSkillData, -1) != -1) {
                        stats.addSkillAfter(skills.get(i).left, skills.get(i).right,
                                MapleDataTool.getInt(i + "/skillAfter", monsterSkillData, -1));
                    }

                    i++;
                }
                stats.setSkills(skills);
            }

            final MapleData monsterAttackData = monsterInfoData.getChildByPath("attack");
            if (monsterAttackData != null) {
                int i = 0;
                List<MobAttack> attacks = new ArrayList<>();
                while (monsterAttackData.getChildByPath(Integer.toString(i)) != null) {
                    MobAttack attack = new MobAttack(MapleDataTool.getInt(i + "/action", monsterAttackData, -1),
                            MapleDataTool.getInt(i + "/afterAttack", monsterAttackData, -1),
                            MapleDataTool.getInt(i + "/fixAttack", monsterAttackData, -1),
                            MapleDataTool.getInt(i + "/onlyAfterAttack", monsterAttackData, -1),
                            MapleDataTool.getInt(i + "/cooltime", monsterAttackData, -1));
                    if (monsterAttackData.getChildByPath(i + "/callSkill") != null) {
                        MapleData callSkillData = monsterAttackData.getChildByPath(i + "/callSkill");
                        int j = 0;
                        while (callSkillData.getChildByPath(String.valueOf(j)) != null) {
                            MapleData callSkillIdxData = callSkillData.getChildByPath(String.valueOf(j));
                            attack.addSkill(MapleDataTool.getInt("skill", callSkillIdxData, 0),
                                    MapleDataTool.getInt("level", callSkillIdxData, 0));
                            j++;
                        }
                    }
                    attacks.add(attack);
                    i++;
                }
                stats.setAttacks(attacks);
            }
            

            final MapleData monsterHitParts = monsterData.getChildByPath("HitParts");
            if (monsterHitParts != null) {
                for (MapleData hitPart : monsterHitParts.getChildren()) {
                    stats.addHitPart(hitPart.getName());
                }
            }

            decodeElementalString(stats, MapleDataTool.getString("elemAttr", monsterInfoData, ""));

            // Other data which isn;t in the mob, but might in the linked data
            final int link = MapleDataTool.getIntConvert("link", monsterInfoData, 0);
            stats.setInvincible(MapleDataTool.getIntConvert("invincible", monsterInfoData, 0) == 1);

            if (link != 0) { // Store another copy, for faster processing.
                monsterData = data.getData(StringUtil.getLeftPaddedStr(link + ".img", '0', 11));
                monsterInfoData = monsterData.getChildByPath("info");
            }
            stats.setLink(link);

            label:
            for (MapleData idata : monsterData) {
                switch (idata.getName()) {
                    case "fly":
                        stats.setFly(true);
                        stats.setMobile(true);
                        break label;
                    case "move":
                        stats.setMobile(true);
                        break;
                    case "invincible":
                        stats.setInvincible(true);
                        break;
                }
            }

            byte hpdisplaytype = -1;
            if (!stats.isInvincible()) {
                if (stats.getTagColor() > 0) {
                    hpdisplaytype = 0;
                } else if (stats.isFriendly()) {
                    hpdisplaytype = 1;
                } else if (mid >= 9300184 && mid <= 9300215) { // Mulung TC mobs
                    hpdisplaytype = 2;
                } else if (!stats.isBoss()
                        || // Not boss
                        (mid >= 9800000 && mid <= 9800124)
                        || // Monster Park
                        (mid >= 9302044 && mid <= 9302048)) { // Aswan
                    hpdisplaytype = 3;
                }
            }
            
            
            // Bosses HP
            // New Boss System
            /* Green Side Start */
            if (mid == 8800102){ // Chaos Zakum 1.00 Trillion
                stats.setHp(1000000000000L);
            }
            /* Horntail Start */ 
            if (mid == 8810102) { // Chaos Horntail Left Head 300 Billion
                stats.setHp(300000000000L);
            }
            if (mid == 8810103) { // Chaos Horntail Mid Head 400 Billion
                stats.setHp(400000000000L);
            }
            if (mid == 8810104) { // Chaos Horntail Right Head 300 Billion
                stats.setHp(300000000000L);
            }
            if (mid == 8810105) { // Chaos Horntail Left Hand 150 Billion
                stats.setHp(150000000000L);
            }
            if (mid == 8810106) { // Chaos Horntail Right Hand 150 Billion
                stats.setHp(150000000000L);
            }
            if (mid == 8810107) { // Chaos Horntail Wings  200 Billion
                stats.setHp(200000000000L);
            }
            if (mid == 8810108) { // Chaos Horntail Bottom Part 200 Billion
                stats.setHp(300000000000L);
            }
            if (mid == 8810109) { // Chaos Horntail Tail 200 Billion
                stats.setHp(200000000000L);
            }
            if (mid == 8810122) { // Chaos Horntail Corp 3 Trillion Total
                stats.setHp(3000000000000L);
            }
            
            
            /* Horntail End */
            if (mid == 9101078) { // Fire Wolf 5 Trillion
                stats.setHp(5000000000000L);
            }
            /* Green Side End */
            
            /* Blue Side Start */
            if (mid == 8870000) { // Hilla 10.0 Trillion
                stats.setHp(10000000000000L);
            }
            if (mid == 8840000) { // Von Leon 25.0 Trillion
                stats.setHp(25000000000000L);
            }
                
            if (mid == 8860000) { //Arkarium 50 trillion
                stats.setHp(50000000000000L);
            } 
            if (mid == 8850011) { // Cygnus  100 Trillion
                stats.setHp(100000000000000L);
            }
            if (mid == 8880000) { //Magnus 180 trillion
                stats.setHp(180000000000000L);
            }  
            if (mid == 8880200) { // Omni-Cln  250 Trillion
                stats.setHp(250000000000000L);
            }
            if (mid == 8820210) { // Pink Bean 100 Trillion
                stats.setHp(100000000000000L);
            }
            if (mid == 8820211) { // Pink Bean 2 125 Trillion
                stats.setHp(125000000000000L);
            }
            if (mid == 8820212) { // Pink Bean 3 175 Trillion
                stats.setHp(175000000000000L);
            }
            // Total Pink 400 Trillion
            /* Blue Side End */
            
            /* Red Side Start */
            if (mid == 8900000) { //Chaos Pierre 600 Trillion
                stats.setHp(600000000000000L);
            }   
            if (mid == 8910000) { // Chaos Von Bon 750 Trillion
                stats.setHp(750000000000000L);
            } 
            if (mid == 8920000) { //Chaos Queen 900 Trillion
                stats.setHp(900000000000000L);
            }
            if (mid == 8930000) { //Chaos Vellum 1.2 Quadrillion
                stats.setHp(1200000000000000L);
            }
            /* Red Side End */
            
            /* Pink Side Start */
            if (mid == 9801028) { // Lotus 1 phase 800 Trillion
                stats.setHp(800000000000000L);
            }      
            if (mid == 9801029) { // Lotus phase 2 1.2 Quadrillion
                stats.setHp(1200000000000000L);
            }
            // Total Lotus 2.0 Quadrillion
            
            if (mid == 9300890) { //Damien 1.1 Quadrillion
                stats.setHp(1100000000000000L);
            }
            if (mid == 8880131) { //Damien 2 2.4 Quadrillion
                stats.setHp(2400000000000000L);
            }
            // Total Damien 3.5 Quadrillion
            
            if (mid == 8880140) { //Lucid 1 2.0 Quadrillion
                stats.setHp(2000000000000000L);
            }      
            if (mid == 8880150) { //Lucid II Phase 6 3 Quadrillion
                stats.setHp(3000000000000000L);
            }
            // Total Lucid 5 Quadrillion
            
            if (mid == 9309207) { //Dorothy's Welcome 6.5 Quadrillion
                stats.setHp(6500000000000000L);
            }
            if (mid == 9440025) { // Cross 8 Quadrillion
                stats.setHp(8000000000000000L);
            }   
            if (mid == 8500001) { //Papulatus's 4.5 Quadrillion
                stats.setHp(4500000000000000L);
            }      
            if (mid == 8500002) { //Papulatus 2 5.5 Quadrillion
                stats.setHp(5500000000000000L);
            }
            // Total Papulatus 10 Quadrillion
            
            /* Pink Side End */
            
            /* Purple Side Start */
            if (mid == 8880301) { //Will 1 Phase 20
                stats.setHp(5000000000000000L); // 5 Quadrillion
            }
            if (mid == 8880302) { //Will 2 Phase 40
                stats.setHp(10000000000000000L); // 10 Quadrillion
            }
            // Total Will 15 Quadrillion
            
            if (mid == 6500001) { //Jin Hilla  20 Quadrillion
                stats.setHp(20000000000000000L);
            }
            if (mid == 8880502) { //Black Wizard-Page 1 10 Quadrillion
                stats.setHp(10000000000000000L);
            }      
            if (mid == 8880503) { //Black Wizard-page 2 20 Quadrillion
                stats.setHp(20000000000000000L);
            }
            
            // Total Black Mage 1.2 Quintillion
            
            if (mid == 9999991) { //Jinhilla Hand 700
                stats.setHp(7000000000000000000L);
                  hpdisplaytype = 1;
            }      
            if (mid == 9999992) { //Jinhilla Hand 700
                stats.setHp(7000000000000000000L);
                  hpdisplaytype = 1;
            }   
            /* Purple Side End */
            
            //Zerkobos
            if (mid == 5220002) { //Faust 200 billion
                stats.setHp(200000000000L);
            }
            if (mid == 5220000) { //King Krang 400 billion
                stats.setHp(400000000000L);
            }
            if (mid == 9300119) { //Debzone 700 billion
                stats.setHp(700000000000L);
            }      
            if (mid == 8300006) { //Dragonica 1.2 trillion
                stats.setHp(1200000000000L);
            }
            if (mid == 8300007) { //Dragon Rider 1.4 trillion
                stats.setHp(1400000000000L);
            }      
            if (mid == 9309205) { //Tin Woodman 2.0 trillion
                stats.setHp(2000000000000L);
            }
            if (mid == 9309208) { //Dorothy's Welcome 3.4 trillion
                stats.setHp(3400000000000L);
            }
            if (mid == 8220011) { //Aufheven 4,600 billion
                stats.setHp(4600000000000L);
            }
            
            
            //Treasure Boss
            
            if (mid == 9390710) { //Grassland bull 300 Trillion
                stats.setHp(300000000000000L);
            }      
            if (mid == 9390711) { //Skeleton Centipede 660 Trillion
                stats.setHp(660000000000000L);
            }
            if (mid == 9390712) { //Grassland reaper 1020 Trillion
                stats.setHp(1020000000000000L);
            }      
            if (mid == 8220003) { //Sea Dragon 1740
                stats.setHp(1740000000000000L);
            }
            if (mid == 2600800) { //Legionmaster Will 2700
                stats.setHp(2700000000000000L);  //HP Dam
            }    
            if (mid == 8644011) { //3,300 trillion elements of deterioration
                stats.setHp(3300000000000000L);
            }      
            

            stats.setHPDisplayType(hpdisplaytype);

            monsterStats.put(mid, stats);
        }
        return new MapleMonster(mid, stats);
    }
    /*                stats.setTagColor(10);
                stats.setTagBgColor(9);                    
*/

    public static void decodeElementalString(MapleMonsterStats stats, String elemAttr) {
        for (int i = 0; i < elemAttr.length(); i += 2) {
            stats.setEffectiveness(Element.getFromChar(elemAttr.charAt(i)),
                    ElementalEffectiveness.getByNumber(Integer.parseInt(String.valueOf(elemAttr.charAt(i + 1)))));
        }
    }

    private static boolean isDmgSponge(final int mid) {
        switch (mid) {
            case 8810018:
            case 8810118:
            case 8810119:
            case 8810120:
            case 8810121:
            case 8810122:
            case 8820010:
            case 8820011:
            case 8820012:
            case 8820013:
            case 8820014:
            case 8820110:
            case 8820111:
            case 8820112:
            case 8820113:
            case 8820114:
                return true;
        }
        return false;
    }

    public static MapleNPC getNPC(final int nid) {
        final String name = MapleDataTool.getString(nid + "/name", npcStringData, "MISSINGNO");
        return new MapleNPC(nid, new MapleNPCStats(name));
    }

    public static MaplePlayerNPC getPlayerNPC(final int nid) {
        MapleNPCStats stats = new MapleNPCStats("");
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM `playernpcs` WHERE id = " + nid);
            rs = ps.executeQuery();
            rs.next();
            stats.setCY(rs.getInt("y"));
            stats.setName(rs.getString("name"));
            stats.setFH(0);
            stats.setRX0(rs.getInt("x") - 50);
            stats.setRX1(rs.getInt("x") + 50);
            // System.out.println("x : "+rs.getInt("x")+" y : "+rs.getInt("y")+" name :
            // "+rs.getString("name")+" hair : "+rs.getInt("hair")+" face :
            // "+rs.getInt("face")+" skin : "+rs.getByte("skin")+" dir :
            // "+rs.getByte("dir"));
            // System.out.println("x : "+(npc.getRx0() + 50)+" y : "+npc.getCy()+" name :
            // "+npc.getName()+" hair : "+npc.getHair()+" face : "+npc.getFace()+" skin :
            // "+npc.getSkin()+" dir : "+npc.getDirection());

            // System.out.println("Equip Size : "+equips.size());
            MaplePlayerNPC npc = new MaplePlayerNPC(nid, stats);
            npc.setHair(rs.getInt("hair"));
            npc.setFace(rs.getInt("face"));
            npc.setSkin(rs.getByte("skin"));
            npc.setDirection(rs.getByte("dir"));
            npc.setPosition(new Point(rs.getInt("x"), stats.getCY()));
            ps.close();
            rs.close();
            ps = con.prepareStatement("SELECT * FROM `playernpcs_equip` WHERE npcid = " + nid);
            rs = ps.executeQuery();
            Map<Byte, Integer> equips = new LinkedHashMap<>();

            while (rs.next()) {
                equips.put(rs.getByte("equippos"), rs.getInt("equipid"));
            }
            npc.setEquips(equips);
            rs.close();
            ps.close();
            con.close();
            return npc;
        } catch (Exception ex) {
            if (!ServerConstants.realese) {
                ex.printStackTrace();
            }
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException ignore) {

            }
        }
        return null;
    }
}
