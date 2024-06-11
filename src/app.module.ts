import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './middleware/loggin.middleware';
import ConfigModule from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../.env.local') });

console.log('Database Host:', process.env.DB_HOST);
console.log('Database Port:', process.env.DB_PORT);
console.log('Database Username:', process.env.DB_USERNAME);
console.log('Database Password:', process.env.DB_PASSWORD);
console.log('Database Name:', process.env.DB_NAME);

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{.ts,.js}'],
      synchronize: false,
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //범용적으로 적용한다면 *, 아니면 특정 컨트롤러를 적으면 됨
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
