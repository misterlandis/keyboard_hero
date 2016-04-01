var objective_count = 0;

$(document).ready(function(){
	getLessonList();
	
	$("#save-lesson").click(function(){
		//save the lesson as loaded
		saveCurrentLesson();
	});
	
	$("#new-objective-button").click(function(){
		addObjective();
	});
})

function getLessonList(){
	
	$.ajax({
		dataType: "json",
		url: "list-lessons.php", 
		success: function(data,status){
			lessonListReturned(data);
			}
		})

}

function lessonListReturned(data){
	
	
	$lm = $("#lesson-menu");
	$lm.html("");
	
	$pq = $("#prerequisites");
	$pq.html("");
	//set up the buttons
	$.each(data, function(index, lesson){
		//set up lesson slect buttons
		
		
		$lesson = $("<div class = 'lesson-button'>" +
			lesson.title +
			"</div>");
			
		$lesson.click(function(){
			getLesson(lesson.id);
		});
		
		$lm.append($lesson);
		//set up checkboxes for prereqs
		$checkbox = $("<input type = 'checkbox' class ='required' value = '" + lesson.id + "'> ");
		$pq.append($checkbox);
		$pq.append(lesson.title)
		$pq.append("<br/>")
		
	})
	
	$lm.append("<div class = 'lesson-button'>New Lesson</div>").click(function(){
		$('#lesson-edit').trigger("reset");
		$("#lesson-id").val("new")
	})
	
	
}

function getLesson(id){
 
	
	$.ajax({
		dataType: "json",
		url: "get-lesson.php?id=" + id,
		success: function(data,status){
			lessonReturned(data);
			}
	})
}

function lessonReturned(data){

	$("#lesson-id").val(data.id);

	$("#title").val(data.title);
	$("#type").val(data.type);
	
	//prerequisite checkboxes
	var preqs = data.prerequisites.split(",");
	$(":checkbox").prop("checked",false);
	$.each(preqs, function(index, value){
		if(value != ""){
			$(":checkbox[value="+ value +"]").prop("checked","true");
		}
	});
	
	$("#objectives").val(data.objectives);
	$("#content").val(data.content);
	//console.log(data.visible);
	if(data.visible == 1){
		$(":checkbox[value=visible]").prop("checked","true");
	}
}

function saveCurrentLesson(){
	var id = $("#lesson-id").val();
	var title = $("#title").val();
	var type = $("#type").val();
	
	var prerequisites = [];
	var checkboxes = $(".required:checkbox:checked")
	
	
	//get prerequisites from checkbox states
	checkboxes.each(
		function(id,checkbox){
			prerequisites.push(checkbox.value);
		}
	);
	
	var objectives = $("#objectives").val();
	var content = $("#content").val();
	
	var visible;
	
	if($("#visible").is(":checked")){
		visible = 1;
	}
	else{
		visible = 0;
	}
	
	$.ajax({
		url:"save-lesson.php",
		method:"get",
		data:{
			"id":id,
			"title":title,
			"type":type,
			"prerequisites":prerequisites.join(","),
			"objectives":objectives,
			"content":content,
			"visible":visible
		},
		success: function(data,status){
			
			//debug: display response from server
			//$("#debug").html(data);
			getLessonList();
		}
	
	})
}
//objective handling stuff
/*
function addObjective(){
	objective_count ++;
	$new_obj = $( 
		"<div class = 'objective' id='objective-" + objective_count + "'>"+
			objective_count + ". "+
			"<select class = 'objective-type'>"+
				"<option value = '' disabled = 'disabled' selected='selected'>Select an objective type</option>"+
				"<option value = 'marks'>Earn positive marks from teacher / peers</option>"+
				"<option value = 'char-count'>Type a certain number of characters</option>"+
				"<option value = 'complete'>Complete entire lesson text</option>"+
			"</select>"+
		"<div class = 'objective-details' id= 'objective-details-" + objective_count + "'/>"


	);
	
	$("#objectives-area").append($new_obj);
	$(".objective-type").change(function(e){
		var value = e.target.value;
		console.log(e);
		var $objective_details = $(e.target.parentNode).find(".objective-details");
		
		if(value == "marks"){
			$objective_details.html(
			"<div class = 'objective-details' id = 'objective-details-"+ objective_count +"'>"+
				"Earn <select>"+
					"<option value = 'posture'>Posture</option>"+
					"<option value = 'home-row'>Home row</option>"+
					"<option value = 'silent'>Silent</option>"+
					"<option value = 'on-task'>On task</option>"+
				"</select>"+
				" mark <input type='text' size = '1'></input> times."+
			"</div><br />"
			
			)
		}
		else if(value == "char-count"){
			$objective_details.html(
			"<div class = 'objective-details'>"+
				"Student will correctly type "+
				"<input type='text' size = '1'></input> characters."+
			"</div>")
		}
		else if(value == "complete"){
			$objective_details.html("<div class = 'objective-details'>Student will complete the entire text of the lesson.</div>")
		}
		
	});
}

function objectivesToJson(){
	var objectives_array = [];
	var $objectives = $(".objective");
	//console.log($objectives)
	
	$objectives.each(function(value,index){
		console.log(value);
		var objective_object = {};
		objective_object.type = $(value).find(".objective-details")
		
		objectives_array.push(objective_object);
		//console.log(value);
	
	});
	return objectives_array

}
*/
function addObjective(list){
	
	new_o = new Objective();
	list.push(new_o);
	return new_o;
}

ObjectiveList = function(){
}

Objective = function(){
}

Objective.prototype.sqawk = function(){
	console.log("squawk")
}

var objective_list = new ObjectiveList();
