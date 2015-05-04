var client = new Keen({
     		projectId:"5518d57496773d287121f42a",
     		readKey:"afc66511095c62632d15b67e6fd9b639f1f74689500dc4d959709d7256a036ccbc32ed8a743f9b61fdb551af132af68676cad7530906104cedce2b049f8276128f4194179a68eb63fd9636449683c89b0921f43aa9aa2c364d103b59b8ebca320b99eee035f7a037337aacfde35961d0"
     	});


Keen.ready(function(){

	
	 var logoutMi = new Keen.Query("minimum",{
		 eventCollection: "Logged Out",
    	targetProperty: "duration",
    	groupBy: "programVersion",
    	timefram:"last_14_days",
    	interval:"daily"


  });
	 var logoutMa = new Keen.Query("maximum",{
	 	 eventCollection: "Logged Out",
    	targetProperty: "duration",
    	groupBy: "programVersion",
    	timefram:"last_14_days",
    	interval:"daily"

	 });
	 var logoutA = new Keen.Query("average",{
	 	eventCollection: "Logged Out",
    	targetProperty: "duration",
    	groupBy: "programVersion",
    	timefram:"last_14_days",
    	interval:"daily"
	 });
	 var chart = new Keen.Dataviz()
	 .el(document.getElementById("my_chart"))
	 .chartType("linechart")
	 .title("logout dreation with StealthTrader")
	 .prepare();

	 client.run([logoutMi,logoutMa,logoutA], function(err, res){ // run the queries

     var result1 = res[0].result  // data from first query
     var result2 = res[1].result  // data from second query
     var result3 = res[2].result
     var data = []  // place for combined results
     var i=0

    while (i < result1.length) {

        data[i]={ // format the data so it can be charted
            timeframe: result1[i]["timeframe"],
            value: [
                { category: "minimum", result: result1[i]["value"] },
                { category: "maximum", result: result2[i]["value"] },
                { category:"average",result:result3[i]["value"]}
            ]
        }
        if (i == result1.length-1) { // chart the data
      chart
        .parseRawData({ result: data })
        .render();
        }
        i++;
    }
});
});


	
