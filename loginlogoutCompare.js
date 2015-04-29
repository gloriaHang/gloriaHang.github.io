var client = new Keen({
	projectId:"5518d57496773d287121f42a",
	readKey:"afc66511095c62632d15b67e6fd9b639f1f74689500dc4d959709d7256a036ccbc32ed8a743f9b61fdb551af132af68676cad7530906104cedce2b049f8276128f4194179a68eb63fd9636449683c89b0921f43aa9aa2c364d103b59b8ebca320b99eee035f7a037337aacfde35961d0"
     	});
Keen.ready(function(){
	var logA= [
	{
		eventCollection:"Logged In",
		actorProperty:"programVersion",
		filters: [{"property_name":"productName","operator":"contains","property_value":"Analytics"}]
	},
	{
		eventCollection:"Logged Out",
		actorProperty:"programVersion",
		filters: [{"property_name":"productName","operator":"contains","property_value":"Analytics"}]
	}
	];
	var analytics = new Keen.Query("funnel",{
		steps:logA

	});
	var logS = [
	{
		eventCollection:"Logged In",
		actorProperty:"programVersion",
		filters: [{"property_name":"productName","operator":"contains","property_value":"Stealth"}]
	},
	{
		eventCollection:"Logged In",
		actorProperty:"programVersion",
		filters: [{"property_name":"productName","operator":"contains","property_value":"Stealth"}]
	}
	];
	var stealth = new Keen.Query("funnel",{
		steps:logS
	});
	var combine = new Keen.Dataviz()
	.el(document.getElementById('my_chart'))
	.chartType("columnchart")
	.chartOptions({
			legend:{position:'right',textStyle: {color: 'blue', fontSize: 16}},
			orientation:'horizontal'
		})
	.title("LogIn&Logout with Analytics Professional(blue)  Stealth Trader(red)")
	.width(1000)
	.height(800)
	.prepare();

	client.run([analytics,stealth],function(err,response){
		if (err){
			combine.error(err.message)
		}
		else{
			var out ={
				result:[],
				steps:logA
			};
		}

		Keen.utils.each(response[0].result, function(stepResult, i){
          out.result.push([
              response[0].steps[i].event_collection,
              response[0].result[i],
              response[1].result[i]
              
          ]);

		});
		combine
		.parseRawData(out)
		.render();

	});
});