	var client = new Keen({
     		projectId:"5518d57496773d287121f42a",
     		readKey:"afc66511095c62632d15b67e6fd9b639f1f74689500dc4d959709d7256a036ccbc32ed8a743f9b61fdb551af132af68676cad7530906104cedce2b049f8276128f4194179a68eb63fd9636449683c89b0921f43aa9aa2c364d103b59b8ebca320b99eee035f7a037337aacfde35961d0"
     	});
	Keen.ready(function(){
		var analyzer = new Keen.Query("count",{
			    eventCollection: "Show Analyzer",
    			groupBy: "Control",
    			filters: [{"property_name":"Symbol","operator":"exists","property_value":true}],
  

		});
		client.draw(analyzer,document.getElementById("my_chart"),{
			library:"google",
			chartType:"areachart",
			width:1000,
			height:800,
			title:"Show Analyzer Function"

		});
	});