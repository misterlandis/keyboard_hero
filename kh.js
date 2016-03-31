var thing = "clobberin' time!";
var ajax_counter = 1;
var student_button_array = [];
var current_user = "";
//var screen_keyboard = new ScreenKeyboard("screen-keyboard.json");

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
	$(".screen-keyboard").load("screen-keyboard.html");
	$(".lesson-text").html("The quick brown fox jumps over the lazy dog named Dave.");
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
		
		if(next_letter == " "){
			$("#screen-key-space").css("animation-duration","0.2s");
		}
		else{
			$("#screen-key-" + next_letter.toUpperCase()).css("animation-duration","0.2s");
			
			if(next_letter == next_letter.toUpperCase()){
				$("#screen-key-lshift").css("animation-duration","0.2s");
			}
		}
		
		
		
	}
);



//objects

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


