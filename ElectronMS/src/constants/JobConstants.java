package constants;

import java.util.HashMap;
import java.util.Map;
import client.Character.MapleCharacter;

public class JobConstants {
    // @author Desc / Akshay / Desc#0416
    // sc: akshayjankie

    // Beginner
    public final static short BEGINNER = 0;

    // Hero
    public final static short WARRIOR = 100;
    public final static short FIGHTER = 110;
    public final static short CRUSADER = 111;
    public final static short HERO = 112;

    // Paladin
    public final static short PAGE = 120;
    public final static short WHITE_KNIGHT = 121;
    public final static short PALADIN = 122;

    // Dark Knight
    public final static short SPEARMAN = 130;
    public final static short DRAGON_KNIGHT = 131;
    public final static short DARK_KNIGHT = 132;

    // Dawn Warrior
    public final static short DAWN_WARRIOR_I = 1100;
    public final static short DAWN_WARRIOR_II = 1110;
    public final static short DAWN_WARRIOR_III = 1111;
    public final static short DAWN_WARRIOR_IIII = 1112;

    // Blaze Wizard
    public final static short BLAZE_WIZARD_I = 1200;
    public final static short BLAZE_WIZARD_II = 1210;
    public final static short BLAZE_WIZARD_III = 1211;
    public final static short BLAZE_WIZARD_IIII = 1212;

    // Wind Archer
    public final static short WIND_ARCHER_I = 1300;
    public final static short WIND_ARCHER_II = 1310;
    public final static short WIND_ARCHER_III = 1311;
    public final static short WIND_ARCHER_IIII = 1312;

    // Night Walker
    public final static short NIGHT_WALKER_I = 1400;
    public final static short NIGHT_WALKER_II = 1410;
    public final static short NIGHT_WALKER_III = 1411;
    public final static short NIGHT_WALKER_IIII = 1412;

    // Thunder Breaker
    public final static short THUNDER_BREAKER_I = 1500;
    public final static short THUNDER_BREAKER_II = 1510;
    public final static short THUNDER_BREAKER_III = 1511;
    public final static short THUNDER_BREAKER_IIII = 1512;

    // Magician (F/P)
    public final static short MAGICIAN = 200;
    public final static short FIRE_POISON_I = 210;
    public final static short FIRE_POISON_II = 211;
    public final static short FIRE_POISON_III = 212;

    // Magician (I/L)
    public final static short ICE_LIGHTNING_I = 220;
    public final static short ICE_LIGHTNING_II = 221;
    public final static short ICE_LIGHTNING_III = 222;

    // Bishop
    public final static short CLERIC = 230;
    public final static short PRIEST = 231;
    public final static short BISHOP = 232;

    // Aran
    public final static short ARAN_I = 2100;
    public final static short ARAN_II = 2110;
    public final static short ARAN_III = 2111;
    public final static short ARAN_IIII = 2112;

    // Evan
    public final static short EVAN_I = 2200;
    public final static short EVAN_II = 2210;
    public final static short EVAN_III = 2211;
    public final static short EVAN_IIII = 2212;
    public final static short EVAN_V = 2213;
    public final static short EVAN_VI = 2214;
    public final static short EVAN_VII = 2215;
    public final static short EVAN_VIII = 2216;
    public final static short EVAN_IX = 2217;
    public final static short EVAN_X = 2218;

    // Mercedes
    public final static short MERCEDES_I = 2300;
    public final static short MERCEDES_II = 2310;
    public final static short MERCEDES_III = 2311;
    public final static short MERCEDES_IIII = 2312;

    // Phantom
    public final static short PHANTOM_I = 2400;
    public final static short PHANTOM_II = 2410;
    public final static short PHANTOM_III = 2411;
    public final static short PHANTOM_IIII = 2412;

    // Luminous
    public final static short LUMINOUS_I = 2700;
    public final static short LUMINOUS_II = 2710;
    public final static short LUMINOUS_III = 2711;
    public final static short LUMINOUS_IIII = 2712;

    // Archer
    public final static short ARCHER = 300;
    public final static short HUNTER = 310;
    public final static short RANGER = 311;
    public final static short BOWMASTER = 312;

