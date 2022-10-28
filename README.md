# easel-path-encode-decode
Simple decoder and re encoder for easel (Adobe Animate)

Adobe animate writes code like
this.shape.graphics.f("#C6753D").s().p("AAAhPIAACf");

This tool converts AAAhPIAACf into 
moveTo(0,-7.9)
lineTo(0,8)

plus allows you to edit and then re-encode using this 
nifty encoder written by Brett Johnson found here
https://gist.github.com/bjnsn/3440359

Note - closePath currently not supported and removed from the decoded path
