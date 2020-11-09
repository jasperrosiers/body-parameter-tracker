import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        if (!req.headers.authorization) {
            return false;
        }
        if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        const token = req.headers.authorization.split(' ')[1];

        return token === this.configService.get<string>('BEARER_TOKEN');
    }
}
