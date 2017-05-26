(function (window) {
	'use strict';

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

})(window);
