var client = new Keen({
     		projectId:"5518d57496773d287121f42a",
     		readKey:"afc66511095c62632d15b67e6fd9b639f1f74689500dc4d959709d7256a036ccbc32ed8a743f9b61fdb551af132af68676cad7530906104cedce2b049f8276128f4194179a68eb63fd9636449683c89b0921f43aa9aa2c364d103b59b8ebca320b99eee035f7a037337aacfde35961d0"
     	});
  var timeframe = 'last_14_days';
  var colors = [
      "#56c5d1", // Add colors as desired.
  ];

  /*
  Histogram function
  ------------------------------------------------------------------------

  It shows the distribution of actions after the session begins.
  For example a few users make a payment within 10 seconds, most at
  30 seconds, some at 2min.

  */

  var histogram = function(selector, options) {

      if (!options) options = {};

      var config = {
          segment_length: options.segment_length || 20,
          data_points: options.data_points || 10
      };

      var queries = [];

      for (var i = 0; i < options.data_points; i++) {
          (function(index){
              var start_time = index * config.segment_length;
              var end_time = start_time + config.segment_length;
              var clone = JSON.parse(JSON.stringify(options.query_parameters));
              var q = new Keen.Query(options.analysis_type, clone);

               // Each data bucket contains values that are greater that or equal
              // (`gte`) to our starting value and less than (`lt`) our ending
              // value. Because we're using index positions to define `start_time`
              // and `end_time`, our buckets would look like 0-19, 20-39, 40-59,
              // and so on.
              q.params.filters.push(
                 {
                      'property_name':'session.age',  // In seconds
                      'operator':'gte',
                      'property_value': Number(start_time)
                 },{
                      'property_name':'session.age',
                      'operator':'lt',
                      'property_value': Number(end_time)
                 }
              );
              queries.push(q);
          })(i);
      }

      client.run(queries, function(err, response){
          // if (err) throw('Error!');

          var histogramData = [{ keys: 'Chart Title', values: [] }];
          var sum = 0;

          // Sum so we can calculate percentages
          Keen.utils.each(response, function(record,index){
              sum += record.result;
          });

          Keen.utils.each(response, function(record, index){
              var start_time = index * config.segment_length;
              var end_time = start_time + config.segment_length;
              histogramData[0].values.push({
                  'label' : start_time,
                  'value' : record.result / sum  // Calculate percentage
              });
          });

          nv.addGraph(function() {
              var chart = nv.models.discreteBarChart()
                  .margin({ top: 10, right: 0, bottom: 20, left: 50 })
                  .color([colors[0]])
                  .x(function(d) { return d.label; })
                  .y(function(d) { return d.value; })
                  .staggerLabels(false)
                  .tooltips(true)
                  .transitionDuration(250);

              chart.yAxis
                  .tickFormat(d3.format('.1%'));

              d3.select('#' + selector + ' svg.chart')
                  .datum(histogramData)
                  .call(chart);

              nv.utils.windowResize(chart.update);

              return chart;
          });
      });
  };



Keen.ready(function(){

  histogram('my_chart', {
      segment_length: 60,  // In seconds
      data_points: 10,  // i.e. There will be 10 bars on our chart
      analysis_type: 'count',
      query_parameters: {
          event_collection: 'session_end',
          timeframe: timeframe,
          filters: []
      }
  });

});

