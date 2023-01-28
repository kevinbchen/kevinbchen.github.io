#!/bin/bash 

WIDTH=800

for i in "${@}"; do
    dir=$(dirname "$i")
    filename=$(basename -- "$i")
    thumb="${dir}/thumbs/${filename}"

    if [ -e $thumb ]
    then
        echo "Skipping $i"
    else
        echo $i        
        mkdir -p ${dir}/thumbs/
        convert -auto-orient -thumbnail ${WIDTH}x -unsharp 0x.5 $i $thumb
    fi
done
