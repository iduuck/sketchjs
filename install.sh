#!/usr/bin/env bash

####################################################
# This script is partly borrowed from gulp-sketch  #
#                                                  #
# ONLY IF YOU DON'T HAVE Sketch.app,               #
# USE THIS SCRIPT TO INSTALL THE TOOL              #
####################################################

mkdir temp
cd temp
curl -L -o sketch.zip http://www.sketchapp.com/download/sketch.zip
unzip -q sketch.zip
sh ./Sketch.app/Contents/Resources/sketchtool/install.sh
rm -Rf temp
