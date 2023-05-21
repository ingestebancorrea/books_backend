import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Reseña } from "../interfaces/resena.interface";

@Schema()
export class Book {

   @Prop()
   titulo: string;

   @Prop()
   nombre_autor: string;

   @Prop()
   tipo_genero: string;

   @Prop()
   reseñas: Reseña[];

   @Prop()
   visitas: number;

   @Prop()
   image_url: string;

   @Prop()
   fecha_publicacion: string;

   @Prop()
   tipos_interes: string;

   @Prop()
   valoracion_libro: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);