$(document).ready(function(){
	getLessonList();
	
	$("#save-lesson").click(function(){
		//save the lesson as loaded
		
		
		
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
	//console.log(data[0]);
	
	$lm = $("#lesson-menu");
	$lm.html("")
	
	$pq = $("#prerequisites");
	//set up the buttons
	$.each(data, function(index, lesson){
		//set up lesson slect buttons
		console.log(lesson);
		
		$lesson = $("<div class = 'lesson-button'>" +
			lesson.title +
			"</div>");
			
		$lesson.click(function(){
			getLesson(lesson.id);
		});
		
		$lm.append($lesson);
		//set up checkboxes for prereqs
		$checkbox = $("<input type = 'checkbox' name ='required' value = '" + lesson.id + "'> ");
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
	console.log(data.visible);
	if(data.visible == 1){
		$(":checkbox[value=visible]").prop("checked","true");
	}
	
	
	
	
}