import { ICreateQuoteValidator, IUpdateQuoteValidator, IVoteQuoteValidator } from './validator.interface'
import { Observable } from 'rxjs'
import { IQuoteModel } from './model.interface'

export interface IQuoteService {

  save(input: ICreateQuoteValidator): Observable<{id: string}>

  searchQuote(keyword: string): Observable<IQuoteModel>

  vote(input: IVoteQuoteValidator): Observable<{ success: boolean }>

  getById(id: string): Observable<IQuoteModel>

  updateQuote(id: string, input: IUpdateQuoteValidator): Observable<{success: boolean}>

  deleteQuote(id: string): Observable<{ id: string }>
}