import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    return this.tasks.filter((el) => {
      if (status && el.status === status) {
        return true;
      }
      if (search) {
        if (
          el.title.toLowerCase().includes(search) ||
          el.description.toLowerCase().includes(search)
        ) {
          return true;
        }
      }

      return false;
    });
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((el) => el.id === id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);

    return task;
  }

  deleteById(id: string): Task {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((el) => el.id !== id);
    return found;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    let newObj: null | Task = null;

    console.log('id', id);
    console.log('updateTaskDto', updateTaskDto);

    this.tasks = this.tasks.map((el) => {
      if (el.id === id) {
        newObj = { ...el, ...updateTaskDto };
        return newObj;
      }
      return el;
    });

    return newObj;
  }
}
