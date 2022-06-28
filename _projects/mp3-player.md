---
layout: project
title: MP3 Player
year: 2013
category: electronics

preview_image: /assets/images/mp3-player/preview.jpg
cover_image: /assets/images/mp3-player/20220110_010856.jpg
cover_css: "background-position: center center"

images:
  - file: IMG_20130327_241014_257.jpg
    title: Board top view
  - file: IMG_20130123_224921_169.jpg
    title: The beginning
  - file: IMG_20130227_022205_301.jpg
    title: Board top view 
  - file: IMG_20130227_022141_349.jpg
    title: Board bottom view
  - file: IMG_20130217_072358_364.jpg
    title: Debugging
  - file: IMG_20130318_013341_627.jpg
    title: Working!
  - file: IMG_20130323_040313_890.jpg
    title: LCD - music
  - file: IMG_20130323_040204_020.jpg
    title: LCD - volume
  - file: IMG_20130323_040233_937.jpg
    title: LCD - snake

schematic_images:
  - file: schematic_cpu.png
  - file: schematic_ide.png
  - file: schematic_dram.png
  - file: schematic_mp3.png
  - file: schematic_keys.png
  - file: schematic_cpld.png
---

This is an MP3 player I built for the [EE/CS 52](http://wolverine.caltech.edu/eecs52/) course at Caltech. It can read and play MP3 files from an IDE hard drive and has a simple interface with keys and a 2x24 LCD. The system is controlled with a 80188 microprocessor. This was my first introduction into electronics, so it was a pretty memorable project for me. 

{% include image_grid.html base_url="/assets/images/mp3-player/" images=page.images cols=3 use_thumbnails=true %}

## Hardware

For the project, the [major hardware components](http://wolverine.caltech.edu/eecs52/projects/188mp3/188mp3.htm) were already specified, and we were provided a premade prototyping PCB board to build on.

- Intel 80188 microprocessor
- ROM, SRAM, DRAM
- MP3 decoder board
- IDE hard drive 
- LCD
- Button inputs

However, we had a fair amount of freedom (or work to do) in the implementation details - what buffers/latches to use for the bus, how to hook up chip select and interrupt signals, required CPLD state machines, etc.

{% include image_grid.html base_url="/assets/images/mp3-player/" images=page.schematic_images cols=3 use_thumbnails=true %}


## Software

The general software interface was also provided, along with the code to read a FAT filesystem and parse ID data from an MP3 player. We just had to write some of the hardware-specific implementations, such as:
- Chip-select and stack/data segment register initialization
- Timers setup
- I/O space access
- IDE, MP3 decoder, keys, and LCD interfaces

I also implemented some minor extra UI features like LCD text scrolling and volume / treble / bass settings.

### Snake Game Easter Egg

The MP3 player also features a snake minigame! This is implemented via custom LCD characters; each individual LCD
character block is treated as a 3x2 grid, for a 6x48 game grid. On each render, new custom characters are created to render the snake and the food correctly (though because the LCD is limited to 8 different custom characters at a time, there will be some rendering issues once the snake becomes long enough).
To make the game more interesting/difficult, the game update speed increases by 25% each time food is eaten.