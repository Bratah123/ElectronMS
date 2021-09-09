# ElectronMS

<img src="https://cdn.discordapp.com/attachments/729217437966270464/793686384387817503/image0.png" width="250" height="250">  

ElectronMS is an open-source project that aims to emulate [KMS v316](https://orangemushroom.net/2019/05/22/kms-ver-1-2-316-16th-anniversary-pt-2-job-balancing) servers.  
This project is currently a Minimum Viable Product - it is plug-n-play, and compatible with a whole suite of other **[TeamSPIRIT](https://github.com/TEAM-SPIRIT-Productions)** products.  
This project is based on AzureMS v316 (see more under AzureMS History below).  


### Compatible Products:  
  - **[Lapis](https://github.com/TEAM-SPIRIT-Productions/Lapis)**  
    - Feature-rich Discord bot   
    - Lightweight and easy to set-up *(see [Wiki](https://github.com/TEAM-SPIRIT-Productions/Lapis/wiki/General-Flow))*  
    - Built on Lazuli (see below)  
  - **[Lazuli](https://github.com/TEAM-SPIRIT-Productions/Lazuli)**  
    - A Python-based API for connecting to AzureMS-based servers.  
    - Easy to use; complete with [example code](https://github.com/TEAM-SPIRIT-Productions/Lazuli/wiki/Sample-Code-Fragments#loading-a-database)!  
  
### Quick Start Reference:  
- ***See the AzureMS [Wiki](https://github.com/SoulGirlJP/AzureV316/wiki/Setup) for a detailed guide (with screenshots).***
- The AzureMS guide should work for this project, given the history of ElectronMS (see below)
- We may choose to write a dedicated wiki at a later time, if there is sufficient demand.

---

## AzureMS History and Affiliations

### Timeline of AzureMS Development
AzureMS is a KMS-based private server that had reached limited success during its v316 phase.  
Despite the intention of making a [WonderKing](https://en.wikipedia.org/wiki/WonderKing_Online)-MapleStory hybrid, this goal was never actually achieved (at least at the time of writing).  

**[SoulGirlJP](https://github.com/SoulGirlJP)** (Discord ID: `SoulGirlJP#7859`; now known as **SoulyHS**), the then owner of AzureMS, initially purchased the source code for a KMS v284 private server (ArielMS) from a server owner-developer **Suho**. Notably, **Suho** helped advertise AzureMS in the ArielMS Discord server, thereby helping to seed AzureMS with some initial players.  

**SoulGirlJP** later went on to purchase a KMS v316 server emulator source code from their Korean contacts (at a significant mark-up) as part of a new source deal. During the v316 phase, there were numerous notable developers that either worked with or mentored **SoulGirlJP**, including (but not limited to) **[Asura](https://github.com/asurarevenge)** (mentor), **[Wolly](https://github.com/itzwolly)** (developer/mentor), **[Brandon](https://github.com/Bratah123)** (developer), **[Dipi](https://github.com/Lior-Dahapour)** (developer), as well as **[Desc](https://github.com/Descended)** (WZ editor/developer).  

Riding on the success of v316, there was interest in upgrading (yet again) to v329. This was in part driven by claims that the new v329 source code would not have the same set of bugs that plagued the v316 project, and in part due to the [release of a new class (Adele) in v329](https://orangemushroom.net/2020/01/15/kms-ver-1-2-329-maplestory-rise-2nd-update-adele). However, the former premise would later turn out to be false, as the v329 source code turned out to be in a worse state than the v316 project. During the closed-beta testing phase the astronomical numbers of breaking issues discovered meant that the team simply could not respond fast enough to keep up (see [here](https://docs.google.com/spreadsheets/d/1ykxVIpnYjzuE1p7letpiLm7RyqhnvrtfQWm5oEIF-c8/edit?usp=sharing) for full bug list). In fact, most of the portals in the game did not even have portal scripts associated with them, leaving players stranded in many maps, and needing to rely on teleport commands/NPCs/rocks to move between maps. The fact that there were developers whose entire job was to deal with these scripts resulted in a number of `PortalScript` inside jokes (in reference to the JavaScript language used for writing these portal scripts). In this phase, the team grew even larger, with **Rob** (Discord ID: `Min#4235`) and **Anxiety** (Discord ID: `Anxiety#7971`) helping out as well.  
<img src="https://cdn.discordapp.com/emojis/787168710074695761.png?v=1" width="32" height="32">  

At this point, **SoulGirlJP** (who thought the v329 source was too buggy to be worth the fixes) decided to switch gears, and attempted to create a v337 source from scratch with **Dipi**, whilst **Brandon**/**Desc**/**Rob** were handling the v329 project. However, this turned out to be too difficult at the time, due to changes in KMS authentication system in v337. This caused development to return to a v329-focus, until **SoulGirlJP** managed to nail the new authentication system, with the help of various different industry contacts.  

After sorting out the new authentication, **SoulGirlJP** set sights on v342, since that was the release of a new class: [Kain](https://orangemushroom.net/2021/01/06/kms-ver-1-2-341-maplestory-neo-chaser-of-darkness-kain/).  

Soon after starting the upgrade towards v342, **SoulGirlJP** decided to migrate versions again, due to the new content that was slated to come in the subsequent v343 patch: [Hotel Arc](https://orangemushroom.net/2021/01/27/kms-ver-1-2-343-maplestory-neo-hotel-arcs/).  

Some time later with v343 still not ready for testing, **SoulGirlJP** elected to upgrade yet again - this time for a new class, [Lara](https://orangemushroom.net/2021/07/14/kms-ver-1-2-351-maple-live-romantic-geomancer-lara/), which was released in v351. **SoulGirlJP** chose [v352](https://orangemushroom.net/2021/08/11/kms-ver-1-2-352-maple-live-guardian-angel-slime/) this time, which was the last of the **Maple LIVE** trilogy of updates (which contained Lara-related content). This is the version that AzureMS is currently at (at the time of writing), and they are expected to conduct pre-Alpha testing on the 1st of October 2021, marking the first time that AzureMS is re-opening to the public since its v316 days.  

```
Timeline: 284 -> 316 -> 329 -> 337 -> 329 -> 342 -> 343 -> 352  
```
*Note: There was a brief period of v334 development but it was short-lived, without significant surviving documentation, and is thus left out of this timeline sequence.*


### SoulGirlJP
A KMS-enthusiast who sought to revive their favourite game ([WonderKing](https://en.wikipedia.org/wiki/WonderKing_Online)) through the graphical assets of [MapleStory](https://en.wikipedia.org/wiki/MapleStory), despite not speaking any Korean. Although not formally trained in computation (at the time of writing), **SoulGirlJP** learnt to develop MapleStory private server emulators under the tutelage of the well-known developer **Asura** (of [Swordie](https://bitbucket.org/swordiemen/swordie/src/master/) fame). **SoulGirlJP** can often be seen commenting in various MapleStory private server development forums, including *[RaGEZONE](https://forum.ragezone.com/f425)*, *[Swordie](https://discord.gg/MMN4RERbYR)*'s `#server-development` channel, the *MapleStory Development* Discord server, as well as the *M. Development C.* Discord server.

### Azure v316
After numerous discussions with **Brandon** about going open-source, **SoulGirlJP** finally made an [announcement on RaGEZONE](https://forum.ragezone.com/f427/azurems-v316-kms-source-1188071) on the 9th of September 2020 about going open-source with Azure v316. However, contrary to expectations, [the version released](https://github.com/SoulGirlJP/AzureV316) was an early build of the project, and did not include many of the fixes/features that came later. When quized about this, **SoulGirlJP** gave markedly different explanations on different occasions - as such the actual reason behind this is not well understood (at the time of writing).  
It should be noted that many of the contributors (including **Brandon**, **Desc**, and **[KOOKIIE](https://github.com/KOOKIIEStudios)**) have had their permissions revoked, and can no longer update/maintain the project (see [here](https://github.com/SoulGirlJP/AzureV316/issues/13) where **KOOKIIE** posted an issues post WRT to outdated docs, alongside all changes that needed to be made in order to remedy the situation). In July 2021, **SoulGirlJP** expressed that the project is abandoned, and that "nobody was really contributing to it". It should be safe to hence consider this a dead project.  

### Duck's Restoration Project
**[A_Duck](https://www.twitch.tv/a_real_duck)** (also known as **a_real_duck** or **Dylan**) [forked](https://github.com/ARealDuck/AzureV316-Resoration-project) **SoulGirlJP**'s open-source repository on the 18th of March 2021. **Dylan** thoroughly enjoyed the AzureMS v316 experience and thought it was a shame that it was discontinued. This inspired him to attempt to re-create AzureMS v316. Ex-Azure staff were supportive of this move. Noting his desire to have all the Korean text in-game replaced with English translations, **KOOKIIE** generated [a set of reference files highlighting all files that contain Korean characters in the repository (along with their line numbers)](https://github.com/KOOKIIEStudios/ARP_non_ascii), to simplify **Dylan**'s workload. This was because the AzureMS source code used large `.java` classes spanning several thousands (if not tens of thousands) of lines of code each - manually checking for Korean text would have been a gargantuan task in and of itself. Nonethess, **Dylan** ended up being tied down by real life commitments, and ended up not making much progress with the project (at the time of writing).  

### ElectronMS
This project is based on (a snapshot of) a later build of AzureMS v316 than the official open-source repository made available by **SoulGirlJP**. This includes many of the fixes and feature updates that were the work of the other developers of the time, like **Brandon**, **Dipi**, and **Desc**. Considering that the v316 source is no longer in use, and that **SoulGirlJP** has other ideas in mind with AzureMS v352, **Brandon** thought it would be too much of a waste that the work of these Azure/ex-Azure developers never saw light of day (just like **Desc**'s work of replacing all Korean text in the WZ files with English translations, which never ended up being used by **SoulGirlJP**).  
Note that most of the original commit logs are now lost, as the original repository was host on BitBucket - access to which has since been restricted.  
What this means is that this repository is a more complete product than both [**SoulGirlJP**'s repository](https://github.com/SoulGirlJP/AzureV316), and [**Duck**'s fork](https://github.com/ARealDuck/AzureV316-Resoration-project) - albeit not likely to be translated to English by its maintainers.  
Unlike the official open-source repository made available by **SoulGirlJP**, this is not an "abandoned" project, and will continue to receive support from its maintainers for the forseeable future.  

### Parallels with TomatoMS
Azure v316 and v329 were based on commercially-available projects, sold by Korean developers. Whilst TomatoMS staff were using certain tools built for/by Azure/**SoulGirlJP**, there is no other evidence to suggest any relationship or plagiarism between them, since TomatoMS could well have just purchased the source code and/or tools. TomatoMS staff did, however, consult with Azure/ex-Azure staff like **Brandon** and attempt to solicit code (e.g. via interview scams) - as much as their owner would like to sweep these incidents under the rug. Granted, Tomato claims that these actions by individual members of their staff do not reflect their team.

### Team SPIRT
[Team SPIRIT](https://github.com/TEAM-SPIRIT-Productions) is a group of developers comprising largely of ex-Azure staff who are/were computing majors.  
For a period of time, they were actively contributing to the open-source AzureMS v316 repository (despite having started their own non-KMS server), either in code or in documentation. This ended, however, when **SoulGirlJP** revoked their permissions, despite them being the main contributors and maintainers of the repository. This move was never publicly explained nor acknowledged by **SoulGirlJP**.  
*Contrary to popular belief, **SoulGirlJP** did NOT teach these developers everything they know.*

---

## Features:
- **Custom NPCs**
  - **Cash NPC**: allows searching for cash equipment via keyword - accessible in lobby (`@town`)
  - **Statted Cash NPC**: Similar to cash NPC, but consumes JCoins - accessible in boss lobby (`@boss`)
  - **Warp NPC** - accessible in lobby (`@town`)
  - **Shops**: Class equipment shops, Lionheart EQ shop, Consumables shop, etc. - accessible in custom menu
  - **Meso Exchange**: buys STs from players for meso. - accessible in lobby (`@town`)
  - **Blue Orb shop** - accessible in lobby (`@town`)
  - **Pet Shop**: (Orchid) sells permanent pet and pet equipment for Purple Orbs. - accessible in lobby (`@town`)
  - **Styler** - accessible in lobby (`@town`)
  - **DPM tester** - accessible in lobby (`@town`)
  - **Jump Quest NPC** - accessible in lobby (`@town`)
  - **DP and VP shop** - accessible in lobby (`@town`)
  - **Item Transfer NPC (Duey)** - accessible in lobby (`@town`)
  - **Cash equipment disposal NPC** - accessible in lobby (`@town`)
  - **And more!**
- **Custom Menu** - accessible via the grave key \`
- **Additonal Damage system**
- **Rebirth System** - with rewards and shop
- **Custom Currency** - Blue and Purple orbs, Justice Coins, etc.
- **Custom Bossing system**
- **Universal Smega**: use a Tilda at the start of a message in the chatbox to send a smega
- **Auto-registration**
- **Hashed passwords** - oh you'd be surprised.

---

### Disclaimer:  
*ElectronMS is an open-source third-party implementation of a particular MapleStory server emulation project ([AzureMSv316](https://github.com/SoulGirlJP/AzureV316)). ElectronMS is non-monetised, provided as is, and is unaffiliated with NEXON. Every effort has been taken to ensure correctness and reliability of ElectronMS. We will not be liable for any special, direct, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action if contract, negligence or other tortious action, arising out of or in connection with the use of ElectronMS (in part or in whole).*