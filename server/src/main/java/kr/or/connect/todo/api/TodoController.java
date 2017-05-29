package kr.or.connect.todo.api;

import java.util.Collection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService service;
	
	@Autowired
	public TodoController(TodoService service) {
		this.service = service;
	}
	
	@GetMapping
	Collection<Todo> readList() {
		return service.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Integer create(@RequestBody Todo todo) {
		return service.create(todo);
	}
	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void update(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
		service.update(id, (Integer)payload.get("completed"));
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void delete(@PathVariable Integer id) {
		service.delete(id);
	}
}
