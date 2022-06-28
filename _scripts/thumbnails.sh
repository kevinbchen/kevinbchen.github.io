#!/bin/bash 

patterns=(
    # "mp3-player/IMG_* 512x"
    # "mp3-player/schematic_* 512x"
    # "music-box/IMG_* 512x"
    # "gate-opener/2* 512x"
    # "switch-controller/2* 512x"
    # "grizzly-tank/IMG_* 720x"
    "metal-gear-rex/IMG_* 720x"
)

for pattern in "${patterns[@]}"; do
    echo $pattern
    set -- $pattern
    for i in $(dirname "$BASH_SOURCE")/../assets/images/$1; do
        echo $i
        dir=$(dirname "$i")
        filename=$(basename -- "$i")
        thumb="${dir}/thumbs/${filename}"
        mkdir -p ${dir}/thumbs/
        convert -auto-orient -thumbnail $2 -unsharp 0x.5 $i $thumb
    done
done