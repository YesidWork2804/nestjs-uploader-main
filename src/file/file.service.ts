// file.service.ts
import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly configService: ConfigService,
  ) {}

  async create(file: File): Promise<File> {
    return this.fileRepository.save(file);
  }

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async deleteFile(id: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: 'nestjs-uploader-cloud-class',
        Key: id,
      });
      const response = await this.s3Client.send(command);

      console.log(response);

      return this.fileRepository.delete(id);
    } catch (error) {
      console.error('Error al eliminar el objeto de S3:', error);
      throw error; // O maneja el error de otra manera según tus necesidades
    }
  }
}
