import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);

  const rmqHost = configService.get('rmq.host');
  const rmqPort = configService.get('rmq.port');
  const rmqConsumerQueue = configService.get('rmq.consumerQueue');
  
  
  const port = configService.get('port');

  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://${rmqHost}:${rmqPort}`],
  //     queue: rmqConsumerQueue,
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50052',
      package: 'log',
      protoPath: join(__dirname, '/restaurant/log.proto')
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
