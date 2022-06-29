---
layout: project
title: Music Box
year: 2014
category: electronics

preview_image: /projects/music-box/preview.jpg
cover_image: /projects/music-box/IMG_20140727_223230_141.jpg

images1:
  base_url: /projects/music-box/
  use_thumbnails: true
  sections:
    - images:
        - file: musicbox-pcb.png
          thumbnail: musicbox-pcb.png
          ratio: 524 / 252
        - file: IMG_20140726_133942_857.jpg
          ratio: 3264 / 1836

images2:
  - file: IMG_20140726_133816_593.jpg
  - file: IMG_20140727_223230_141.jpg
  - file: IMG_20140727_223808_987.jpg
  - file: IMG_20140727_223350_825.jpg
---

**Bitbucket**: <https://bitbucket.org/kevinbchen/musicbox>

This is a small electronic music box that can store and play \~5 songs (depending on length). It can also be played manually with the piano key buttons.

<iframe style="aspect-ratio: 16 / 9; height: 100%; width: 100%" src="https://www.youtube-nocookie.com/embed/vWsUht7nizM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Sound Generation / Software

I started off with simple square-wave waveform with linearly decreasing amplitude to get something that sounded like:

<audio controls="controls" height="50px" width="150px">
  <source src="{{ site.files_domain }}/projects/music-box/moonsong.mp3" type="audio/mpeg"></source>
</audio>

Not too bad, but a bit grating. I then tried using actual samples from pianos/guitars. This worked ok, but I had issues with the tradeoffs between sample size and the quality; in addition, I could only change the pitch by going through the sample faster or slower (e.g. higher notes were noticeably shorter).

Eventually, I found a [great writeup](http://www.deep-shadows.com/hax/wordpress/?page_id=1111) by someone who made a similar project. They got a nice music-box sound by using a sine wave and decreasing the amplitude gradually: 

<audio controls="controls" height="50px" width="150px">
  <source src="{{ site.files_domain }}/projects/music-box/moonsong2.mp3" type="audio/mpeg"></source>
</audio>

|![waveform]({{ site.files_domain }}/projects/music-box/waveform.png)|
|:--:|
|*(sine wave frequency not to scale)*|

In addition, they also wrote a neat program to convert .midi files into more direct data, which was super useful.

The final design supports 4 independent notes playing at once. Both terminals of the speaker are controlled by PWM pins, so each pin is a software mix of two channels. Technically I can mix more channels in software, but N channels means each channel's amplitude must be 1/N of the max. 4 channels seemed like a good balance.

Overall, the code is pretty short at a couple hundred lines, but I got pretty comfortable with fiddling with the timer registers!


## Hardware

I used an ATmega328P for this project. Two pwm pins drive the speaker and another two drive LEDs. The remaining pins are mostly used to read the button inputs - there were enough left for a full octave of keys, so I didn't bother doing any multiplexing.

For power, I initially hoped to use a CR2032 battery, but had some trouble getting it to supply enough current for a decently loud speaker. I looked into some dc-dc step up converters, and settled on the MAX756 chip with an AAA battery.

I used Eagle for the schematic and pcb design. I ordered the PCBs from OSH Park and most of the components from Digikey. Everything was through-hole, so assembly was easy.

|[![schematic]({{ site.files_domain }}/projects/music-box/musicbox-schematic.png)]({{ site.files_domain }}/projects/music-box/musicbox-schematic.png){:.lightbox-image}|
|:--:|
|*The \~SHDN pin on the MAX756 should actually be connected to +5V (this ended up not being a problem though)*|

{% include image_flexgrid.html images=page.images1 %}

I did run into a small issue though - for some reason, the switch attached to pin D7 (the 'B key') wasn't being pulled up properly to logic high when open, especially when the speaker was on. The speaker PWM pins are on D6 and D5, so maybe the speaker is drawing too much current and pulling down D7 somehow? Unfortunately, I didn't have an oscilloscope at the time to properly debug, but was able to workarond it by routing the switch to unused pin B4 and cutting off the D7 pin.

{% include image_grid.html base_url="/projects/music-box/" images=page.images2 cols=2 use_thumbnails=true %}
