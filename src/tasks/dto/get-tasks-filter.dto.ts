import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search?: string;
}
