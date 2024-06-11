import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './middleware/loggin.middleware';
import ConfigModule from './config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'postgres',
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
