---
layout: project
title: Quadcopter Electronics
year: 2014
category: robotics

preview_image: /projects/quadcopter/preview.jpg
cover_image: /projects/quadcopter/thumbs/IMG_20140208_185910_132.jpg

images:
  base_url: /projects/quadcopter/
  use_thumbnails: true
  ratio: 3264 / 1836
  sections:
    - cols: 2
      images:
        - file: IMG_20140323_240051_044.jpg
        - file: IMG_20140322_215201_595.jpg
        - file: IMG_20140219_165852_133.jpg
        - file: IMG_20140302_191939_642.jpg


flightunit_images:
  base_url: /projects/quadcopter/
  use_thumbnails: true
  ratio: 2048 / 1583
  sections:
    - cols: 1
      images:
        - file: flightunit_schematic.png
    - cols: 2
      images:
        - file: flightunit_top.png
        - file: flightunit_bottom.png

remoteunit_images:
  base_url: /projects/quadcopter/
  use_thumbnails: true
  ratio: 1546 / 536
  sections:
    - cols: 1
      images:
        - file: remoteunit_schematic.png
        - file: remoteunit_top.png
        - file: remoteunit_bottom.png

pcb_images:
  base_url: /projects/quadcopter/
  use_thumbnails: true
  ratio: 3264 / 1836
  sections:
    - cols: 2
      images:
        - file: IMG_20140205_151907_902.jpg
          ratio: 1836 / 3264
        - file: IMG_20140208_104858_761.jpg
        - file: IMG_20140208_143809_379.jpg
        - file: IMG_20140208_143736_486.jpg
        - file: IMG_20140208_150413_788.jpg
        - file: IMG_20140208_192320_458.jpg
          ratio: 1836 / 3264
    - images:
        - file: IMG_20140208_185910_132.jpg
    - cols: 2
      images:
        - file: IMG_20140219_151946_894.jpg
        - file: IMG_20140219_152454_965.jpg
        - file: IMG_20140219_153833_715.jpg
        - file: IMG_20140219_161133_769.jpg
        - file: IMG_20140219_161819_743.jpg
          ratio: 1836 / 3264
        - file: IMG_20140219_161846_127.jpg

display_images:
  base_url: /projects/quadcopter/
  use_thumbnails: true
  ratio: 3264 / 1836
  sections:
    - cols: 3
      images:
        - file: IMG_20140322_215600_338.jpg
        - file: IMG_20140322_215533_775.jpg
        - file: IMG_20140322_215422_228.jpg
---

