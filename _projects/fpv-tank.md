---
layout: project
title: Mini FPV Tank
year: 2021
category: robotics

preview_image: /projects/fpv-tank/preview.jpg
cover_image: /projects/fpv-tank/thumbs/20210228_172939.jpg
cover_css: "background-position: center top 25%"

images:
  base_url: /projects/fpv-tank/
  use_thumbnails: true
  ratio: 4032 / 3024
  sections:
    - cols: 2
      images:
        - file: 20210228_172939.jpg
        - file: 20210228_172927.jpg
        - file: 20210228_233715.jpg
        - file: tank.jpg
          ratio: 1920 / 1080

3dprint_images:
  base_url: /projects/fpv-tank/
  use_thumbnails: true
  ratio: 4032 / 3024
  sections:
    - cols: 2
      images:
        - file: tank_fusion360.png
          ratio: 1920 / 1160
        - file: 20210227_134247.jpg
    - cols: 3
      images:
        - file: 20210217_184818.jpg
        - file: 20210217_184947.jpg
        - file: 20210217_185116.jpg
        - file: 20210217_185315.jpg
        - file: 20210228_133151.jpg
        - file: 20210219_001315.jpg
        - file: 20210227_174824.jpg
        - file: 20210227_174830.jpg
        - file: 20210220_154355.jpg

electronics_images:
  base_url: /projects/fpv-tank/
  use_thumbnails: true
  ratio: 4032 / 3024
  sections:
    - cols: 3
      images:
        - file: 20210227_153656.jpg
        - file: 20210227_160533.jpg
        - file: 20210227_173645.jpg
        - file: 20210227_185729.jpg
        - file: 20210227_185932.jpg
          ratio: 3024 / 4032

---

**Github**: <https://github.com/kevinbchen/fpvtank> <br/>
**Thingiverse**: <https://www.thingiverse.com/thing:4779771>

This is mini remote-controlled tank that has a small all-in-one FPV (first-person view) camera for a video feed. The tank is driven by two 9g servos and uses lego treads. I designed and 3d printed the tank frame; this project was mainly a way to practice at Fusion 360.

<iframe class="youtube" src="https://www.youtube-nocookie.com/embed/HFbB3XXZEgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{% include image_flexgrid.html images=page.images %}

## Parts

The tank uses Lego x939 treads, 9g servos, a 4ch frsky receiver, and a typical small all-in-one fpv camera. It's powered by a 600mah 1s lipo stepped up to 6v with a boost converter. There is also an Arduino Pro Mini that reads in the receiver signals and controls the servos. While not entirely necessary since you can directly hook up the receiver and servos, it does let me control an rgb led, add a deadzone to avoid servo jittering when idle (by just floating the pins), and monitor the battery voltage.

- [TG9e servos](https://hobbyking.com/en_us/turnigytm-tg9e-eco-micro-servo-1-5kg-0-10sec-9g.html) (modified for continuous rotation)
- [4ch frsky receiver](https://www.banggood.com/2_4G-4CH-Mini-Frsky-D8-Compatible-Receiver-With-PWM-Output-p-1143300.html)
- [MT3608 boost converter](https://www.amazon.com/gp/product/B07RNBJK5F)
- [FPV camera](https://www.amazon.com/gp/product/B07F62M5Z7)
- Lego x939 treads
- Arduino Pro Mini
- RGB LED + resistors (I used two 100ohm and a 220ohm)
- M3x19mm bolts, M3 nuts
- 3x8x4mm ball bearings
- M2 nylon bolts

## 3D Printed Parts

I designed the frame in Fusion 360. There are 4 main components:
- **Chassis** - The servos are mounted on the bottom of the chassis, and the other electronics are attached above.
- **Body** - Provides a cover for the electronics; snap fits onto the chassis with cantilever joints.
- **Turret** - Holds the FPV camera and the Lipo battery; attaches to the body via nylon screws. 
- **Wheels** - Holds the treads with an inner slot. The drive wheels have cutouts for gluing in cutdown servo horns, while the idler wheels attach to the chassis with ball bearings and bolts.

I initially designed the wheels with notches in the middle to match the treads. Unfortunately, The circumference and notch spacing were just slightly off, causing the tracks to ride off the wheel eventually. I changed the notches to a smooth inner ring to fix this.

{% include image_flexgrid.html images=page.3dprint_images %}

## Electronics

The electronics involved simply wiring up the different components.

Lipo (\~3.7V) -> MT3608, FPV camera<br/>
MT3608 (5V) -> Arduino, receiver, servos<br/>

**Arduino pins:**<br/>
A0 <- Lipo voltage<br/>
D2, D3, D4, D7 <- Receiver Ch 1-4 PWM<br/>
D5, D6, D11 -> LED green, blue, red, respectively<br/>
D9 -> Left servo PWM<br/>
D10 -> Right servo PWM<br/>

{% include image_flexgrid.html images=page.electronics_images %}


## Software

The code is pretty straightforward. Just read the receiver PWM signals and output the appropriate servo and LED PWM control signals.

<https://github.com/kevinbchen/fpvtank/blob/main/fpvtank.ino>
