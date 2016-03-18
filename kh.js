var thing = "clobberin' time!";
var ajax_counter = 1;
var student_button_array = [];
var current_user = "";
var screen_keyboard = new ScreenKeyboard();

// Prevent the backspace key from navigating back.
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && 
             (
                 d.type.toUpperCase() === 'TEXT' ||
                 d.type.toUpperCase() === 'PASSWORD' || 
                 d.type.toUpperCase() === 'FILE' || 
                 d.type.toUpperCase() === 'SEARCH' || 
                 d.type.toUpperCase() === 'EMAIL' || 
                 d.type.toUpperCase() === 'NUMBER' || 
                 d.type.toUpperCase() === 'DATE' ||
				 d.type.toUppercase() === 'PASSWORD')
             ) || 
             d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});


$(document).ready(function(){
	getStudentList();
	$(".screen-keyboard").html(screen_keyboard.toHtml());
	$(".lesson-text").html("The quick brown fox jumps over the lazy dog");
	//pollServer(ajax_counter)
})


function getStudentList(){
	$.get("list-students.php", function(data,status){studentListReturned(data);});
}

function studentListReturned(returned_student_list){
	var student_list_array = returned_student_list.split(",")
	console.log("students:")
	for (student of student_list_array){
		var user_button = new UserButton(student);
		student_button_array.push(user_button);
		$("#user_select").append(user_button.toHtml());
		console.log(student)
	}
	$("#students").append(returned_student_list)
}

function pollServer(outgoing_message){
	$.get("poll.php?username=" + current_user, function(data,status){
	pollReturned(data);
	});
}


function pollReturned(incoming_message){
	if(incoming_message != ". "){
		var response = JSON.parse(incoming_message);
		if (response.action == "message"){
			$.jGrowl("MESSAGE: " + response.data1)
		}
	}
	
	ajax_counter ++;
	pollServer(ajax_counter)
}

function setUser(new_user){
	current_user = new_user;
	$(".current_user").html("Logged in as:" + current_user);
	$("#user_select").hide();
	console.log("user changed");
	pollServer("!!!!")
}
//handle keypresses
$(document).keypress(
	function( event ){
		var letter = String.fromCharCode(event.charCode).toLowerCase();
		
		if(event.shiftKey){letter = letter.toUpperCase();}
		
		var current_place = $(".typed-text").text().length;
		var correct_letter = $(".lesson-text").text().charAt(current_place);
		var next_letter = $(".lesson-text").text().charAt(current_place + 1);
		
		//console.log(event);
		if(letter === correct_letter){
			$(".typed-text").append("<span class = 'correct'>" + letter + "</span>");
		}
		else{
			$(".typed-text").append("<span class = 'incorrect'>" + letter + "</span>");
		}
		console.log("correct:" + correct_letter);
		console.log(String.fromCharCode(event.charCode));
		
		$(".screen-key").css("animation-duration", "0s");
		$("#screen-key-" + next_letter.toUpperCase()).css("animation-duration","0.2s");
		
	}
);



//objects

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

//UserButton Object
function UserButton(username){
	this.username = username;

}

UserButton.prototype.toHtml = function(){
	var username = this.username;
	var myHtml = "<div class ='user-button'>" + this.username + "</div>";
	myHtml = $(myHtml).click(function(){setUser(username)});
	return myHtml;
}


