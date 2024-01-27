import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  public postId: number;

  @IsString()
  @MaxLength(100)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public content: string;
}
