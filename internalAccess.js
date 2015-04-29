	console.log('this was run');
				var client = new Keen({
     				projectId:"5518d57496773d287121f42a",
     				readKey:"afc66511095c62632d15b67e6fd9b639f1f74689500dc4d959709d7256a036ccbc32ed8a743f9b61fdb551af132af68676cad7530906104cedce2b049f8276128f4194179a68eb63fd9636449683c89b0921f43aa9aa2c364d103b59b8ebca320b99eee035f7a037337aacfde35961d0"
     			});
				Keen.ready(function(){

				var query = new Keen.Query("count",{
    				eventCollection:"Viewed Home Page",
    				groupBy:"referrer",
            filters: [{"property_name":"url","operator":"contains","property_value":"stealthtrader"}]
             
        		});

	 
				var chart = new Keen.Dataviz()
  					.el(document.getElementById("my_chart"))
  					.chartType("piechart")
  					.prepare(); // starts spinner

				var req = client.run(query, function(err, res){
  					if (err) {
    				// Display the API error
    				chart.error(err.message);
  					}
  				else {
    			// Handle the response
    			chart
      			.parseRequest(this)
      			.title("Internal access homepage")
            .width(1000)
            .height(800)
      			.render();
 				 }
			});

		});