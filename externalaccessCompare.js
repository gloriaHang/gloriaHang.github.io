var client = new Keen({
	projectId:"5518d57496773d287121f42a",
	readKey:"afc66511095c62632d15b67e6fd9b639f1f74689500dc4d959709d7256a036ccbc32ed8a743f9b61fdb551af132af68676cad7530906104cedce2b049f8276128f4194179a68eb63fd9636449683c89b0921f43aa9aa2c364d103b59b8ebca320b99eee035f7a037337aacfde35961d0"
     	});
Keen.ready(function(){
	var steps_facebook=[
		{
			eventCollection:"Viewed Home Page",
			actorProperty:"referrer",
			filters:[{
				"property_name":"referrer",
				"operator":"contains",
				"property_value":"facebook"
			}]
		},
         {
         	eventCollection:"Viewed Sign Up Page",
         	actorProperty:"referrer",
			filters:[{
				"property_name":"referrer",
				"operator":"contains",
				"property_value":"facebook"
			}]
          },
          {
          	eventCollection:"Viewed Sign In Page",
         	actorProperty:"referrer",
			filters:[{
				"property_name":"referrer",
				"operator":"contains",
				"property_value":"facebook"
			}]


          }
         ];
         var facebook= new Keen.Query("funnel",{
         	steps:steps_facebook
         });

    var steps_google=[
    	{
    		eventCollection:"Viewed Home Page",
    		actorProperty:"referrer",
			filters:[{
				"property_name":"referrer",
				"operator":"contains",
				"property_value":"google"
			}]
		},
		{
			eventCollection:"Viewed Sign Up Page",
			actorProperty:"referrer",
			filters:[{
				"property_name":"referrer",
				"operator":"contains",
				"property_value":"google"
			}]


		},
		{
			eventCollection:"Viewed Sign In Page",
			actorProperty:"referrer",
			filters:[{
				"property_name":"referrer",
				"operator":"contains",
				"property_value":"google"
			}]

		}



    ];
    var google = new Keen.Query("funnel",{
    	steps:steps_google
    });
	
	var steps_others= [
	{
		eventCollection:"Viewed Home Page",
		actorProperty:"referrer",
		filters: [{"property_name":"referrer","operator":"not_contains","property_value":"epcylon"},{"property_name":"referrer","operator":"not_contains","property_value":"google"},{"property_name":"referrer","operator":"not_contains","property_value":"facebook"},{"property_name":"referrer","operator":"not_contains","property_value":"stealthtrader"}]
	},
	{
		eventCollection:"Viewed Sign Up Page",
		actorProperty:"referrer",
		filters: [{"property_name":"referrer","operator":"not_contains","property_value":"epcylon"},{"property_name":"referrer","operator":"not_contains","property_value":"google"},{"property_name":"referrer","operator":"not_contains","property_value":"facebook"},{"property_name":"referrer","operator":"not_contains","property_value":"stealthtrader"}]
		
	},
	{
		eventCollection:"Viewed Sign In Page",
		actorProperty:"referrer",
		filters: [{"property_name":"referrer","operator":"not_contains","property_value":"epcylon"},{"property_name":"referrer","operator":"not_contains","property_value":"google"},{"property_name":"referrer","operator":"not_contains","property_value":"facebook"},{"property_name":"referrer","operator":"not_contains","property_value":"stealthtrader"}]
	}
	];

	var others = new Keen.Query("funnel",{
		steps:steps_others

	});



	var combinedFunnel = new Keen.Dataviz()
		.el(document.getElementById('my_chart'))
		.chartType("columnchart")
		.chartOptions({
			legend:{position:'right',textStyle: {color: 'blue', fontSize: 16}},
			orientation:'horizontal'
		})
		.title("External Visitors:facebook(1) VS google(2) VS others(3)")
		.width(1000)
		.height(800)
		.prepare();

		client.run([facebook,google,others],function(err,response){
			if (err){
				combinedFunnel.error(err.message);
			}
			else{
				var output={
					result:[],
					steps:steps_facebook
				};
			}
		Keen.utils.each(response[0].result, function(stepResult, i){
          output.result.push([
              response[0].steps[i].event_collection,
              response[0].result[i],
              response[1].result[i],
              response[2].result[i]
          ]);

		});
		 combinedFunnel
		.parseRawData(output)
		.render();
			
  });

});

