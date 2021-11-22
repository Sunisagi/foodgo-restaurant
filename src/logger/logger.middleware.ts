import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
        private readonly logger : LoggerService,
        ) { }
    use(req: Request, res: Response, next: NextFunction) {
        const data = {
            host: req.hostname,
            url: req.baseUrl,
            ip: req.ip,
            method: req.method,
            status: res.statusCode
        };
        res.on('finish', () => {
            data['status'] = res.statusCode;
            this.logger.genLog(data.ip,data.host,data.method,data.url,data.status);
        })        
        next();
    }
}
