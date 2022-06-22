---
layout: project
title: QQ Manto
year: 2007
category: "games"

preview_image: /public/images/qqmanto/preview.png
cover_image: /public/images/qqmanto/qqmanto.gif
---

QQ Manto is a simple PSP homebrew game inspired by Line Rider, where you draw lines for a blob to slide through. The name comes from "饅頭", or "steamed bun". 

The first version of the game was put together in a weekend for the [NEO Summer Coding Compo 2007](https://www.neoflash.com/forum/index.php?topic=4628.0) (where it placed 10th in the PSP game category). At the time, I had been writing a verlet physics engine intended for a larger game; I was able to repurpose it for QQ Manto with a few tweaks. 

{% assign images = "" | split: ""
  | push: "/public/images/qqmanto/preview.png"
  | push: "/public/images/qqmanto/qqmanto1.png"
  | push: "/public/images/qqmanto/qqmanto2.png"
  | push: "/public/images/qqmanto/qqmanto3.png"
%}
{% include image_grid.html images=images cols=2 %}

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/CtDoJC8xUOM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Download

TODO