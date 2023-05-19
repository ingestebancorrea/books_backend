import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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
    @IsString()
    fecha: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    image_url: string;
}