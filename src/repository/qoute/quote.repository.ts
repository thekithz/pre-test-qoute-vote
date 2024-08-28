import { MongoRepository } from '../../common/mongo-repository'
import { IQuoteSchema } from './quote.schema'
import { Db } from 'mongodb'
import { IRepositoryMapping } from '../../common/interface/repository.interface'
import {
  from,
  Observable,
} from 'rxjs'
import { map } from 'rxjs/operators'
import {
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { ObjectId } from 'bson'
import { IQuoteModel } from '../../domain/qoute/interface/model.interface'
import { IQuoteRepository } from '../../domain/qoute/interface/repository.interface'

export class QuoteRepository extends MongoRepository<IQuoteModel> implements IQuoteRepository {
  constructor(
    db: Db,
    mapping: IRepositoryMapping<IQuoteModel, IQuoteSchema>
  ) {
    super(
      db.collection('quotes'),
      mapping
    )
  }

  public find(filter?: any): Observable<IQuoteModel> {
    const cursor = this._collection.find(filter).sort({ createdAt: -1 })
    return this.toObservable(cursor)
  }

  public save(model: IQuoteModel): Observable<{ id: string }> {
    const doc = this.toDocument(model)
    const promise = this._collection.insertOne(doc)
    return from(promise).pipe(
      map(result => {
        if (!result.insertedId) {
          throw new HttpException(
            `Cannot save user`,
            HttpStatus.INTERNAL_SERVER_ERROR
          )
        }
        return { id: result.insertedId.toString() }
      })
    )
  }

  public update(model: IQuoteModel): Observable<boolean> {
    const schema = this.toDocument(model)
    const id = schema._id
    delete schema._id
    const promise = this._collection.updateOne({
      _id: id
    }, {
      $set: schema
    })
    return from(promise).pipe(
      map(result => {
          if (result.modifiedCount === 0) {
            throw new HttpException(
              `Cannot Update User`,
              HttpStatus.INTERNAL_SERVER_ERROR
            )
          }
          return result.modifiedCount === 1
        }
      )
    )
  }

  public count(filter?: any): Observable<number> {
    const cursor = this._collection.find(filter).count()
    return from(cursor)
  }

  public delete(id: string): Observable<boolean> {
    const cursor = this._collection.deleteOne({ _id: new ObjectId(id) })
    return from(cursor).pipe(
      map((v) => {
        return v.deletedCount > 0
      })
    )
  }

  public getByID(id: string): Observable<IQuoteModel> {
    const promise = this._collection.findOne({ _id: new ObjectId(id) })
    return from(promise).pipe(
      map(user => this.toModel(user))
    )
  }

}
