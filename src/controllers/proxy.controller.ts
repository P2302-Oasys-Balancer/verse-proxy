import {
  Controller,
  Post,
  Get,
  Headers,
  Body,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IncomingHttpHeaders } from 'http';
import { RealIP } from 'nestjs-real-ip';
import { Response } from 'express';
import { ProxyService, TypeCheckService } from 'src/services';
import { VerseRequestResponse, RequestContext } from 'src/entities';

const packageInfo = require('../../package.json');

@Controller()
export class ProxyController {
  constructor(
    private configService: ConfigService,
    private readonly typeCheckService: TypeCheckService,
    private readonly proxyService: ProxyService,
  ) { }

  @Get('health')
  async health(
    @Res() res: Response,
  ) {
    res.status(200).send({ status: 'OK', name: packageInfo.name, version: packageInfo.version });
  }

  @Post()
  async post(
    @RealIP() ip: string, // https://github.com/p0vidl0/nestjs-real-ip#under-the-hood
    @Headers() headers: IncomingHttpHeaders,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const requestContext = {
      ip,
      headers,
    };
    const isUseReadNode = !!this.configService.get<string>('verseReadNodeUrl');
    await this.handler(isUseReadNode, requestContext, body, res);
  }

  @Post('master')
  async postMaster(
    @RealIP() ip: string, // https://github.com/p0vidl0/nestjs-real-ip#under-the-hood
    @Headers() headers: IncomingHttpHeaders,
    @Body() body: any,
    @Res() res: Response,
  ) {
    const requestContext = {
      ip,
      headers,
    };
    const isUseReadNode = false;
    await this.handler(isUseReadNode, requestContext, body, res);
  }

  async handler(
    isUseReadNode: boolean,
    requestContext: RequestContext,
    body: any,
    res: Response,
  ) {
    const callback = (result: VerseRequestResponse) => {
      console.log('===controller callback:', result)
      const { status, data } = result;
      res.status(status).send(data);
    };

    if (this.typeCheckService.isJsonrpcArrayRequestBody(body)) {
      await this.proxyService.handleBatchRequest(
        isUseReadNode,
        requestContext,
        body,
        callback,
      );
    } else if (this.typeCheckService.isJsonrpcRequestBody(body)) {
      await this.proxyService.handleSingleRequest(
        isUseReadNode,
        requestContext,
        body,
        callback,
      );
    } else {
      throw new ForbiddenException(`invalid request`);
    }
  }
}
