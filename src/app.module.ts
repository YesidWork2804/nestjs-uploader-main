import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file/file.entity';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-3.crnakf5aj197.us-east-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'admin123',
      database: 'test',
      entities: [File],
      synchronize: true,
    }),
    UploadModule,
    FileModule,

    ConfigModule.forRoot({ isGlobal: true }),
  ],
  // controllers: [FileController], // Agrega el controlador aquí
  // providers: [FileService],
  // Agrega el controlador aquí
})
export class AppModule {}
