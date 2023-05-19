import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema/books-schema';
import { CreateReseñaDto } from './dto/create-resena.dto';
import { Reseña } from './interfaces/resena.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Books') private bookModel: Model<Book>,
  ) { }

  async findAll() {
    return await this.bookModel.find();
  }

  async findOne(id: string) {
    return await this.bookModel.findById(id);
  }

  async update(id: string, createReseñaDto: CreateReseñaDto) {
    const existingBook = await this.findOne(id);

    if (!existingBook) throw new NotFoundException(`Book ${id} not found`);

    if (createReseñaDto) {
      await this.createReview(existingBook, createReseñaDto);
    }
  }

  async createReview(book: Book, createReseñaDto: CreateReseñaDto) {
    const newReseña: Reseña = {
      username: createReseñaDto.username,
      comentario: createReseñaDto.comentario,
      fecha: new Date(),
      image_url: createReseñaDto.image_url
    };

    book.reseñas.push(newReseña);

    const newBook = new this.bookModel(book);
    const savedBook = await newBook.save();
    return savedBook;
  }

  visiteUpdate(id: string) {
    const filter = { _id: id }; // Filtro para encontrar el libro específico que deseas actualizar
    const update = { $inc: { visitas: 1 } }; // Incrementar el valor de 'visitas' en 1

    this.bookModel.findOneAndUpdate(filter, update);
  }

  async getBooksByTopicsInterest(topicsInterest: string) {
    const books = await this.bookModel.find({ topicos_interes: topicsInterest }).exec();
    return books;
  }

}