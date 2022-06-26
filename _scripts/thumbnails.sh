#!/bin/bash 

WIDTH=512
patterns=(
    "mp3-player/IMG_*"
    "mp3-player/schematic_*"
)

for pattern in ${patterns[@]}; do
    echo $pattern
    for i in $(dirname "$BASH_SOURCE")/../public/images/$pattern; do
        echo $i
        dir=$(dirname "$i")
        filename=$(basename -- "$i")
        thumb="${dir}/thumbs/${filename}"
        mkdir -p ${dir}/thumbs/
        convert -thumbnail ${WIDTH}x -unsharp 0x.5 $i $thumb
    done
done