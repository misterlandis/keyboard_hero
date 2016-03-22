//screen-keyboard Object

function ScreenKeyboard(){
	this.top_row = "QWERTYUIOP".split("");
	this.middle_row = "ASDFGHJKL;'".split("");
	
	this.bottom_row = "ZXCVBNM,./".split("");
	this.bottom_row.push("shift");
	this.bottom_row.unshift("shift");
	this.colors = ["red","#3366FF","orange","magenta","magenta","#EEEE00","#EEEE00","#00FF00","pink","cyan","cyan"];
	this.homerow="ASDFJKL;".split("");
	this.keys = [];
}

ScreenKeyboard.prototype.toHtml = function(){
	
	keys_html = $("<div/>");
	offset_x = 10;
	offset_y = 10;
	
	
	for(var i = 0; i<this.top_row.length; i++){
		var new_key = new ScreenKey(this.top_row[i],offset_x + i *77,offset_y + 0,this.colors[i]);
		this.keys.push(new_key);
		keys_html.append(new_key.toHtml());
	}
	for(var i = 0; i<this.middle_row.length; i++){
		console.log(this.homerow);
		console.log(this.middle_row[i]);
		console.log($.inArray(this.middle_row[i],this.homrerow));
		if(this.homerow.indexOf(this.middle_row[i]) == -1){
			var new_key = new ScreenKey(this.middle_row[i],offset_x + 15 + i *77, offset_y + 77,this.colors[i]);
		}
		else{
			var new_key = new ScreenKey(this.middle_row[i],offset_x + 15 + i *77,offset_y + 77,this.colors[i],"\u2606");
		}
		this.keys.push(new_key);
		keys_html.append(new_key.toHtml());
	}
	for(var i = 0; i<this.bottom_row.length; i++){
		var new_key = new ScreenKey(this.bottom_row[i],offset_x + 30+ i *77,offset_y + 154,this.colors[i]);
		this.keys.push(new_key);
		keys_html.append(new_key.toHtml());
	}
	
	keys_html.find("#screen-key-" + "shift").css("backgroundColor", "brown").css("width","110px");
	
	return keys_html;
	
}
