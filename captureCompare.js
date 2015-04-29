var client = new Keen({
     		projectId:"5518d57496773d287121f42a",
     		readKey:"afc66511095c62632d15b67e6fd9b639f1f74689500dc4d959709d7256a036ccbc32ed8a743f9b61fdb551af132af68676cad7530906104cedce2b049f8276128f4194179a68eb63fd9636449683c89b0921f43aa9aa2c364d103b59b8ebca320b99eee035f7a037337aacfde35961d0"
     	});

Keen.ready(function(){
	var capturG = new Keen.Query("funnel",{
		steps:[
		{
			eventCollection:"Captured",
			
    		actor_property: "email",
   			filters: [{"property_name":"email","operator":"contains","property_value":"gmail"}]
		}]
	});
	var capturY= new Keen.Query("funnel",{
		steps:[
		{

			eventCollection:"Captured",
			
    		actor_property: "email",
   			filters: [{"property_name":"email","operator":"contains","property_value":"yahoo"}]
   			

		}]
	});
	var capturO = new Keen.Query("funnel",{
		steps:[
		{
			eventCollection: "Captured",
    		
    		actor_property: "email",
    		filters: [{"property_name":"email","operator":"not_contains","property_value":"yahoo"},{"property_name":"email","operator":"not_contains","property_value":"gmail"}]
    		
		}
		]
	});
	

	var combinedFunnel = new Keen.Dataviz()
		.el(document.getElementById('my_chart'))
		.chartType("columnchart")
		.chartOptions({
			legend:{position:'right',textStyle: {color: 'blue', fontSize: 16}},
			orientation:'horizontal'
		})
		.title("Captured Visitors:gmail(1) VS yahoo(2) VS others(3)")
		.width(1000)
		.height(800)
		.prepare();

		client.run([capturG,capturY,capturO],function(err,response){
			if (err){
				combinedFunnel.error(err.message);
			}
			else{
				var output={
					result:[],
					steps:capturG
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