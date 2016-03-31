$(document).ready(function(){
	getLessonList();
	
	$("#save-lesson").click(function(){
		//save the lesson as loaded
		saveCurrentLesson();
		
		
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