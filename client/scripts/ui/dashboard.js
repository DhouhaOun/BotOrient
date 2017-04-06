(function ($) {
  'use strict';

  $('.same-height-cards').sameHeight(991);
  $(window).smartresize(function () {
    $('.same-height-cards').sameHeight(991);
  });

  var getRandomArbitrary = function() {
    return Math.round(Math.random() * 100);
  };

  var visits = [
    [0, getRandomArbitrary()],
    [1, getRandomArbitrary()],
    [2, getRandomArbitrary()],
    [3, getRandomArbitrary()],
    [4, getRandomArbitrary()],
    [5, getRandomArbitrary()],
    [6, getRandomArbitrary()],
    [7, getRandomArbitrary()],
    [8, getRandomArbitrary()]
  ];
  var visitors = [
    [0, getRandomArbitrary()],
    [1, getRandomArbitrary()],
    [2, getRandomArbitrary()],
    [3, getRandomArbitrary()],
    [4, getRandomArbitrary()],
    [5, getRandomArbitrary()],
    [6, getRandomArbitrary()],
    [7, getRandomArbitrary()],
    [8, getRandomArbitrary()]
  ];

  var plotdata = [{
    data: visits,
    color: '#fff'
  }];

  // Line chart
  /*jshint -W030 */
  $('.dashboard-line').length && $.plot($('.dashboard-line'), plotdata, {
    series: {
      lines: {
        show: true,
        lineWidth: 0,
      },
      splines: {
        show: true,
        lineWidth: 1
      }
    },
    grid: {
      borderWidth: 1,
      color: 'rgba(255,255,255,0.2)',
    },
    yaxis: {
      color: 'rgba(255,255,255,0.1)',
    },
    xaxis: {
      mode: 'categories'
    }
  });

  var barDataO = [{
    data: [
      [1391761856000, 80],
      [1394181056000, 40],
      [1396859456000, 20],
      [1399451456000, 20],
      [1402129856000, 50]
    ],
    bars: {
      show: true,
      barWidth: 7 * 24 * 60 * 60 * 1000,
      fill: true,
      lineWidth: 0,
      order: 1,
      fillColor: $.staticApp.primary
    }
  }, {
    data: [
      [1391761856000, 50],
      [1394181056000, 30],
      [1396859456000, 10],
      [1399451456000, 70],
      [1402129856000, 30]
    ],
    bars: {
      show: true,
      barWidth: 7 * 24 * 60 * 60 * 1000,
      fill: true,
      lineWidth: 0,
      order: 2,
      fillColor: $.staticApp.success
    }
  }];

  $.plot($('.dashboard-barO'), barDataO, {
    grid: {
      hoverable: false,
      clickable: false,
      labelMargin: 8,
      color: $.staticApp.border,
      borderWidth: 0,
    },
    xaxis: {
      show: false
    },
    stack: true
  });






  var barData2 = [{
    data: visits,
    bars: {
      show: true,
      barWidth: 0.05,
      align: 'center',
      fill: true,
      lineWidth: 0,
      fillColor: '#fff'
    }
  }];

  $.plot($('.dashboard-bar2'), barData2, {
    grid: {
      borderWidth: 0,
      aboveData: true,
    },
    yaxis: {
      color: 'rgba(255,255,255,0.1)',
    },
    xaxis: {
      mode: 'categories',
      tickLength: 0,
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Roboto',
      axisLabelPadding: 5,
      reserveSpace: true
    }
  });








  var plotdata2 = [{
    data: visits,
    color: $.staticApp.success
  }];

  // Line chart
  /*jshint -W030 */
  $('.dashboard-line2').length && $.plot($('.dashboard-line2'), plotdata2, {
    series: {
      lines: {
        show: true,
        lineWidth: 0,
        fill: false
      },
      points: {
        show: true,
        radius: 3,
        lineWidth: 1,
        fillColor: $.staticApp.success
      },
      splines: {
        show: true,
        //tension: 0.5,
        lineWidth: 1,
        //fill: 0.2,
      },
      shadowSize: 0
    },
    grid: {
      borderWidth: 0,
      hoverable: true,
    },
    xaxis: {
      show: false
    },
    yaxis: {
      show: false
    }
  });





  var data = [{
    label: 'IE',
    data: 34,
    color: $.staticApp.primary
  }, {
    label: 'Safari',
    data: 14,
    color: $.staticApp.info
  }, {
    label: 'Chrome',
    data: 15,
    color: $.staticApp.warning
  }];
  $.plot($('.pie-chart'), data, {
    series: {
      pie: {
        show: true,
        //innerRadius: 0.6,
        stroke: {
          width: 0
        },
        label: {
          show: false,
        }
      }
    },
    legend: {
      show: false
    }
  });


})(jQuery);
