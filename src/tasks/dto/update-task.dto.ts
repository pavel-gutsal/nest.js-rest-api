import { IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
