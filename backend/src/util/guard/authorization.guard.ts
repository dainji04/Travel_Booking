import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean  {
        const allowedRoles = this.reflector.get<string[]>('allowedRoles',context.getHandler())
        const req = context.switchToHttp().getRequest()
        const result = req?.currentUser?.Roles.map((role:string) => allowedRoles.includes(role)).find((val:boolean) => val === true);
        if(result) return true
        throw new UnauthorizedException('Sorry , you are not authorized')
    }
}