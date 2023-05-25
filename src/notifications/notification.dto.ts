import { IsNotEmpty, IsNumber, IsString, } from 'class-validator';
export class NotificationDto {
  @IsString()
  @IsNotEmpty({
    message: 'Message is required'
  })
  message: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'categoryId is required'
  })
  categoryId: number;
}