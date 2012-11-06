function getTimbrature(gname) {
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

function checkGroup(gname,gpwd) {
	var Group = StackMob.Model.extend({ schemaName: 'group' });
	var Groups = StackMob.Collection.extend({ model: Group });
	var myGroups = new Groups();
	var q = new StackMob.Collection.Query();
	q.equals('name', gname);
	myGroups.query(q, {
		success: function(model) {
			
			var myJSONGroup = model.toJSON();
			console.debug(myJSONGroup);
			if (myJSONGroup[0].password==gpwd) {
				getTimbrature(gname);
			} else {
				document.getElementById("error").innerHTML = "Wrong name or password!";
			}
			//document.getElementById("hello").innerHTML = mygJSON.action;
			//writeTable();
		},
		error: function(model, response) {
			console.debug(response);
			document.getElementById("error").innerHTML = "Error on query! Try again later ...";
			
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
		   //newPage +='<td>' + row.gps '</td>'
		   //<a target="_blank" href="http://www.html.it">visita HTML.IT</a>
		   if (row.gps != "-") {
			newPage +='<td><a target="_blank" href="test_map.html?gps=' + row.gps + '">' + row.gps + '</a></td>';
		   } 
		   else {
			newPage +='<td>' + row.gps + '</td>';
		   }
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
	checkGroup(gname, gpwd);
	
}

