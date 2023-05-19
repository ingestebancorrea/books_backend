import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsArray } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsArray()
    reseñas: string[];
}