    // Allows conversion from (Short) ID to (String) Job Name
    // Contains all known classes including GMS exclusives (for posterity)
    public static final Map<Short, String> jobName = new HashMap<Short, String>(){{
        put(BEGINNER, "Beginner");

        put(WARRIOR, "Warrior");
        put(FIGHTER, "Fighter");
        put(CRUSADER, "Crusader");
        put(HERO, "Hero");
        put(PAGE, "Page");
        put(WHITE_KNIGHT, "White Knight'");
        put(PALADIN, "Paladin");
        put(SPEARMAN, "Spearman");
        put(DRAGON_KNIGHT, "Dragon Knight'");
        put(DARK_KNIGHT, "Dark Knight");

        put(MAGICIAN, "Magician");
        put(FIRE_POISON_I, "Fire/Poison Wizard");
        put(FIRE_POISON_II, "Fire/Poison Mage");
        put(FIRE_POISON_III, "Fire/Poison Archmage");
        put(ICE_LIGHTNING_I, "Ice/Lightning Wizard");
        put(ICE_LIGHTNING_II, "Ice/Lightning Mage");
        put(ICE_LIGHTNING_III, "Ice/Lightning Archmage");
        put(CLERIC, "Cleric");
        put(PRIEST, "Priest");
        put(BISHOP, "Bishop");

        put(ARCHER, "Archer");
        put(HUNTER, "Hunter");
        put(RANGER, "Ranger");
        put(BOWMASTER, "Bowmaster");
        put((short) 320, "Cross Bowman");
        put((short) 321, "Sniper");
        put((short) 322, "Marksman");
        put((short) 301, "Pathfinder");
        put((short) 330, "Pathfinder");
        put((short) 331, "Pathfinder");
        put((short) 332, "Pathfinder");

        put((short) 400, "Rogue");
        put((short) 410, "Assassin");
        put((short) 411, "Hermit");
        put((short) 412, "Night Lord");
        put((short) 420, "Bandit");
        put((short) 421, "Chief Bandit");
        put((short) 422, "Shadower");
        put((short) 430, "Blade Recruit");
        put((short) 431, "Blade Acolyte");
        put((short) 432, "Blade Specialist");
        put((short) 433, "Blade Lord");
        put((short) 434, "Blade Master");

        put((short) 500, "Pirate");
        put((short) 510, "Brawler");
        put((short) 511, "Marauder");
        put((short) 512, "Buccaneer");
        put((short) 520, "Gunslinger");
        put((short) 521, "Outlaw");
        put((short) 522, "Corsair");
        put((short) 501, "Cannon Shooter");
        put((short) 530, "Cannoneer");
        put((short) 531, "Cannon Trooper");
        put((short) 532, "Cannon Master");
        put((short) 508, "Jett");
        put((short) 570, "Jett");
        put((short) 571, "Jett");
        put((short) 572, "Jett");

        put((short) 1000, "Noblesse");
        put(DAWN_WARRIOR_I, "Dawn Warrior");
        put(DAWN_WARRIOR_II, "Dawn Warrior");
        put(DAWN_WARRIOR_III, "Dawn Warrior");
        put(DAWN_WARRIOR_IIII, "Dawn Warrior");
        put(BLAZE_WIZARD_I, "Blaze Wizard");
        put(BLAZE_WIZARD_II, "Blaze Wizard");
        put(BLAZE_WIZARD_III, "Blaze Wizard");
        put(BLAZE_WIZARD_IIII, "Blaze Wizard");
        put(WIND_ARCHER_I, "Wind Archer");
        put(WIND_ARCHER_II, "Wind Archer");
        put(WIND_ARCHER_III, "Wind Archer");
        put(WIND_ARCHER_IIII, "Wind Archer");
        put(NIGHT_WALKER_I, "Night Walker");
        put(NIGHT_WALKER_II, "Night Walker");
        put(NIGHT_WALKER_III, "Night Walker");
        put(NIGHT_WALKER_IIII, "Night Walker");
        put(THUNDER_BREAKER_I, "Thunder Breaker");
        put(THUNDER_BREAKER_II, "Thunder Breaker");
        put(THUNDER_BREAKER_III, "Thunder Breaker");
        put(THUNDER_BREAKER_IIII, "Thunder Breaker");

        put((short) 2000, "Aran");
        put(ARAN_I, "Aran");
        put(ARAN_II, "Aran");
        put(ARAN_III, "Aran");
        put(ARAN_IIII, "Aran");
        put((short) 2001, "Evan");
        put(EVAN_I, "Evan");
        put(EVAN_II, "Evan");
        put(EVAN_III, "Evan");
        put(EVAN_IIII, "Evan");
        put(EVAN_V, "Evan");
        put(EVAN_VI, "Evan");
        put(EVAN_VII, "Evan");
        put(EVAN_VIII, "Evan");
        put(EVAN_IX, "Evan");
        put(EVAN_X, "Evan");
        put((short) 2002, "Mercedes");
        put(MERCEDES_I, "Mercedes");
        put(MERCEDES_II, "Mercedes");
        put(MERCEDES_III, "Mercedes");
        put(MERCEDES_IIII, "Mercedes");
        put((short) 2003, "Phantom");
        put(PHANTOM_I, "Phantom");
        put(PHANTOM_II, "Phantom");
        put(PHANTOM_III, "Phantom");
        put(PHANTOM_IIII, "Phantom");
        put((short) 2005, "Shade");
        put((short) 2500, "Shade");
        put((short) 2510, "Shade");
        put((short) 2511, "Shade");
        put((short) 2512, "Shade");
        put((short) 2004, "Luminous");
        put(LUMINOUS_I, "Luminous");
        put(LUMINOUS_II, "Luminous");
        put(LUMINOUS_III, "Luminous");
        put(LUMINOUS_IIII, "Luminous");

        put((short) 3000, "Citizen");
        put((short) 3001, "Demon");
        put((short) 3100, "Demon Slayer");
        put((short) 3110, "Demon Slayer");
        put((short) 3111, "Demon Slayer");
        put((short) 3112, "Demon Slayer");
        put((short) 3101, "Demon Avenger");
        put((short) 3120, "Demon Avenger");
        put((short) 3121, "Demon Avenger");
        put((short) 3122, "Demon Avenger");

        put((short) 3200, "Battle Mage");
        put((short) 3210, "Battle Mage");
        put((short) 3211, "Battle Mage");
        put((short) 3212, "Battle Mage");
        put((short) 3300, "Wild Hunter");
        put((short) 3310, "Wild Hunter");
        put((short) 3311, "Wild Hunter");
        put((short) 3312, "Wild Hunter");
        put((short) 3500, "Mechanic");
        put((short) 3510, "Mechanic");
        put((short) 3511, "Mechanic");
        put((short) 3512, "Mechanic");
        put((short) 3002, "Xenon");
        put((short) 3600, "Xenon");
        put((short) 3610, "Xenon");
        put((short) 3611, "Xenon");
        put((short) 3612, "Xenon");
        put((short) 3700, "Blaster");
        put((short) 3710, "Blaster");
        put((short) 3711, "Blaster");
        put((short) 3712, "Blaster");

        put((short) 4001, "Hayato");
        put((short) 4100, "Hayato");
        put((short) 4110, "Hayato");
        put((short) 4111, "Hayato");
        put((short) 4112, "Hayato");
        put((short) 4002, "Kanna");
        put((short) 4200, "Kanna");
        put((short) 4210, "Kanna");
        put((short) 4211, "Kanna");
        put((short) 4212, "Kanna");

        put((short) 5000, "Mihile");
        put((short) 5100, "Mihile");
        put((short) 5110, "Mihile");
        put((short) 5111, "Mihile");
        put((short) 5112, "Mihile");

        put((short) 6000, "Kaiser");
        put((short) 6100, "Kaiser");
        put((short) 6110, "Kaiser");
        put((short) 6111, "Kaiser");
        put((short) 6112, "Kaiser");
        put((short) 6001, "Angelic Buster");
        put((short) 6500, "Angelic Buster");
        put((short) 6510, "Angelic Buster");
        put((short) 6511, "Angelic Buster");
        put((short) 6512, "Angelic Buster");
        put((short) 6002, "Cadena");
        put((short) 6400, "Cadena");
        put((short) 6410, "Cadena");
        put((short) 6411, "Cadena");
        put((short) 6412, "Cadena");

        put((short) 10000, "Zero");
        put((short) 10100, "Zero");
        put((short) 10110, "Zero");
        put((short) 10111, "Zero");
        put((short) 10112, "Zero");

        put((short) 11000, "Beast Tamer");
        put((short) 11200, "Beast Tamer");
        put((short) 11210, "Beast Tamer");
        put((short) 11211, "Beast Tamer");
        put((short) 11212, "Beast Tamer");

        put((short) 14000, "Kinesis");
        put((short) 14200, "Kinesis");
        put((short) 14210, "Kinesis");
        put((short) 14211, "Kinesis");
        put((short) 14212, "Kinesis");

        put((short) 15000, "Illium");
        put((short) 15200, "Illium");
        put((short) 15210, "Illium");
        put((short) 15211, "Illium");
        put((short) 15212, "Illium");
        put((short) 15001, "Ark");
        put((short) 15500, "Ark");
        put((short) 15510, "Ark");
        put((short) 15511, "Ark");
        put((short) 15512, "Ark");
        put((short) 15002, "Adele");
        put((short) 15100, "Adele");
        put((short) 15110, "Adele");
        put((short) 15112, "Adele");
        put((short) 15111, "Adele");

        put((short) 16000, "Hoyoung");
        put((short) 16400, "Hoyoung");
        put((short) 16410, "Hoyoung");
        put((short) 16411, "Hoyoung");
        put((short) 16412, "Hoyoung");

        put((short) 800, "Manager");
        put((short) 900, "GM");
        put((short) 910, "Super GM");
        put((short) 9000, "Additional Skills");
        put((short) 40000, "V-Skills");

        put((short) 13000, "Pink Bean");
        put((short) 13100, "Pink Bean");
    }};
}
