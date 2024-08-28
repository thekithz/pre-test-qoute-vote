import { Observable } from 'rxjs'
import { IUserModel } from './model.interface'
import {
    ICreateUserValidator,
    IUpdateUserValidator,
} from './validator.interface'

export interface IUserService {
    getById(id: string): Observable<IUserModel>

    getAll(): Observable<IUserModel>

    save(input: ICreateUserValidator): Observable<{id: string}>

    challengeUserAccount(username: string, password: string): Observable<IUserModel>

    update(input: IUpdateUserValidator): Observable<boolean>

    delete(id: string): Observable<boolean>

    updateSession(userId: string, sessionId: string): Observable<boolean>
}
