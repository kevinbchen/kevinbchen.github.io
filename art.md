---
layout: art
title: Art

base_url: /art/
images:
  - margit.jpg
  - darksouls.jpg
  - irithyll_final.jpg
  - sekiro.jpg
  - gaius.jpg
  # - IMG_0205.jpg
  - IMG_0195.jpg
  - IMG_0191.jpg
  - IMG_0190.jpg
  - IMG_0187.jpg
  # - IMG_0185.jpg
  - IMG_0180.jpg
  - IMG_0176.jpg
  - IMG_0174.jpg
  # - IMG_0164.jpg
  # - IMG_0161.jpg
  - IMG_0159_2.jpg
  - IMG_0146.jpg
  # - IMG_0099.jpg
  - IMG_0091.jpg
  - vin.jpg
  - IMG_0082.jpg
  - estus.jpg
  # - garrus.jpg
  - knight3.jpg
  - knight4-2.jpg
  - marida_wallpaper.jpg
  - nataku2.jpg
  - knight2.jpg
  # - robin.jpg
  # - rosamia.jpg
  # - farrah.jpg
  # - volenna.jpg
  # - zuka3sqr.jpg
---

I'm definitely more of an engineer than an artist, but I do like dabbling in (primarily digital) art. Here's a collection of some personal pieces I enjoyed working on.

## Illustration

<div class="image-masonry gallery">
  {%- for image in page.images -%}
    <a href="{{ site.files_domain }}{{ page.base_url }}{{ image }}" class="image-item lightbox-image">
      <img src="{{ site.files_domain }}{{ page.base_url }}thumbs/{{ image }}" alt="{{ image }}" />
    </a>
  {%- endfor -%}
</div>

## Animation

<div class="image-flexgrid gallery">
  <div class="image-flexgrid-row">
    <div class="image-item" style="--ratio: 16 / 9">
      <video controls>
        <source src="{{ site.files_domain }}/art/mahjong_wide2.mp4" type="video/mp4">
      </video>
    </div>
  </div>
  <div class="image-flexgrid-row">
    <div class="image-item" style="--ratio: 1 / 1">
      <video controls loop>
        <source src="{{ site.files_domain }}/art/vin_anim.mp4" type="video/mp4">
      </video>
    </div>
    <div class="image-item" style="--ratio: 1 / 1">
      <video controls loop>
        <source src="{{ site.files_domain }}/art/IMG_0108.mp4" type="video/mp4">
      </video>
    </div>
  </div>
  <div style="clear: both;"></div>
</div>
