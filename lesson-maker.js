var objective_count = 0;
var objective_list = [];

$(document).click(function(){
	$("#objectives").val(JSON.stringify(objective_list));
});

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
	
	$("#objectives").val(data.objectives); //place JSON string in the objectives field
	$(".objective").remove(); //remove any old objective stuff from the DOM

	objective_list = []; // clear out old list
	var new_objective_list;
	try{
		new_objective_list = $.parseJSON(data.objectives) //load up the objectives from the ajax data
	}
	catch(e){
		new_objective_list = []; // if ajax data give invalid JSON, just go with empty array
	}
	

	$.each(new_objective_list,function(index,this_objective){//loop through objectives
		var new_objective = new Objective(this_objective.type); //create objective 
		objective_list.push(new_objective);//store it in the list
		
		// run the approprite setup function for the objective type
		if(new_objective.type == "complete"){
			new_objective.complete(new_objective.$h);
		}
		else if(new_objective.type == "char-count"){
			new_objective.charCount(new_objective.$h,this_objective.details.qty);
		}
		else if(new_objective.type == "marks"){
			new_objective.marks(new_objective.$h,this_objective.details.mark,this_objective.details.qty);
		}
	});
	
	
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

function addObjective(){
	
	new_o = new Objective();
	objective_list.push(new_o);
	return new_o;
}


Objective = function(type = 'none'){
	this.type = type;
	this.$h = this.setupHtml()
	this.details = {};
}

Objective.prototype.sqawk = function(){
	console.log("squawk")
}

Objective.prototype.setupHtml = function(){
	var _this = this;
	
	var $h = $("<div class = 'objective'>Objective</div>")
	// create the type selector
	$ts = $("<select class = 'objective-type'>"+
				"<option value = 'none' disabled = 'disabled' >Select an objective type</option>"+
				"<option value = 'marks'>Earn positive marks from teacher / peers</option>"+
				"<option value = 'char-count'>Type a certain number of characters</option>"+
				"<option value = 'complete'>Complete entire lesson text</option>"+
			"</select>"
			
	)
	
	$h.attr('id',("objective-" + objective_list.length));
	//select the correct item
	$ts.val(this.type).prop("selected",true);
	
	//attach change listener
	$ts.change(function(){
		//set the value in the object to that of the selected option.
		var new_type = $(this).find(":selected").val();
		_this.type = new_type;
		//in this context $(this) is a reference to the select object.  _this is how I wedged a reference to my Objective object in there.
		
		if(new_type == "marks"){_this.marks($h);}
		else if(new_type == "char-count"){_this.charCount($h);}
		else if(new_type == "complete"){_this.complete($h);}
	});
		
	//delete button
	$delete = $("<button value = 'X'>X</button>");
	
	$delete.click(function(){
		objective_list.splice(objective_list.indexOf(_this),1);
		$h.remove();
	})
	//put it together and add it to the DOM
	$h.append($ts);
	$h.append($delete);
	$h.append("<div class = objective-details/>")
	
	
	$("#objectives-area").append($h);
	
	return $h;
}
//these functions describe how to set up the gui for each type of objective
Objective.prototype.marks = function($h, mark_to_earn = "home-row",qty_to_earn="0"){
	var _this = this;
	var $m = $("<span />");
	
	
	var $mark_select = $(
		"<select>"+
			"<option value = 'posture'>Posture</option>"+
			"<option value = 'home-row'>Home row</option>"+
			"<option value = 'silent'>Silent</option>"+
			"<option value = 'on-task'>On task</option>"+
		"</select>"
	)
	
	//set the mark type
	$mark_select.val(mark_to_earn).prop("selected",true);
	
	
	
	//set the qty
	$mark_qty = $("<input type ='number' size = '1'></input>")
	$mark_qty.val(qty_to_earn);
	
	//attach listeners
	$mark_select.change(function(){
		_this.details.mark = $(this).find(":selected").val();
	});
	
	$mark_qty.change(function(){
		_this.details.qty = $(this).val();
	});
	
	//call listeners once
	$mark_select.change();
	$mark_qty.change();
	
	$m.append("Earn ")
	$m.append($mark_select);
	$m.append(" mark ");
	$m.append($mark_qty);
	$m.append(" times.")
	$h.find(".objective-details").html($m);
}

Objective.prototype.charCount = function($h, qty_to_type = "100"){
	var _this = this;
	var $c = $("<span />");
	
	//set the qty
	$qty = $("<input type ='number' size = '1'></input>")
	$qty.val(qty_to_type);
	
	//attach listeners
	
	$qty.change(function(){
		_this.details.qty = $(this).val();
	});
	
	//call listeners once
	$qty.change();
	
	$c.append("Type ")
	$c.append($qty);
	$c.append(" characters.")
	$h.find(".objective-details").html($c);
}

Objective.prototype.complete = function($h){
	var _this = this;
	var $c = $("<span />");
	
	
	$c.append("Type entire lesson. (Only use this with static lessons.)")
	$h.find(".objective-details").html($c);
}