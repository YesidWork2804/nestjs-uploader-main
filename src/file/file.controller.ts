// file.controller.ts
import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import { FileService } from './file.service';
import { File } from './file.entity';
import { Console } from 'console';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() file: File): Promise<File> {
    return this.fileService.create(file);
  }

  @Get()
  findAll(): Promise<File[]> {
    return this.fileService.findAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.fileService.deleteFile(id);
  }
}
