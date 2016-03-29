
function ScreenKey(character,x,y,color,decoration = ""){
		this.character = character;
		this.x = x;
		this.y = y;
		this.color = color;
		this.decoration = decoration;
}

ScreenKey.prototype.toHtml = function(){
	var myHtml = $("<span class = 'screen-key'>")
		.html(this.character)
		.css("backgroundColor",this.color)
		.css("left", $('.screen-keyboard').offset().left + this.x + "px")
		.css("top", $('.screen-keyboard').offset().top + this.y + "px")
		.attr("id","screen-key-" + this.character)
		//.append("<div class = 'key-decoration'>"+this.decoration+"</div?")
		//.append("<div class = 'key-letter'>" + this.character + "</div>")
	return myHtml;
}