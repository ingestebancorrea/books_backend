import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema/books-schema';
import { CreateReseñaDto } from './dto/create-resena.dto';
import { Reseña } from './interfaces/resena.interface';
import { ObjectId } from 'mongodb';

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

  async addReview(id: string, createReseñaDto: CreateReseñaDto) {
    const existingBook = await this.findOne(id);

    if (!existingBook) throw new NotFoundException(`Book ${id} not found`);

    if (createReseñaDto) {
      await this.createReview(existingBook, createReseñaDto, id);
    }
  }

  async createReview(book: Book, createReseñaDto: CreateReseñaDto, bookId: string) {
    const newReseña: Reseña = {
      username: createReseñaDto.username,
      comentario: createReseñaDto.comentario,
      fecha: createReseñaDto.fecha,
      image_url: createReseñaDto.image_url,
      valoracion: createReseñaDto.valoracion
    };

    book.reseñas.push(newReseña);

    const newBook = new this.bookModel(book);
    return await newBook.save().then( async saveBook => {
      await this.calculateAndSaveAverageRating(bookId);
    });
  }

  visiteUpdate(id: string) {
    const filter = { _id: id }; // Filtro para encontrar el libro específico que deseas actualizar
    const update = { $inc: { visitas: 1 } }; // Incrementar el valor de 'visitas' en 1

    this.bookModel.findOneAndUpdate(filter, update).then( savedBook => {
      return 'Libro actualizado';
    });
  }

  async getBooksByTopicsInterest(topicsInterest: string) {
    const books = await this.bookModel.find({ topicos_interes: topicsInterest }).exec();
    return books;
  }

  async calculateAndSaveAverageRating(bookId: string) {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(bookId),// Filtra por bookId
        },
      },
      {
        $unwind: '$reseñas',// Descompone el arreglo 'reseñas'
      },
      {
        $group: {
          _id: '$_id',
          averageRating: {
            $avg: '$reseñas.valoracion',
          },
        },
      },
    ];

    const aggregationResult = await this.bookModel.aggregate(pipeline);

    if (aggregationResult.length > 0) {
      const averageRating = aggregationResult[0].averageRating;
      // Actualizar el campo 'valoracion' en el documento del libro especificado por su ID
      await this.bookModel.findOneAndUpdate(
        { _id: bookId },
        { valoracion_libro: averageRating }
      ).exec();
      return averageRating;
    } else {
      return 0;
    }
  }

}