import { IAuthService } from './interface/auth.interface';
import { IConfig } from './interface/config.interface';
import {
    Observable,
    of,
} from 'rxjs';
import {
    sign,
    verify,
    VerifyOptions,
} from 'jsonwebtoken';
import {
    mergeMap,
    tap,
} from 'rxjs/operators';
import {
    HttpException,
    HttpStatus,
} from '@nestjs/common';

export class Auth implements IAuthService {
    private readonly _signAlgorithm: 'RS256';
    protected _publicKey: Buffer;
    protected _privateKey: Buffer;
    private readonly _tokenTTL: string = '10m';
    private readonly _refreshTTL: string = '2h';
    protected _ignoreExpiration: boolean;

    constructor(
      private readonly _config: IConfig,
    ) {
        this._ignoreExpiration = !!this._config.auth.ignoreExpiration;
        this._publicKey = Buffer.from(this._config.auth.public, 'utf8');
        this._privateKey = Buffer.from(this._config.auth.private, 'utf8');
        this._signAlgorithm = 'RS256';
    }

    public generateToken(payload: Record<string, any>): Observable<any> {
        return of({
            accessToken: this._generateAccessToken(payload),
            refreshToken: this._generateRefreshToken(payload),
        });
    }

    private _generateAccessToken(payload: Record<string, any>): string {
        console.log('Generating access token with payload:', payload);
        return sign(payload, this._privateKey, {
            algorithm: this._signAlgorithm,
            expiresIn: this._tokenTTL,
        });
    }

    private _generateRefreshToken(payload: Record<string, any>): string {
        return sign({ id: payload.id }, this._privateKey, {
            algorithm: this._signAlgorithm,
            expiresIn: this._refreshTTL,
        });
    }

    public verifyToken(token: string): any {
        const verifyOpts: VerifyOptions = {
            algorithms: [this._signAlgorithm],
            ignoreExpiration: this._ignoreExpiration,
        };
        try {
            return verify(token, this._publicKey, verifyOpts);
        } catch (e) {
            return false;
        }
    }

    public refreshToken(token: any): Observable<any> {
        return of(this.verifyToken(token)).pipe(
          tap((result: any) => {
              if (!result) {
                  throw new HttpException(
                    'Invalid Token',
                    HttpStatus.BAD_REQUEST,
                  );
              }
          }),
          mergeMap((decoded: any) => {
              return this.generateToken(decoded);
          }),
        );
    }

    public generateJWT(payload: Record<string, any>): Observable<string> {
        return of(
          sign(payload, this._privateKey, {
              algorithm: this._signAlgorithm,
          }),
        );
    }

    public verifyTokenIgnoreExpiration(token: string): any {
        const verifyOpts: VerifyOptions = {
            ignoreExpiration: true,
        };
        try {
            return verify(token, this._privateKey, verifyOpts);
        } catch (e) {
            return false;
        }
    }
}
