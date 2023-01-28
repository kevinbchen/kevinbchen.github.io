---
layout: project
title: NES Emulator
year: 2022
category: games

preview_image: /projects/nes-emu/nes-emu.png
preview_bg_css: "background-position: center top"

images:
  base_url: /projects/nes-emu/
  ratio: 1330 / 838
  use_thumbnails: false
  sections:
    - images:
        - file: nes-emu.png
---

**Github**: <https://github.com/kevinbchen/nes-emu>

A basic NES emulator written for fun. Features:

- Support for Mappers 0 to 4. Games that I've tested include Donkey Kong, Super Mario Bros 1 & 3, Mega Man 1 & 2, Metroid, The Legend of Zelda.
- Visualizations of the PPU nametables, PPU pattern tables, and APU audio waveforms (using Dear ImGui for the UI).
- APU implementation with dynamic rate control for sampling to keep audio in sync with the v-sync'd graphics.
- Buildable for the web via emscripten.


{% include image_flexgrid.html images=page.images %}
