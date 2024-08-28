import { IRepository } from '../../../common/interface/repository.interface'
import { IUserModel } from './model.interface'
import { Observable } from 'rxjs'

export interface IUserRepository extends IRepository<IUserModel> {
    find(filter?: any): Observable<IUserModel>
    save(model: IUserModel): Observable<{ id: string }>
    update(model: IUserModel): Observable<boolean>
    count(filter?: any): Observable<number>
    delete(id: string): Observable<boolean>
    getByUsername(username: string): Observable<IUserModel>
}
