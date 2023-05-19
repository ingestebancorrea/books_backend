import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateReseñaDto } from './dto/create-resena.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages, SuccessMessages } from 'src/common/enum';

@ApiTags('Book')
@Controller('')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOkResponse({ description: SuccessMessages.OK_RESPONSE })
  @ApiNotFoundResponse({ description: ErrorMessages.NOT_FOUND })
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get('books')
  findAll() {
    return this.booksService.findAll();
  }

  @ApiOkResponse({ description: SuccessMessages.OK_RESPONSE })
  @ApiNotFoundResponse({ description: ErrorMessages.NOT_FOUND })
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get('book/:id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch('book/:id/review')
  @ApiNotFoundResponse({ description: ErrorMessages.NOT_FOUND })
  @ApiBadRequestResponse({ description: ErrorMessages.BAD_REQUEST })
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  update(@Param('id') id: string, @Body() createReseñaDto: CreateReseñaDto) {
    return this.booksService.update(id, createReseñaDto);
  }

  @ApiNotFoundResponse({ description: ErrorMessages.NOT_FOUND })
  @ApiBadRequestResponse({ description: ErrorMessages.BAD_REQUEST })
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Patch('book/:id/visite')
  visiteUpdate(@Param('id') id: string){
    return this.booksService.visiteUpdate(id);
  }

  @ApiOkResponse({ description: SuccessMessages.OK_RESPONSE })
  @ApiNotFoundResponse({ description: ErrorMessages.NOT_FOUND })
  @ApiResponse({status:500, description: ErrorMessages.APPLICATION_ERROR})
  @Get('books/find')
  getBooksByTopicsInterest(@Query('topicsInterest') topicsInterest: string) {
    return this.booksService.getBooksByTopicsInterest(topicsInterest);
  }
}