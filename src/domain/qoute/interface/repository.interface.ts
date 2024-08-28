import { IRepository } from '../../../common/interface/repository.interface'
import { Observable } from 'rxjs'
import { IQuoteModel } from './model.interface'

export interface IQuoteRepository extends IRepository<IQuoteModel> {
  find(filter?: any): Observable<IQuoteModel>

  save(model: IQuoteModel): Observable<{ id: string }>

  update(model: IQuoteModel): Observable<boolean>

  count(filter?: any): Observable<number>

  delete(id: string): Observable<boolean>

  getByID(id: string): Observable<IQuoteModel>
}