import TodoRepository from "@/src/domain/repositories/todo-repository";

class DeleteTodoUseCase {

    constructor(private todoRepository: TodoRepository) { }

    async execute(id: string): Promise<void> {
        await this.todoRepository.deleteTodo(id);
    }
};