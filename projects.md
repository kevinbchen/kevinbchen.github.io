---
layout: page
title: Projects
---

I enjoy building things in my spare time. Some of my interests include game development, electronics, robotics, 3d printing, and woodworking. This page documents a few of the personal projects I've worked on over the years.


## Video games

{% for node in site.projects %}
  [{{ node.title }}]({{node.url}})
{% endfor %}