function getTimbrature(gname,gpwd) {
	console.debug("enter getTimbrature")
	var Timbratura = StackMob.Model.extend({ schemaName: 'timbraturaonline' });
	var Timbrature = StackMob.Collection.extend({ model: Timbratura });
	var myTimbrature = new Timbrature();
	var q = new StackMob.Collection.Query();
	q.equals('group_name', gname);
	console.debug("after q.equals");
	var esito="not evaluated";
	myTimbrature.query(q, {
		success: function(model) {
			
			var myJSON = model.toJSON();
			console.debug(myJSON);
			console.debug(myJSON.length);
			
			esito="ok";
			writeTimbrature(myJSON);
			//document.getElementById("hello").innerHTML = mygJSON.action;
			//writeTable();
	},
		error: function(model, response) {
			console.debug(response);
			esito="error";
			document.getElementById("hello").innerHTML = esito
	}});

}



function start() {
	//document.getElementById('click').onclick = getTimbrature;
	document.getElementById('login').onclick = validate;
}
window.onload = start;

function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}

function writeTimbrature(timbList) {
    var newPage = "<html><head><title>Results</title>";
	newPage += '<link rel="stylesheet" href="mystyle.css">'
    newPage += "</head><body>";
    newPage += "<h3>Check-in check-out table</h3>";
	
	//newPage += '<table border="1" cellspacing="1" cellpadding="5">';
	newPage += '<table>';
	newPage += '<tr>';
	newPage += '<th><b>name</th>';
	newPage += '<th><b>action</th>';
	newPage += '<th><b>date</th>';
	newPage += '<th><b>time</th>';
	newPage += '<th><b>gps</th>';
	newPage += '</tr>';
		for(i = 0; i < timbList.length; i++){
			console.debug (i);
			var row = timbList[i];
		   newPage +='<tr>'
		   newPage +='<td>' + row.name + '</td>'
		   newPage +='<td>' + row.action + '</td>'
		   newPage +='<td>' + row.date + '</td>'
		   newPage +='<td>' + row.time + '</td>'
		   newPage +='<td>' + row.gps + '</td>'
		   newPage +='</tr>'
		}


	   newPage += '</table>';
	
	
	
    newPage += "</body></html>";
    // write it in one blast
    document.write(newPage);
    // close writing stream
    document.close( );


}


function validate(){
	var gname = document.getElementById('gname').value;
	var gpwd = document.getElementById('gpwd').value;
	
	getTimbrature(gname, gpwd);
}
