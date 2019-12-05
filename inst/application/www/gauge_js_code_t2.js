// data which need to be fetched

var value;
var GaugeValueInputUpdate_t2;
// // var value1=0;
Shiny.addCustomMessageHandler("myCallbackHandlert2",         
    function(GaugeValueInputUpdate_t2) {
	
	var element = document.getElementById('svg_id_t2');
		if (element !=null) {
			element.parentNode.removeChild(element);
		};
	
     value=GaugeValueInputUpdate_t2;


 // value = Number(value);

var name = "";

// var value = 55;


var gaugeMaxValue = 100; 
var gaugeMinValue = -100; 

// data to calculate 
var percentValue = (100+value) / (gaugeMaxValue*2); 

////////////////////////

var needleClient;





(function(){

var barWidth, chart, chartInset, degToRad, repaintGauge,
    height, margin, numSections, padRad, percToDeg, percToRad, 
    percent, radius, sectionIndx, svg, totalPercent, width;



  percent = percentValue;

  numSections = 1;
  sectionPerc = 1 / numSections / 2;
  padRad = 0.025;
  chartInset = 10;

  // Orientation of gauge:
  totalPercent = .75;

  el = d3.select('.chart-gauge-t2');
    el.attr('id','chart-gauge-t2');

  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 20
  };

  // width = el[0][0].offsetWidth - margin.left - margin.right;
  width = 300;
  height = width;
  radius = Math.min(width, height) / 2;
  barWidth = (40 * width / 300)-20;



  //Utility methods 

  percToDeg = function(perc) {
    return perc * 360;
  };

  percToRad = function(perc) {
    return degToRad(percToDeg(perc));
  };

  degToRad = function(deg) {
    return deg * Math.PI / 180;
  };

  // Create SVG element
  svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
  // svg = el.append('svg').attr('width', width).attr('height', height + margin.top + margin.bottom);
	svg.attr('id', 'svg_id_t2');
  // Add layer for the panel
  chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left) / 2) + ", " + ((height + margin.top) / 2) + ")");


  chart.append('path').attr('class', "arc chart-first");
  chart.append('path').attr('class', "arc chart-second");
  chart.append('path').attr('class', "arc chart-third");


  arc3 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
  arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
  arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)

  repaintGauge = function () 
  {
    perc = 0.5;
    var next_start = totalPercent;
    arcStartRad = percToRad(next_start);
    arc1Rad = 1.483529864;
    arcEndRad = arcStartRad + arc1Rad;
    next_start += perc * (arc1Rad/Math.PI);


    arc1.startAngle(arcStartRad).endAngle(arcEndRad)

    arcStartRad = percToRad(next_start);
    arc2Rad = 0.174532925;
    arcEndRad = arcStartRad + arc2Rad;
    next_start += perc * (arc2Rad/Math.PI);

    arc2.startAngle(arcStartRad + padRad).endAngle(arcEndRad);
    
    arc3Rad = 1.483529864;
    arcStartRad = percToRad(next_start);  
    arcEndRad = arcStartRad + arc3Rad;

    arc3.startAngle(arcStartRad + padRad).endAngle(arcEndRad);

    chart.select(".chart-first").attr('d', arc1);
    chart.select(".chart-second").attr('d', arc2);
    chart.select(".chart-third").attr('d', arc3);


  }
/////////

    var dataset = [{metric:name, value: value}]

    var texts = svg.selectAll("text")
                .data(dataset)
                .enter();

    texts.append("text")
         .text(function(){
              return dataset[0].metric;
         })
         .attr('id', "Name_t2")
         .attr('transform', "translate(" + ((width + margin.left) / 6) + ", " + ((height + margin.top) / 1.5) + ")")
         .attr("font-size",25)
         .style("fill", "#ffffff");


    texts.append("text")
         .text(function(){
		 var perc_value;
		 if (GaugeValueInputUpdate_t2=='0') {
		 perc_value="0.000";
		 } else {
			perc_value = dataset[0].value;
			}
            return perc_value+"%";
         })
         .attr('id', "Value_t2")
         .attr('transform', "translate(" + ((width + margin.left) / 2.4) + ", " + ((height + margin.top) / 1.6) + ")")
         .attr("font-size",18)
         .style("fill", "#ffffff");




    texts.append("text")
        .text(function(){
            return gaugeMinValue;
        })
        .attr('id', 'scale0_t2')
        .attr('transform', "translate(" + ((width + margin.left) / 25 ) + ", " + ((30+height + margin.top) / 2) + ")")
        .attr("font-size", 15)
        .style("fill", "#ffffff");

    texts.append("text")
        .text(function(){
		// return value1;
            return 0;
        })
        .attr('id', 'scale10_t2')
        .attr('transform', "translate(" + ((width + margin.left) / 2.03 ) + ", " + ((height + margin.top) / 30) + ")")
        .attr("font-size", 15)
        .style("fill", "#ffffff");


    texts.append("text")
        .text(function(){
            return gaugeMaxValue;
        })
        .attr('id', 'scale20_t2')
        .attr('transform', "translate(" + ((width + margin.left) / 1.14 ) + ", " + ((30+height + margin.top) / 2) + ")")
        .attr("font-size", 15)
        .style("fill", "#ffffff");

  var Needle = (function() {

    //Helper function that returns the `d` value for moving the needle
    var recalcPointerPos = function(perc) {
      var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
      thetaRad = percToRad(perc / 2);
      centerX = 2;
      centerY = 0;
      topX = centerX - this.len * Math.cos(thetaRad);
      topY = centerY - this.len * Math.sin(thetaRad);
      leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
      leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
      rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
      rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
      return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
    };

    function Needle(el) {
      this.el = el;
      this.len = width / 2.5;
      this.radius = this.len / 8;
    }

    Needle.prototype.render = function() {
      this.el.append('circle').attr('class', 'needle-center').attr('cx', 2).attr('cy', 0).attr('r', this.radius);

        ///////
        /**
        *
        * I tried to add text here
        *
        */
        ///////

      return this.el.append('path').attr('class', 'needle').attr('id', 'client-needle_t2').attr('d', recalcPointerPos.call(this, 0));


    };

    Needle.prototype.moveTo = function(perc) {
      var self,
          oldValue = this.perc || 0;

      this.perc = perc;
      self = this;

      // Reset pointer position
      this.el.transition().delay(100).ease('quad').duration(200).select('.needle').tween('reset-progress', function() {
        return function(percentOfPercent) {
          var progress = (1 - percentOfPercent) * oldValue;

          repaintGauge(progress);
          return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
        };
      });

      this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle').tween('progress', function() {
        return function(percentOfPercent) {
          var progress = percentOfPercent * perc;

          repaintGauge(progress);
          return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
        };
      });

    };


    return Needle;

  })();



  needle = new Needle(chart);
  needle.render();
  needle.moveTo(percent);   

})();


    
});