import { Injectable } from '@nestjs/common';
import { Todo } from 'src/entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private TodoRepository: Repository<Todo>) {

    }

    async getAll(): Promise<Todo[]> {
        return await this.TodoRepository.find();
    }

    async create(todo: Todo): Promise<Todo> {
        return await this.TodoRepository.save(todo);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.TodoRepository.delete(id);
    }

    async update(id: number, todo: Todo): Promise<UpdateResult> {
        return await this.TodoRepository.update(id, todo);
    }
}
