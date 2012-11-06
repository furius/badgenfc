function start()   {  
	var urltext = document.location.href;
	if (urltext.indexOf('?') != -1) {
		var longlat = urltext.substring((urltext.indexOf('?')+1),urltext.length);
		console.debug(longlat);
	}
	var n=longlat.split("=");
	console.debug(n[0]);
	console.debug(n[1]);
	var coo = n[1].split(";")
	var position = new google.maps.LatLng(coo[0],coo[1]);
    var myOptions = {
      zoom: 15,
      center: position,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(
        document.getElementById("map_canvas"),
        myOptions);
 
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: longlat
    });  
}

window.onload = start;
