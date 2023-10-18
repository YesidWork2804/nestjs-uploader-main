import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}

// import { Module } from '@nestjs/common';
// import { UploadController } from './upload.controller';
// import { UploadService } from './upload.service';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';
// import { ConfigService } from '@nestjs/config';
// import { FileController } from 'src/file/file.controller';
// import { FileService } from 'src/file/file.service';
// import { FileModule } from '../file/file.module';

// @Module({
//   imports: [
//     ThrottlerModule.forRootAsync({
//       useFactory: (configService: ConfigService) => ({
//         ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
//         limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [UploadController],
//   providers: [
//     UploadService,
//     {
//       provide: APP_GUARD,
//       useClass: ThrottlerGuard,
//     },
//   ],
// })
// export class UploadModule {}