The [EE/CS 52](http://wolverine.caltech.edu/eecs53/) course at Caltech is a project course students can take if they want to propose, design, and build their own embedded systems project independently over 10 weeks. For my project, I built the electronics for a small quadcopter from scratch. The system consists of a **Flight Unit** (flight controller) board mounted on the quadcopter, as well as a **Remote Unit** board for the remote transmitter. The frame and motors come from a Syma X1 toy quadcopter. While not the most stable, the quadcopter does actually fly, which I'm pretty happy with given the time constraints.

- Quadcopter balances itself using accelerometer and gyroscope data
- Analog control over the quadcopter’s throttle, pitch/roll angle, and yaw rate
- Tunable PID constants using the Remote Unit
- Graphical time series display of the pitch or roll angle on the Remote Unit

<iframe class="youtube" src="https://www.youtube-nocookie.com/embed/bbkOazndQDw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{% include image_flexgrid.html images=page.images %}

## Hardware

The Flight Unit board is physically attached to the quadcopter and controls the motors. The Remote Unit board acts as the user interface unit and controls the quadcopter wirelessly. The Flight Unit and Remote Unit share some common components:

- ATmega328P MCU to run the main application code
- nRF24L01+ RF transceiver (SPI) to enable the units to communicate
- MIC5219 3.3V voltage regulator for either 1-cell LiPo or 5V usb supply

### Flight Unit Schematic and PCB

The Flight Unit includes additional sensor and control components: 
- MMA8452Q accelerometer (I2C)
- ITG-3200 gyroscope (I2C)
- ZXMN3F30FH N-channel MOSFETs to drive the motor

{% include image_flexgrid.html images=page.flightunit_images %}

### Remote Unit Schematic and PCB

The Remote Unit includes additional user interface components:
- Analog Joysticks (game controller style ones)
- Nokia 5110 LCD (SPI)

{% include image_flexgrid.html images=page.remoteunit_images %}

### Construction Details

I ordered the PCBS from [OSH Park](http://www.oshpark.com) and most other components from Digi-Key. This was my first time working with SMD components, which were a lot tinier than expected once I saw them in person! The MMA8452Q and ITG-3200 chips were particularly tricky - they only came in QFN packages, which can't be hand soldered. Instead, I did some rudimentary reflow soldering using a [cheap electric griddle](https://www.amazon.com/Presto-7211-07211-Liddle-Griddle/dp/B00006IUWL), Chip Quick low temperature solder paste, and stencils ordered from [OSH Stencils](http://www.oshstencils.com).

{% include image_flexgrid.html images=page.pcb_images %}


## Software

The software for both the Flight Unit and Remote Unit was written in C and compiled using avr-gcc 4.3.3. A lot of the initial software work was the groudwork to read or communicate with the various components (e.g. setting up I2C or SPI registers). I unfortunately did not have the foresight to break out serial port pins; for the flight unit, early debugging involved measuring the voltage of a single pin that I could toggle at specific points in the code. This became a lot easier once I got the nRF chip working and was able to actually send and receive data.

### PID Controllers

The quadcopter is controlled and balanced using a number of PID control loops. For the pitch and roll axes, the Flight Unit attempts to use both the accelerometer and gyroscope to maintain the quadcopter’s absolute angle at the controller set angle (0 for a stable hover), using 2 PID loops per axis. For the yaw axis, the Flight Unit cannot get any useful absolute angle information from the accelerometer; thus, it uses only 1 PID loop to maintain the quadcopter’s angular yaw rate at the controller set rate (0 for approximately no yaw).

|![pitch_roll_pid_loops]({{ site.files_domain }}/projects/quadcopter/pitch_roll_pid_loops.svg)|
|:--:|
|*The PID loops for the pitch/roll axes.*|
|![pitch_roll_pid_loops]({{ site.files_domain }}/projects/quadcopter/yaw_pid_loop.svg)|
|:--:|
|*The PID loop for the yaw axis.*|

#### Filters
To estimate the rotation of the quadcopter along the pitch and roll axes, a complementary filter is used to combine the accelerometer angular data and the gyroscope angular rate data. In addition, because the raw accelerometer data is relatively noisy, the accelerometer angle is first filtered using an exponential moving average filter applied approximately every 10ms before it is fed into the complementary filter.

### Communication Protocol

The Flight Unit and Remote Unit communicate using 5-byte packets. The following types of packets are used:

#### Flight Command Packet
This is sent by the Remote Unit to the Flight Unit to directly control the quadcopter in fight mode. It is sent approximately every 20ms:

| Byte # | Data             |
|:-------|:-----------------|
| 0      | 100              |
| 1      | Yaw angular rate |
| 2      | Throttle level   |
| 3      | Roll angle       |
| 4      | Pitch angle      |

#### PID Tune Command
This is sent by the Remote Unit to the Flight Unit to change the coefficients of the different PID loops that the Flight Unit uses to balance the quadcopter:

| Byte # | Data             |
|:-------|:-----------------|
| 0      | (1 = pitch/roll stability)<br/>(2 = pitch/roll rate)<br/>(3 = yaw rate)<br/>(4 = alt rate - unused) |
| 1      | P coefficient    |
| 2      | I coefficient    |
| 3      | D coefficient    |
| 4      | unused           |

#### Calibrate Command
This is sent by the Remote Unit to the Flight Unit to make the Flight Unit zero the accelerometer and gyroscope (the process takes involves averaging 10 samples and using that as the zero level for both chips):

| Byte # | Data             |
|:-------|:-----------------|
| 0      | 0                |
| 1      | unused           |
| 2      | unused           |
| 3      | unused           |
| 4      | unused           |

#### Flight Unit Status
The Flight Unit acknowledges each command packet from the Remote Unit with this status packet (using the built-in ack payload feature of the nRF24L01+ chip). Each status packet contains the following data:

0 Battery voltage - unused
1 Filtered pitch angle
2 Filtered roll angle
3 Filtered accelerometer x-axis angle
4 Altitude

| Byte # | Data             |
|:-------|:-----------------|
| 0      | Battery voltage - unused            |
| 1      | Filtered pitch angle                |
| 2      | Filtered roll angle                 |
| 3      | Filtered accelerometer x-axis angle |
| 4      | Altitude                            |


### Remote Unit Interface

The remote can display a variety of data on its LCD. In the default flight mode, where the anlog sticks directly control the quadcopter, the following displays are available:

1. Default (shows all status info in numeric form)
2. Filtered pitch angle time series
3. Filtered roll angle time series
4. Accelerometer x-axis time series
5. Attitude time series

In the PID tuning mode, the display shows an editable interface of the PID coefficients of the flight unit.

{% include image_flexgrid.html images=page.display_images %}
