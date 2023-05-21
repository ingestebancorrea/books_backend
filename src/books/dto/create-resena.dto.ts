import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class CreateReseñaDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    username: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    comentario: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsDate()
    fecha: Date;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    image_url: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    valoracion: string;

}