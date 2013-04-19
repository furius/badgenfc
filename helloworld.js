
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
				//getTimbrature(gname);
				group_name=gname;
				login_OK();
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
	document.getElementById("previous").style.visibility = 'hidden';
	document.getElementById("next").style.visibility = 'hidden';
	
}
window.onload = start;
var group_name;
var current_page = 0;
var total_records;
var rec_per_page = 20;

function login_OK() {
	document.getElementById("login_frame").innerHTML = '<div id="login_frame"></div>';
	total_records = GetRecordsNumber();
	current_page = 1;
	getTimbrature(false);
	renderButtons();
}




function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}

function validate(){
	var gname = document.getElementById('gname').value;
	var gpwd = document.getElementById('gpwd').value;
	checkGroup(gname, gpwd);
	
}


function getTimbrature(reset) {
	start_i = rec_per_page*(current_page-1) + 1;
	end_i = rec_per_page*current_page - 1;
	var gname = group_name;
	console.debug("enter getTimbrature")
	var Timbratura = StackMob.Model.extend({ schemaName: 'timbraturaonline' });
	var Timbrature = StackMob.Collection.extend({ model: Timbratura });
	var myTimbrature = new Timbrature();
	var q = new StackMob.Collection.Query();
	q.equals('group_name', gname);
	q.setRange(start_i-1,end_i-1).orderDesc('createddate');
	console.debug("after q.equals");
	var esito="not evaluated";
	myTimbrature.query(q, {
		success: function(model) {
			
			var myJSON = model.toJSON();
			console.debug(myJSON);
			console.debug(myJSON.length);
			if (reset) {document.getElementById("table").innerHTML = '<div id="content"></div>'};
			esito="ok";
			content_replacement = writeTimbrature(myJSON);
			document.getElementById("content").innerHTML = content_replacement;

			//document.getElementById("hello").innerHTML = mygJSON.action;
			//writeTable();
	},
		error: function(model, response) {
			console.debug(response);
			esito="error";
			document.getElementById("hello").innerHTML = esito
	}});

}

function GetRecordsNumber() {
	//Define your Todo class once on the page.
	var Timbratura = StackMob.Model.extend({ schemaName: 'timbraturaonline' });
	//Now, create a collection object and attach it to your previously created model (i.e. Todo)
	var Timbrature = StackMob.Collection.extend({ model: Timbratura }); 
	//create an instance of your Item collection
	var myTimbrature = new Timbrature();
	//set up the query you want to get the count for
	var q = new StackMob.Collection.Query();
	q.equals('group_name', group_name);
	//call count
	myTimbrature.count(q, {
	  success: function(count) {
		//console.log('count is:' + count );
		total_records = count * 1;
		renderButtons();
		//document.getElementById("hello").innerHTML = "total records: " + record_number ;
		//addCode(gname,2)
	  }
	});
}

function renderButtons() {
	document.getElementById("previous").style.visibility = 'hidden';
	document.getElementById("next").style.visibility = 'hidden';

	if (current_page == 1 && total_records > rec_per_page ) {
		//document.getElementById("previous").style.visibility = 'hidden';
		document.getElementById("next").style.visibility = 'visible';
	}
	if (current_page > 1 ) {
		document.getElementById("previous").style.visibility = 'visible';
		if (total_records > rec_per_page*current_page) {
			document.getElementById("next").style.visibility = 'visible';
		}
	}	
	
	//}
}

function getNextPage() {
	current_page ++ ;
	renderButtons();
	getTimbrature(true);
}

function getPreviousPage() {
	current_page -- ;
	renderButtons();
	getTimbrature(true);
}


function writeTimbrature(timbList) {
    var newPage = "" ;
	newPage += '<div class="myframe" id="table">';
	newPage +='<img src="res/badgenfc_icon.png" style="float:left; margin:5px;">';
    newPage += "<h3>Check-in check-out table</h3>";
	
	//newPage += '<table border="1" cellspacing="1" cellpadding="5">';
	newPage += '<table>';
	newPage += '<tr>';
	newPage += '<th><b>name</th>';
	newPage += '<th><b>custom_name</th>';
	newPage += '<th><b>action</th>';
	newPage += '<th><b>custom_field1</th>';
	newPage += '<th><b>date</th>';
	newPage += '<th><b>time</th>';
	newPage += '<th><b>gps</th>';
	newPage += '</tr>';
		for(i = 0; i < timbList.length; i++){
			console.debug (i);
			var row = timbList[i];
		   newPage +='<tr>'
		   newPage +='<td>' + row.name + '</td>'
		   newPage +='<td>' + row.custom_name + '</td>'
		   newPage +='<td>' + row.action + '</td>'
		   newPage +='<td>' + row.custom_field1 + '</td>'
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
	   newPage += '</div>';
		return newPage ;
	}




