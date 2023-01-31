import { Controller , Get, Post, Delete, Body, Param, Put} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from 'src/entity/todo.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('todo')
export class TodoController {
    constructor(private todoservice: TodoService) {

    }

    @Get()
    async getAll(): Promise<Todo[]> {
        return await this.todoservice.getAll();
    }

    @Post()
    async create(@Body() todo: Todo): Promise<Todo>  {
        return await this.todoservice.create(todo);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.todoservice.delete(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() todo: Todo): Promise<UpdateResult> {
        return await this.todoservice.update(id, todo);
    }
}
