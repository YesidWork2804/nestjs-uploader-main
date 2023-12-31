import {
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { FileService } from '../file/file.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly fileService: FileService, // private readonly fileService: FileService, // private readonly fileService: FileService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.uploadService.upload(file.originalname, file.buffer);
  }

  // @Delete('/:id')
  // delete(@Param('id') id:string) {
  //   return this.fileService.deleteFile(id);
  // }
}
