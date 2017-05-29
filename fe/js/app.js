(function (window) {
	'use strict';

	var renewTodoCount = function(){
		$('.todo-count').html('<strong>'
		+ $('.todo-list').children('li:not(.completed)').length
		+ '</strong> item left');
	};

	var addTodo = function(todo){
		$('.todo-list').prepend(
			'<li>\
				<div class="view">\
					<input class="toggle" type="checkbox">\
					<label>'+ todo +'</label>\
					<button class="destroy"></button>\
				</div>\
			</li>'
		);
		renewTodoCount();
	};

	var updateTodo = function($li){
		$li.hasClass('completed') ? $li.removeClass('completed') : $li.addClass('completed');
		renewTodoCount();
	};

	var removeTodo = function($todo){
		$todo.remove();
		renewTodoCount();
	};

	//Input enter key event on .new-todo
	var $newTodo = $('.new-todo');
	$newTodo.keyup(function(e){
		//When enterKey
		if (e.keyCode == 13){
			var newTodo = $newTodo.val();
			//Check input value isn't null
			if(newTodo){
				addTodo(newTodo);
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

})(window);
