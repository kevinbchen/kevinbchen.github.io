---
layout: project
title: Falling
year: 2011
category: "games"

preview_image: /public/images/falling/preview.png
preview_bg_css: "background-position: left center"
cover_image: /public/images/falling/preview.png
cover_css: "background-position: left top"
---

[**Google Play Store**](https://play.google.com/store/apps/details?id=com.kevinbrianchen.falling)

Falling is an endless runner type game for Android, where you fall from platform to platform to avoid getting crushed by spikes or falling to your doom below. It features:

* Fast-paced gameplay using touch or tilt controls
* Bouncing, rotating, and moving platforms for a challenge
* Hard hat and jetpack powerups to help you survive
* Online high-score list

{% assign images = "" | split: ""
  | push: "/public/images/falling/menu.png"
  | push: "/public/images/falling/falling1.png"
  | push: "/public/images/falling/instructions.png"
%}
{% include image_grid.html images=images cols=3 %}

Falling was the first Android game I made; the initial version was created during spring break 2011, with some minor graphical updates in 2014. The game was built with the [libGDX](https://libgdx.com/) engine, and the graphics were created in Adobe Flash. The original inspiration for Falling came from the old freeware PC game [NS-SHAFT](https://www.nagi-p.com/v1/eng/nsshaft.html).

## Privacy Policy

Falling only collects informaton when you explicitly submit your score to the global high-score list. The information collected is the username you entered, your score, and your phone type (e.g. "samsung SM-G970U1"). Your username and score may be displayed to others as part of the global high-score list.