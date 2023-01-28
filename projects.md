---
layout: page
title: Projects
---

I enjoy building things in my spare time. Some of my interests include game development, electronics, robotics, 3d printing, and woodworking. This page documents a few of the personal projects I've worked on over the years.


## Video games
{% assign projects = site.projects | where: "category", "games" | sort: 'year' | reverse %}
{% include projects_grid.html projects=projects %}

## Electronics
{% assign projects = site.projects | where: "category", "electronics" | sort: 'year' | reverse %}
{% include projects_grid.html projects=projects %}

## Robotics / RC
{% assign projects = site.projects | where: "category", "robotics" | sort: 'year' | reverse %}
{% include projects_grid.html projects=projects %}

## Models
{% assign projects = site.projects | where: "category", "models" | sort: 'year' | reverse %}
{% include projects_grid.html projects=projects %}