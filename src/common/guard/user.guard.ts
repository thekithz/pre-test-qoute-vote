import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common'
import {
    forkJoin,
    Observable,
    of,
} from 'rxjs'
import * as jwt from 'jsonwebtoken'
import {
    map,
    mergeMap,
} from 'rxjs/operators'
import * as _ from 'lodash'
import { providerNames } from '../../provider/provider.name'
import { IUserService } from '../../domain/user/interface/service.interface'
import { IUserModel } from '../../domain/user/interface/model.interface'

@Injectable()
export class UserGuard implements CanActivate {

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const headers = request.headers
        const profileJwt = headers['authorization']
        const user = jwt.decode(profileJwt.split(' ')[1])
        return !!user
    }
}

export class ProfileSessionGuard implements CanActivate {
    private readonly _memoryStorage: Map<string, any>

    constructor(
        @Inject(providerNames.USER_SERVICE)
        private readonly _userService: IUserService,
    ) {
        this._memoryStorage = new Map()
    }

    public getSessionFromProfileId(id: string): Observable<string> {
        const profile = this._memoryStorage.get(id)
        const now = Date.now()
        console.log(profile)
        if ((!profile || (profile.iat < now - 5000)) && !_.isNil(id)) {
            return this._userService.getById(id).pipe(
                map((model: IUserModel) => {
                    if (_.isNil(model)) {
                        return ''
                    }

                    this._memoryStorage.set(id, {
                        iat: Date.now(),
                        sessionId: model.getSessionId(),
                    })
                    return model.getSessionId()
                }),
            )
        }
        return of(profile.sessionId)
    }

    public canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const headers = request.headers
        const profileJwt = headers['authorization']
        const profile: any = jwt.decode(profileJwt.split(' ')[1])
        return forkJoin([
            of(!!profile),
            of(_.get(profile, 'id', '')).pipe(
                mergeMap((id) => {
                    return this.getSessionFromProfileId(id)
                }),
                map(result => {
                    return result === request.session.id
                }),
            ),
        ]).pipe(
            map(results => {
                return results[0] && results[1]
            }),
        )
    }
}
