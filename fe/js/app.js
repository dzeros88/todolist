(function (window) {
	'use strict';

	var renewTodoCount = function(){
		$('.todo-count').html('<strong>'
		+ $('.todo-list').children('li:not(.completed)').length
		+ '</strong> item left');
	};

	var addTodo = function(id, todo, completed){
		var completedClass = completed === 1 ? ' class="completed"' : '';
		var checked = completed === 1 ? ' checked' : '';
		$('.todo-list').prepend(
			'<li'+ completedClass +'>\
				<div class="view">\
					<input class="todo-id" type="hidden" value='+ id +'>\
					<input class="toggle" type="checkbox"'+ checked +'>\
					<label>'+ todo +'</label>\
					<button class="destroy"></button>\
				</div>\
			</li>'
		);
	};

	var updateTodo = function($li){
		var todoId = $li.find('.todo-id').val();
		var completed;
		$li.hasClass('completed') ? completed = 0 : completed = 1;
		var todoData = JSON.stringify({
			completed: completed
		});
		$.ajax({
			url: '/api/todos/' + todoId,
			type: 'PUT',
			data: todoData,
			contentType:"application/json"
		})
		.done(function() {
			completed === 1 ? $li.addClass('completed') : $li.removeClass('completed');
			renewTodoCount();
		})
		.fail(function(error){
			console.log(error.responseJSON);
			alert('Todo update를 실패했습니다.');
		});
	};

	var removeTodo = function($todo){
		var todoId = $todo.find('.todo-id').val();
		$.ajax({
			url: '/api/todos/' + todoId,
			type: 'DELETE'
		})
		.done(function() {
			$todo.remove();
			renewTodoCount();
		})
		.fail(function(error){
			console.log(error.responseJSON)
			alert('Todo 삭제를 실패했습니다.');
		});
	};

	//Get todo list using api via ajax when document is ready
	$(document).ready(function(){
		$.getJSON( '/api/todos', function( data ) {
			$.each(data, function(index, value) {
				addTodo(value.id, value.todo, value.completed);
			});
			renewTodoCount();
		});
	});

	//Input enter key event on .new-todo
	var $newTodo = $('.new-todo');
	$newTodo.keyup(function(e){
		//When enterKey
		if (e.keyCode == 13){
			var newTodo = $newTodo.val();
			var todoData = JSON.stringify({
				todo: newTodo
			});
			//Check input value isn't null
			if(newTodo){
				$.ajax({
					url: '/api/todos',
					type: 'POST',
					data: todoData,
					contentType:"application/json"
				})
				.done(function(data) {
					addTodo(data, newTodo);
					renewTodoCount();
				})
				.fail(function(error){
					alert(console.log(error.responseJSON));
				});
				$newTodo.val('');
			}
		}
	});

	//Click completed event on .toggle
	$('.todo-list').on('click', '.toggle', function(e){
		var $li = $(e.target).parents('li');
		updateTodo($li);
	});

	//Click destroy event on .destroy
	$('.todo-list').on('click', '.destroy', function(e){
		removeTodo($(e.target).parents('li'));
	});

	//Click clear completed click event on .clear-completed
	$('.clear-completed').click(function(e){
		$('.todo-list').children().each(function(index, item){
			if($(item).attr('class') === 'completed'){
				removeTodo($(item));
			}
		});
	});

	//Click all button event in .filters
	$('a[href="#/"]').click(function(e){
		e.preventDefault();
		$('.todo-list').children().each(function(index, item){
			$(item).show();
		});
	});

	//Click active button event in .filters
	$('a[href="#/active"]').click(function(e){
		e.preventDefault();
		$('.todo-list').children().each(function(index, item){
			if($(item).attr('class') === 'completed'){
				$(item).hide();
			} else{
				$(item).show();
			}
		});
	});

	//Click completed button event in .filters
	$('a[href="#/completed"]').click(function(e){
		e.preventDefault();
		$('.todo-list').children().each(function(index, item){
			if($(item).attr('class') !== 'completed'){
				$(item).hide();
			} else{
				$(item).show();
			}
		});
	});

})(window);
