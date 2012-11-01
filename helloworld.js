function hello() {
	console.debug("enter hello");
	var Group = StackMob.Model.extend({ schemaName: 'group' });
	var Groups = StackMob.Collection.extend({ model: Group });
	var myGroups = new Groups();
	var q = new StackMob.Collection.Query();
	q.equals('name', 'walvoil');
	console.debug("after q.equals");
	var esito="not evaluated";
	myGroups.query(q, {
		success: function(model) {
			
			var mygJSON = model.toJSON()[0];
			console.debug(mygJSON);
			
			esito="ok";
			document.getElementById("hello").innerHTML = mygJSON.name;
			writeTable();
	},
		error: function(model, response) {
			console.debug(response);
			esito="error";
			document.getElementById("hello").innerHTML = esito
	}});
//	var time=0;
//	while (esito == "not evaluated") {
//		time = time + 1;
//		console.debug(time);	
//		sleep(100);
//	};
	;
}

function getTimbrature() {
	console.debug("enter getTimbrature")
	var Timbratura = StackMob.Model.extend({ schemaName: 'timbraturaonline' });
	var Timbrature = StackMob.Collection.extend({ model: Timbratura });
	var myTimbrature = new Timbrature();
	var q = new StackMob.Collection.Query();
	q.equals('group_name', 'walvoil');
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
	document.getElementById('click').onclick = getTimbrature;
}
window.onload = start;

function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}

function writeTable() {
	document.write('<table border="1" cellspacing="1" cellpadding="5">')

	for(i = 0; i < 5; i++){
	   document.write('<tr>')
	   document.write('<td>row ' + i + ', column 0</td>')
	   document.write('<td>row ' + i + ', column 1</td>')
	   document.write('<td>row ' + i + ', column 2</td>')
	   document.write('</tr>')
	}

	//document.write('</table>')
}

function writeTimbrature(timbList) {
	document.write('<table border="1" cellspacing="1" cellpadding="5">')
	console.debug ("timbList.lenght=" + timbList.length);
	   document.write('<tr>')
	   document.write('<td><b>name</td>')
	   document.write('<td><b>action</td>')
	   document.write('<td><b>date</td>')
	   document.write('<td><b>time</td>')
	   document.write('<td><b>gps</td>')
	   document.write('</tr>')
	for(i = 0; i < timbList.length; i++){
		console.debug (i);
		var row = timbList[i];
	   document.write('<tr>')
	   document.write('<td>' + row.name + '</td>')
	   document.write('<td>' + row.action + '</td>')
	   document.write('<td>' + row.date + '</td>')
	   document.write('<td>' + row.time + '</td>')
	   document.write('<td>' + row.gps + '</td>')
	   document.write('</tr>')
	}

	document.write('</table>')
}
