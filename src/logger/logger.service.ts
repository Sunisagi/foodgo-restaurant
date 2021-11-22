import {ConsoleLogger, Inject, Injectable, Logger, OnModuleInit, Scope } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class LoggerService extends ConsoleLogger implements OnModuleInit {
    private logService;

    constructor(
      @Inject('LogClient') private logClient: ClientGrpc,
    ){ super() }

    onModuleInit() {
      this.logService = this.logClient.getService('LogsService');
    }

  error(message: any) {
    // add your tailored logic here

    super.error.apply(this, arguments);
  }

  log(message: any, dateTime?) {
    this.logService.createLog({
      dateTime : dateTime || Date(),
      log : message
    }).subscribe();
    super.log(message);
  }
}