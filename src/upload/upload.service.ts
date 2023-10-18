import { Injectable } from '@nestjs/common';
import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  DeletedObject,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { FileService } from 'src/file/file.service';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}

  async upload(fileName: string, file: Buffer) {
    const response = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nestjs-uploader-cloud-class',
        Key: fileName,
        Body: file,
      }),
    );

    await this.fileService.create({
      name: fileName,
      path: `https://nestjs-uploader-cloud-class.s3.amazonaws.com/${fileName}`,
    });
  }
}
