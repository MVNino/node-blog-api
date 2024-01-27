import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public title: string;

  @IsString()
  @MaxLength(255)
  public description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public content: string;
}

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  public title: string;

  @IsString()
  @MaxLength(255)
  public description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public content: string;
}