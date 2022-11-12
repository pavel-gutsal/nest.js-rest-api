import { IsNotEmpty, MinLength } from 'class-validator';

// changes to be inserted here
export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @MinLength(6)
  description: string;
}
