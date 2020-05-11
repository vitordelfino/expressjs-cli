import express, { Application, Request, Response, NextFunction } from 'express';
import { Namespace, createNamespace } from 'continuation-local-storage';
import cors from 'cors';
import { ErrorHandler } from 'express-handler-errors';
import morgan from 'morgan-body'
import routes from './routes';
import logger from './middlewares/Logger';
import 'reflect-metadata';

class App {
  public readonly express: Application;

  private readonly session: Namespace;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandle();

    this.session = createNamespace('request');
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(cors());

    const reqId = require('express-request-id');

    this.express.use(reqId());
    this.express.use((req: Request, _: Response, next: NextFunction) => {
      this.session.run(() => {
        this.session.set('id', req.id);
        next()
      })
    })
    morgan(this.express, {
      noColors: true,
      prettify: false,
      logReqUserAgent: false,
      stream: {
        write: (msg: string) => logger.log(msg),
      },
    });
  }

  private errorHandle(): void {
    this.express.use(
      (err: Error, _: Request, res: Response, next: NextFunction) => {
        new ErrorHandler().handle(err, res, next);
      }
    );
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
