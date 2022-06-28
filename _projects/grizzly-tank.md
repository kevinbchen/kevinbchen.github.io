---
layout: project
title: Grizzly Tank (Red Alert 2)
year: 2010
category: models

preview_image: /assets/images/grizzly-tank/preview.jpg
cover_image: /assets/images/grizzly-tank/preview.jpg
cover_css: "background-position: center top 30%"

images:
  base_url: /assets/images/grizzly-tank/
  use_thumbnails: true
  ratio: 2592 / 1936
  sections:
    - images:
        - file: CNCRA2_Grizzly_Battle_Tank.png
          thumbnail: CNCRA2_Grizzly_Battle_Tank.png
          ratio: 324 / 219
        - file: IMG_20110107_025149.jpg
    - images:
        - file: IMG_20110107_025103.jpg
        - file: IMG_20110107_134203.jpg
    - cols: 4
      images:
        - file: IMG_20101229_025656.jpg
        - file: IMG_20101229_161255.jpg
        - file: IMG_20101230_013002.jpg
        - file: IMG_20101231_013610.jpg
        - file: IMG_20101231_013648.jpg
        - file: IMG_20110101_034047.jpg
        - file: IMG_20110102_012523.jpg
        - file: IMG_20110103_024538.jpg
        - file: IMG_20110103_163136.jpg
        - file: IMG_20110105_045807.jpg
        - file: IMG_20110105_231858.jpg
        - file: IMG_20110106_004920.jpg
        - file: IMG_20110106_034953.jpg
        - file: IMG_20110106_042026.jpg
        - file: IMG_20110106_042041.jpg
        - file: IMG_20110106_185811.jpg
        - file: IMG_20110106_194356.jpg
        - file: IMG_20110106_195121.jpg
        - file: IMG_20110106_195136.jpg
        - file: IMG_20110106_195208.jpg

---

This is a balsa wood model of the Grizzly battle tank from Red Alert 2. The source material is pretty low-detail to begin with, but I think I got the general shapes down. The tank's turret can rotate 360 degrees its gun can be raised and lowered. Made with 1/16" and 1/32" balsa sheets and lots of wood glue.

{% include image_flexgrid.html images=page.images %}

{% comment %}
{% assign images = site.static_files | where_exp: "item", "item.path contains '/assets/images/grizzly-tank/IMG'" | map: "path" %}
{% include image_grid.html base_url="" images=images cols=3 use_thumbnails=false %}
{% endcomment %}
