//screen-keyboard Object

function ScreenKeyboard(map_url){
	console.log("creating screen-keyboard")
	this.map_url = map_url;	
	//this.keyboard_map;
	this.loadXml();
}




ScreenKeyboard.prototype.toHtml = function(){
	
	keys_html = $("<div/ class = 'screen-keyboard'>");
	keys_html.html(this.keyboard_map);
	
	$("#screen-keyboard").html(keys_html);
	
	
	
}

ScreenKeyboard.prototype.loadXml = function(){
	console.log("sending request for keyboard map")
	
	$.ajax({
		context:this,
		url:this.map_url,
		datatype:"json",
		error:function(xhr,status,error){console.log("AJAX error:" + error);},
		success:function(keyboard_map,status){
			console.log("recieved:");
			//console.log(keyboard_map);
			
			for(row in keyboard_map.rows){
			
				for(key in keyboard_map.rows[row].keys){
				
					console.log(keyboard_map[row][key]);
				
				}
			}
			
		}
	
	})
}




