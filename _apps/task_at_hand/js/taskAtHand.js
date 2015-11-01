﻿"use strict";
var TaskAtHandApp = function() {
	var appStorage = new AppStorage("taskAtHand");
	var version = " v1.0";
	var setStatus = function(message) {
		$("#app > footer").text(message);
	}
	this.start = function() {
		$("#new-task-name").keypress(function(e) {
			if (e.which == 13) { // Enter key 
				addTask();
				return false;
			}
			})
		.focus();

		$("#app > header").append(version);
		setStatus("ready");
		loadTaskList();
	};

	function addTask() {
		var taskName = $("#new-task-name").val();
		if (taskName) {
			addTaskElement(taskName);
			// Reset the text field
			$("#new-task-name").val("").focus();
		}
	}

	function addTaskElement(taskName) {
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		$("#task-list").append($task);
		
		$("button.delete", $task).click(function() {
			removeTask($task);
		});
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
		});
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
		});
		
		$("input.task-name", $task).change(function() {
		onChangeTaskName($(this));
		}).blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
		$("span.task-name", $task).click(function() {
			onEditTaskName($(this));
		});
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this));
		}).blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});

		$task.click(function() { 
			onSelectTask($task); 
		});
	}

	function onSelectTask($task) {
		if ($task) {
			// Unselect other tasks
			$task.siblings(".selected").removeClass("selected");
			// Select this task
			$task.addClass("selected");
		}
	}

	function removeTask($task){
		$task.remove();
		saveTaskList();
	}

	function moveTask($task, moveUp){
		if (moveUp) {
			$task.insertBefore($task.prev());
		} else {
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}

	function onEditTaskName($span) {
		$span.hide()
			.siblings("input.task-name")
			.val($span.text())
			.show()
			.focus();
	}

	function onChangeTaskName($input) {
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val()) {
			$span.text($input.val());
		}
		$span.show();
	}

	function saveTaskList() {
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text())
		});
		appStorage.setValue("taskList", tasks);
	}

	function loadTaskList() {
		var tasks = appStorage.getValue("taskList");
			if (tasks) {
				for (var i in tasks) {
				addTaskElement(tasks[i]);
			}
		}
	}
}

$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});