import { IRepository } from '../../../common/interface/repository.interface'
import { IVoteTransactionsModel } from './model.interface'
import { Observable } from 'rxjs'

export interface IVoteTransactionsRepository extends IRepository<IVoteTransactionsModel> {
  find(filter?: any): Observable<IVoteTransactionsModel>

  save(model: IVoteTransactionsModel): Observable<{ id: string }>

  update(model: IVoteTransactionsModel): Observable<boolean>

  count(filter?: any): Observable<number>

  delete(id: string): Observable<boolean>

}