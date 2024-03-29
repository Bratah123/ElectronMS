# ElectronMS

![image](https://github.com/Bratah123/ElectronMS/assets/58405975/7e3df0d3-cf1e-4662-8fa6-0f2b9544ca22)
 

ElectronMS is an open-source project that aims to emulate [KMS v316](https://orangemushroom.net/2019/05/22/kms-ver-1-2-316-16th-anniversary-pt-2-job-balancing) servers.  
This project is currently a Minimum Viable Product - it is plug-n-play, and compatible with a whole suite of other **[TeamSPIRIT](https://github.com/TEAM-SPIRIT-Productions)** products.  
This project is based on AzureMS v316 (see more under AzureMS History below).  


### Compatible Products:  
  - **[ElectronClient](https://github.com/Bratah123/ElectronClient)**
    - Open-source project; launcher for ElectronMS, not required for localhost testing
    - Note: Change the IP address in `Constant.cs` to your server IP
  - **[Lapis](https://github.com/TEAM-SPIRIT-Productions/Lapis)**  
    - Feature-rich Discord bot   
    - Lightweight and easy to set-up *(see [Wiki](https://github.com/TEAM-SPIRIT-Productions/Lapis/wiki/General-Flow))*  
    - Built on Lazuli (see below)  
  - **[Lazuli](https://github.com/TEAM-SPIRIT-Productions/Lazuli)**  
    - A Python-based API for connecting to AzureMS-based servers.  
    - Easy to use; complete with [example code](https://github.com/TEAM-SPIRIT-Productions/Lazuli/wiki/Sample-Code-Fragments#loading-a-database)!  
  
### Quick Start Reference:  
- ***See the [Wiki](https://github.com/Bratah123/ElectronMS/wiki/Setup) for a detailed guide (with screenshots).***
- *Note: Most AzureV316 resources should also work for this project, given the history of ElectronMS*
- [Discord Link](https://discord.gg/FJ5aed3Rde) - feel free to join our community if you need any help!

#### About Database Management Systems
*A clarification placed here, since some users seem confused.*
- You may need [WAMP](https://www.wampserver.com/en/)/[XAMP](https://www.apachefriends.org/download.html)/[LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) if you choose to use [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) as your database administration tool.
    - If you choose to use WAMP, you do not need to install MariaDB/MySQL Server separately - they will be installed as part of the WAMP installation process.
    - The ElectronMS Wiki contains only references for WAMP with MySQL Workbench, because that was how the author(s) had their project set up.
- You do *not* need WAMP/XAMP/LAMP, if you choose to use either [MySQL Server](https://dev.mysql.com/downloads/mysql/) (with MySQL Workbench), or, [MariaDB](https://mariadb.org/download/) with HeidiSQL (which is bundled with the Windows version of MariaDB).  

---
## ElectronMS
This project is based on (a snapshot of) a later build of AzureMS v316 than the official open-source repository made available by **SoulGirlJP**. This includes many of the fixes and feature updates that were the work of the other developers of the time, like **Brandon**, **Dipi**, and **Desc**. Considering that the v316 source is no longer in use, and that **SoulGirlJP** has other ideas in mind with AzureMS v352+, **Brandon** thought it would be too much of a waste that the work of these Azure/ex-Azure developers never saw the light of day.  
Note that most of the original commit logs are now lost, as the original repository was hosted on Bitbucket - access to which has since been restricted.  

Most of the code written in ElectronMS is about 2 years old by this point, and from a point when many of AzureMS's developers were still new to programming. Hence, there are many areas with poorly-written code that can and should be optimised by contributors like yourself. Note that this release is purely for educational purposes, as well as the preservation of AzureMS history.

## AzureMS History and Affiliations
- [Who is **SoulGirlJP**?](https://github.com/Bratah123/ElectronMS/wiki/SoulGirlJP)
- [Closed-source Development History](https://github.com/Bratah123/ElectronMS/wiki/AzureMS-Closed-Source-Development-History)
- [Open-source Development History](https://github.com/Bratah123/ElectronMS/wiki/AzureMS-Open-Source-Development-History)  

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
- **Hashed passwords**

---

### Disclaimer:  
*ElectronMS is an open-source third-party implementation of a particular MapleStory server emulation project ([AzureMSv316](https://github.com/SoulGirlJP/AzureV316)). ElectronMS is non-monetised, provided as is, and is unaffiliated with NEXON. Every effort has been taken to ensure correctness and reliability of ElectronMS and its documents. We will not be liable for any special, direct, indirect, or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action if contract, negligence or other tortious action, arising out of or in connection with the use of ElectronMS (in part or in whole).*
