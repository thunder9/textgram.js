// textgram.js 
// A jquery plugin for coloring text by specified image
// by thunder9 (https://github.com/thunder9)
// Copyright (c) 2013 thunder9 licensed under the MIT license.

;(function($) {
            
  $.fn.textgram = function(options) {
    var opts, image, width, height,
        repeatX = false,
        repeatY = false;

    if (!($.isPlainObject(options))) options = { image: options };
    opts = $.extend({}, $.fn.textgram.defaults, options);

    if (!opts.image) return this;
      
    image = opts.image;
    width = opts.width;
    height = opts.height;
    repeatX = opts.repeat === 'yes' || opts.repeat === 'x';  
    repeatY = opts.repeat === 'yes' || opts.repeat === 'y';  
          
    if ('width' in image && 'height' in image) {
      width = width || image.width;
      height = height || image.height;       
    }
    if (!('data' in image)) {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      image = context.getImageData(0, 0, width, height);
    }
      
    return this.each(function() {

      $(this).contents().filter(function () {
        return this.nodeType === 3;
      }).each(function() {
        var $textnode = $(this),
            $colored,
            text      = this.data,
            html      = '';
        
        for (var i = 0; i < text.length; i++) {
          html += '<span>' + text.charAt(i) + '</span>';
        }
          
        $colored = $(html);
        $textnode.after($colored);
        this.data = '';
        $colored.each(function() {
          var $ch = $(this),
              pos = $ch.position(),
              w   = $ch.width(),
              h   = $ch.height(),
              x   = (pos.left + 0.5 * w - opts.x) / width,
              y   = (pos.top + 0.5 * h - opts.y) / height;
          w *= image.width / width;
          h *= image.height / height;
          if ((repeatX || x >= 0 && x <= 1) && (repeatY || y >= 0 && y <= 1)) { 
            var rgba    = [0, 0, 0, 0],
                counted = 0;
            x = (x - Math.floor(x)) * image.width;
            y = (y - Math.floor(y)) * image.height;
            for (var s = 0; s < w; s++) {
              for (var t = 0; t < h; t++) {
                var u   = Math.round(x + s - 0.5 * w),
                    v   = Math.round(y + t - 0.5 * h),
                    pos = u + v * image.width;
                for (var i = 0; i < 4; i++) {
                  rgba[i] += image.data[pos * 4 + i];
                }
                counted++;
              }  
            }
            if (counted > 0) {
              for (var i = 0; i < 3; i++) rgba[i] = Math.round(rgba[i] / counted);
              rgba[3] = rgba[3] / 255 / counted;
            }
            $ch.css('color', 'rgba(' + rgba.join(',') + ')');
          }
          
        });

      });
    });
      
  };
  
  $.fn.textgram.defaults = {
    // image: required
    x: 0,
    y: 0,
    width: 0, // set image.width if falsy value
    height: 0, // set image.height if falsy value
    repeat: 'no'
  };
    
}(jQuery));
