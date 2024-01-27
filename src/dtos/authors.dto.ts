import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  public lastName: string;
}

export class UpdateAuthorDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  public lastName: string;
}

