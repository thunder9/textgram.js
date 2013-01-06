textgram.js
===========

A jquery plugin for coloring text by specified image

Try [previewer](http://textgram.herokuapp.com/).

# Usage

Call the plugin on the selected elements containing the target text with image.

```js
// specify image by passing an instance of ImageData, HTMLImageElement, HTMLCanvasElement or HTMLVideoElement
$('#target').textgram(image); 

// multiple options are also allowed
$('#target').textgram({
  image: image, // (same as single option case)
  x: 50, // horizontal offset of the area to be coloring from offsetParent
  y: 0, // vertical offset of the area
  width: 200, // width of the area
  height: 100, // height of the area
  repeat: 'yes' // 'yes', 'no', 'x' or 'y'
});
```

# License
Copyright (c) 2013 thunder9 licensed under the MIT license.
