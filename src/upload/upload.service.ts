import { Injectable } from '@nestjs/common';
import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nestjs-uploader-cloud-class',
        Key: fileName,
        Body: file,
      }),
    );
  }

  async getAllFiles(): Promise<string[]> {
    const bucketName = 'nestjs-uploader-cloud-class';

    // Use the listObjectsV2 method to retrieve information about objects in a bucket
    const response = await this.s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
      }),
    );

    // Extract file names from the response
    const files = response.Contents?.map((object) => object.Key) || [];
    return files;
  }
}
