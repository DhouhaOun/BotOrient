(function($) {
  $.fn.sameHeight = function(width) {
    return this.each(function() {
      $(this).each(function() {
        if ($(this).find('.card').prop('style')['height'].length) {
          $(this).find('.card').css('height', '');
        }
        if ($(window).width() <= width) {
          $(this).find('.card').css('height', '');
        } else {
          $(this).find('.card').height($(this).height());
        }
      });
    });
  }
}(jQuery));