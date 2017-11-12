(function ( $ ) {
  $.fn.dingsThumb = function(options) {
    return this.each(function() {
      var loaded = false;
      var opts = $.extend( {}, $.fn.dingsThumb.defaults, options );
      var box = $(this), boxHeight = box.height(), boxWidth = box.width(), cover = opts.cover, loading = opts.loading, bg =opts.background, vertical = opts.vertical, horizon =opts.horizon;
      var img = box.find('img'), src = img.attr('src'), alt = img.attr('alt'), cls = img.attr('class');
      function thumbAdjust() {
        var obj = box.find('img');
        boxHeight = box.height(), boxWidth = box.width();
        thumb.width(boxWidth).height(boxHeight);
        var boxRatio = boxHeight / boxWidth;
        var imgHeight = obj.height(), imgWidth = obj.width(), imgRatio = imgHeight / imgWidth;
        var referCalc = (imgRatio / boxRatio) > 1, refer = cover === true ? referCalc : !referCalc;
        var valuesSize = (function() {
          var value = [];
          if (refer === true) {
            value[0] = '100%';
            value[1] = 'auto';
          } else {
            value[0] = 'auto';
            value[1] = '100%';
          }
          return value;
        })();
        obj.css({
          'position':'absolute',
          'display':'inline-block',
          'width':valuesSize[0],
          'height':valuesSize[1]
        });
        var modifiedImgW = obj.width(), modifiedImgH = obj.height();
        var valuesPosition = (function() {
          var value = [];
          if (horizon === 'left') {
            value[0] = 0;
          } else if (horizon === 'right') {
            value[0] = boxWidth - modifiedImgW;
          } else  {
            value[0] = (boxWidth / 2) - (modifiedImgW / 2);
          }
          if (vertical === 'top') {
            value[1] = 0;
          } else if (vertical === 'bottom') {
            value[1] = boxHeight - modifiedImgH;
          } else {
            value[1] = (boxHeight / 2) - (modifiedImgH / 2);
          }
          return value;
        })();
        obj.css({
          'top':valuesPosition[1],
          'left':valuesPosition[0]
        });
      }
      function thumbNoloading() {
        $('<img class="image-adjusted" alt="'+ alt +'" class="'+ cls +'">').attr("src", src).load(function() {
          $(this).appendTo(thumb).siblings('img').remove();
          thumbAdjust();
        });
      }
      function thumbLoading() {
        $('<img class="image-adjusted loaded" alt="'+ alt +'" style="display:none;" class="'+ cls +'">').attr("src", src).load(function() {
          $(this).appendTo(thumb).fadeIn('slow').siblings('img').remove();
          thumbAdjust();
        });
      }
      if (loaded === false) {
        var imageObj = loading === false ? thumbNoloading() : thumbLoading();
        var source = $('<div class="thumb-wrapper"></div>').css({'position' : 'relative', 'overflow' : 'hidden', 'background' : bg, 'width' : boxWidth, 'height' : boxHeight});
        box.wrapInner(source);
        var thumb = box.find('.thumb-wrapper');
        loaded = true;
      }
      $(document).ready(thumbAdjust);
      $(window).on('load resize', thumbAdjust);
    });
  };
  $.fn.dingsThumb.defaults = {
      cover : true,
      loading : false,
      background : '#fff',
      vertical : 'center',
      horizon : 'center'
  };
}( jQuery ));
