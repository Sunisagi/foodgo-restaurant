import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LogClient',
        transport: Transport.GRPC,
        options: {
          url: 'log:50051',
          package: 'log',
          protoPath: join(__dirname, '/log.proto')
        },
      }
    ])
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule{}