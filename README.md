# easel-path-encode-decode
Simple decoder and re encoder for easel (Adobe Animate)

Adobe animate writes code like
this.shape.graphics.f("#C6753D").s().p("AnaH0QhkAAAAhkIAAsfQAAhkBkAAIO1AAQBkAAAABkIAAMfQAABkhkAAg");

This tool converts it into 
moveTo(-47.4,50)
quadraticCurveTo(-57.4,50)
lineTo(-57.4,-39.900000000000006)
quadraticCurveTo(-57.4,-49.900000000000006)
lineTo(47.50000000000001,-49.900000000000006)
quadraticCurveTo(57.50000000000001,-49.900000000000006)
lineTo(57.50000000000001,40)
quadraticCurveTo(57.50000000000001,50)

plus allows you to edit and then re-encode using this 
nifty encoder written by Brett Johnson found here
https://gist.github.com/bjnsn/3440359

Note - closePath currently doesn't work and gets removed
from the encoding
