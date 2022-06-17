---
layout: project
title: CSPSP
year: 2006
preview_image: /public/images/cspsp/de_dust2.png
cover_image: /public/images/cspsp/de_dust2_2.png
cover_css: "background-position: center top"

category: games
---

**Website**: <https://cspsp.appspot.com> <br>
**Github**: <https://github.com/kevinbchen/cspsp>

CSPSP is a homebrew game for the Sony PSP that I started in 2006 and worked on through 2011. It's a 2d top-down shooter heavily based on Counter-Strike, with similar round-based team gameplay and weapon selection.

It features fully multiplayer game with community-hosted servers, player-created custom maps, and an account system with friend lists and clans. During its prime, it had a thriving community with over 10,000 registered players, making it one of the most popular multiplayer PSP games. It was particularly unique given that very few PSP games at the time (homebrew or commercial) had non-local multiplayer gameplay.

Unfortunately, life got busy, and I stopped development on CSPSP in 2012. The game eventually died from players simply moving on and the natural lifecycle of the PSP system, but I'm glad it was a source of fun for many players during those years.

![menu](/public/images/cspsp/menu.png)
![cs_italy](/public/images/cspsp/preview.png)

### Technical Details

This was actually my first project using C++. The code is incredibly messy and frankly a little embarrassing, but I'm still pretty proud of what high school me was able to hack together.

CSPSP was built on top of JGE, a neat little game engine that provided basic functionality rendering sprites/fonts, playing sounds, and handling input. It was actually cross platform for windows and PSP, which was great for development. The core game implementation is not particularly complex, but there are a few aspects that are interesting.

#### Maps
Visually, the maps are composed of 32x32 tiles, but their collision geometry is defined by line segments, allowing walls at arbitrary angles. Player and gun objects use circle colliders. Maps also specify player and gun spawns, buy zones, and bot waypoints. 

Like the original Counter-Strike, custom maps are a big feature of CSPSP. Almost all the maps included by default were created by the community. The UCSPSPE map editor itself was also created by a community member, *coolguy5678*. 

![ucspspe](/public/images/cspsp/ucspspe.png)

#### Bots
The early versions of CSPSP weren't yet multiplayer, so I first implemented bots to play with/against. The bots use A* with predefined waypoints to navigate the map and find their targets, but with added randomness to make them less predictable.

#### Multiplayer
The most notable feature of CSPSP is the online component. While not the best, the networking was good enough to for fairly responsive and fun multiplayer gameplay.

CSPSP uses a client-server architecture, with a separate [server application](https://github.com/kevinbchen/cspspserver) that runs on windows. The clients and server communicate with a message system on top of UDP. To deal with packet drops, individual messages can be specified as reliable; reliable messages are tagged with an ack ID and re-sent if an acknowledgement message isn't received after some time. Messages can also be ordered; ordered messages are buffered and processed in the order they were sent. The clients and server communicate frequently at roughly 25 packets per second.

Like most client-server setups, the server is authoritative and sends game state updates to clients - player positions, bullet spawns, damage taken, etc. Clients primarily send user inputs to the server - for example, analog stick position and weapon fire / switch commands.

I used some common techniques to help compensate for latency (the [Source Multiplayer Networking](https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking) article was a great reference). Clients use input prediction and simulate their own player movement immediately. However, if the position snapshot later received from the server differs (for example, due to collision with another player character in a slightly different position), then the player's position is corrected, and any local movement updates after the snapshot are re-applied.

On a client, other characters' positions are smoothly interpolated between snapshots; snapshot positions themselves are extrapolated based on character velocity and estimated latency. Bullets are similarly extrapolated based on estimated latency to reduce visual mismatches.

![extrapolation](/public/images/cspsp/extrapolation.png)

#### Lobby / Master Server

The online lobby is backed by a [web-based master server](http://cspsp.appspot.com/) powered by Google App Engine. It maintains a global server list that game servers can register themselves onto, and which clients can fetch. The master server also implements an account system that includes friend lists, clans, and basic kill/death stat tracking. 

![lobby](/public/images/cspsp/lobby.png)