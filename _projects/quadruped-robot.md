---
layout: project
title: Quadruped Robot
year: 2014
category: robotics

preview_image: /projects/quadruped-robot/preview.jpg
cover_image: /projects/quadruped-robot/thumbs/IMG_20140806_233541_770.jpg

electronics_images:
  base_url: /projects/quadruped-robot/
  use_thumbnails: true
  ratio: 3264 / 1836
  sections:
    - cols: 2
      images:
        - file: IMG_20140806_190720_016.jpg
        - file: IMG_20140806_233709_112.jpg

frame_images:
  base_url: /projects/quadruped-robot/
  use_thumbnails: true
  ratio: 3264 / 1836
  sections:
    - images:
        - file: quadbot.png
          thumbnail: quadbot.png
          ratio: 1253 / 651
    - cols: 2
      images:
        - file: IMG_20140806_132208_055.jpg
        - file: IMG_20140806_132734_033.jpg

assembly_images:
  base_url: /projects/quadruped-robot/
  use_thumbnails: true
  ratio: 3264 / 1836
  sections:
    - cols: 2
      images:
        - file: IMG_20140806_190948_936.jpg
        - file: IMG_20140806_191043_398.jpg
        - file: IMG_20140806_230606_525.jpg
        - file: IMG_20140806_231205_827.jpg
        - file: IMG_20140806_233541_770.jpg
        - file: IMG_20140901_243545_415.jpg
          ratio: 1836 / 3264
---

This is a quadruped robot made with laser-cut acrylic and standard hobby servos. It uses 3 servos per leg, allowing for 3DOF movement. I never entirely finished the project, but got far enough where it could walk around.

<iframe class="youtube" src="https://www.youtube-nocookie.com/embed/HNBT9fM_P60" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


At the time, I had found upon a number of quadruped/hexapod projects online, and I thought making one would be a neat project to work on. I decided on a quadruped both because it would be slightly cheaper (fewer servos) and seemed more interesting in terms of walking gaits.

## Electronics

The main components of the robot are the 12 servos. I used standard sized [HK15138s](https://hobbyking.com/en_us/hobbyking-hk15138d-standard-digital-servo-5-3kg-0-18sec-38g.html) from HobbyKing ($3.50 each). While their torque isn't great, they were inexpensive and fine for this project. 

For the microcontroller, I used a Teensy 3.0. Since the servos are rated at 4.8-6V, I went with 4 NiMH batteries instead of a dual cell LiPo so I wouldn't have to deal with voltage regulation. I also got a cheap bluetooth module from ebay, which was a lot easier to use compared to the nRF24L01 for my [quadcopter]({% link _projects/quadcopter.md %}).

{% include image_flexgrid.html images=page.electronics_images %}

## Frame

For the frame, I used laser-cut acrylic parts. Since I wanted everything to be relatively solid, I used simple design where each joint is supported at two points, not just the servo horn. Essentially, the frame consists of a main body part, a bunch of servo brackets, and leg pieces. I created the parts in SketchUp (since I no longer had access to Caltech's SolidWorks license). Since I didn't have access to a laser-cutter, I ordered the parts from [Ponoko](https://www.ponoko.com/) on a 384mm x 384.0mm sheet.

{% include image_flexgrid.html images=page.frame_images %}

## Assembly

Assembling everything was straightforward, although pretty time-consuming (took me 4-5 hours total). I used super glue for bonding everything (though it did discolor the acrylic around the joints).

{% include image_flexgrid.html images=page.assembly_images %}


## Walking Gait

Before starting on walking, the robot needed to stand of course. Implementing inverse kinematics for the legs was pretty straightforward; since there's only 3 DOF per leg, the angles of each joint can just be solved analytically (law of cosines). Quick pre-programmed sequence:

<iframe class="youtube" src="https://www.youtube-nocookie.com/embed/ERKY6xWpS6g" title="YouTube video player" frameborder="0" allow="
accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

For walking, I decided to try for the the creep gait, where only one leg is lifted and moved at a time, as opposed to the trot gait, where diagonal legs are both moved together. While the trot gait is generally faster, I don't think the servos I'm using are strong or fast enough.

The first walking gait I tried consisted of 4 basic states:

|![gait]({{ site.files_domain }}/projects/quadruped-robot/gait.png)|
|:--:|
|*The most recently moved leg  in each state is highlighted in red*|

In each state, all four legs are down, so the robot is stable. In between the states, one leg is lifted and moved in a sinusoidal curve (w.r.t. the vertical axis) to its next position. The body moves linearly to its next position as well; this is equivalent to the other three legs moving backwards by the same amount. During these transitions, the robot isn't stable, since its center of gravity is briefly outside of the triangle formed by the legs on the ground.

In practice, this wasn't actually that bad; it actually looked quite smooth since the main body moved at a constant speed. The problem was that the robot would dip slightly during each step and its body would brush the ground. Honestly, this was hard to notice if the legs were moving at a decent speed, but I wasn't quite satisfied. 

Keeping the issue of stability in mind, I added two extra states to the gait:

![gait2]({{ site.files_domain }}/projects/quadruped-robot/gait2.png)

Now, the body only moves when all 4 legs are on the ground. Thus, during transitions where a leg is lifted, the robot's center remains within a stable tripod with the three grounded legs. Of course, the robot isn't perfect mechanically (lack of servo torque, servo slop), so it still tended to droop a little bit. To help counteract this, I made the bot shift and roll a little left and right depending on the walk stage.

The last issue I had to deal was starting and ending the walk. In the idle state, the robot has its legs out in a square; thus, when it begins moving its first back leg, the tripod is not as stable as in regular walking. A similar problem occurs when the robot stops walking and resumes the idle state. Fixing this involved adding a couple of extra states where the robot first shifts its body before taking the first/last step.

Implementing rotating was similar to walking, but a lot easier; I ended up just using a 4-state cycle. Since the legs don't get as spread out as in walking, stability wasn't a huge issue. While the robot still moves its body a little to help balance, I didn't need to use extra states just for shifting (except for the very start of the turn). 

Overall, I'm really happy that it works as well as it does, considering the cheap servos.