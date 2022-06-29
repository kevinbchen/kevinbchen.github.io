#!/bin/bash 

WIDTH=800

for i in "${@}"; do
    echo $i
    dir=$(dirname "$i")
    filename=$(basename -- "$i")
    thumb="${dir}/thumbs/${filename}"
    mkdir -p ${dir}/thumbs/
    convert -auto-orient -thumbnail ${WIDTH}x -unsharp 0x.5 $i $thumb
done
