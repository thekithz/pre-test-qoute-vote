import { IQuoteService } from './interface/service.interface';
import { IQuoteRepository } from './interface/repository.interface';
import { ICreateQuoteValidator, IUpdateQuoteValidator, IVoteQuoteValidator } from './interface/validator.interface';
import { defaultIfEmpty, Observable } from 'rxjs';
import { catchError, map, mergeMap, tap, throwIfEmpty } from 'rxjs/operators';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { QuoteBuilder } from './quote.builder';
import { IQuoteModel } from './interface/model.interface';
import * as _ from 'lodash';
import { VoteTransactionsBuilder } from '../vote-transactions/vote-transactions.builder';
import { IVoteTransactionsRepository } from '../vote-transactions/interface/repository.interface';
import { ObjectId } from 'bson';

export class QuoteService implements IQuoteService {
  constructor(
    private readonly _quoteRepository: IQuoteRepository,
    private readonly _voteTransactionsRepository: IVoteTransactionsRepository,
  ) {
  }

  public save(input: ICreateQuoteValidator): Observable<{ id: string }> {
    return this._quoteRepository.count({ funny_quote: input.getFunnyQuote() }).pipe(
      mergeMap((total: number) => {
        if (total === 0) {
          const builder = new QuoteBuilder();
          builder
            .setFunnyQuote(input.getFunnyQuote())
            .setCategoryName(input.getCategoryName())
            .setTotalVote(input.getTotalVote())
            .setCreatedAt(new Date())
            .setCreatedBy(input.getCreatedBy());
          return this._quoteRepository.save(builder.build());
        } else {
          throw new BadRequestException(`username: ${input.getFunnyQuote()} is duplicate`);
        }
      }),
    );
  }

  public searchQuote(keyword: string): Observable<IQuoteModel> {
    let filter = {};
    if (keyword) {
      filter['funny_quote'] = new RegExp(keyword, 'i');
    }
    return this._quoteRepository.find(filter).pipe(
      tap((content: IQuoteModel) => {
        if (_.isNil(content)) {
          throw new HttpException(
            'Search Not Found',
            HttpStatus.NOT_FOUND,
          );
        }
      }),
    );
  }

  public vote(input: IVoteQuoteValidator): Observable<{ success: boolean }> {
    return this._quoteRepository.getByID(input.getQuoteID()).pipe(
      mergeMap((model: IQuoteModel) => {
        const filter = {
          user_id: new ObjectId(input.getUserID()),
        };
        return this._voteTransactionsRepository.find(filter).pipe(
          map((voteModel) => {
            if (voteModel) {
              throw new HttpException(
                'Users Cannot Voting.',
                HttpStatus.BAD_REQUEST,
              );
            }
          }),
          defaultIfEmpty(null),
          map(() => model),
        )
      }),
      catchError(err => {
        throw err;
      }),
      mergeMap((quoteModel: IQuoteModel) => {
        const totalVote = quoteModel.getTotalVote() + 1;
        quoteModel.setTotalVote(totalVote);

        return this._quoteRepository.update(quoteModel).pipe(
          map(() => quoteModel),
        );
      }),
      mergeMap(() => {
        const builderVote = new VoteTransactionsBuilder();
        builderVote
          .setQuoteID(input.getQuoteID())
          .setUserID(input.getUserID())
          .setTotalVote(1)
          .setCreatedAt(new Date())
          .setCreatedBy(input.getCreatedBy());
        return this._voteTransactionsRepository.save(builderVote.build()).pipe(
          map((voteRes) => {
            if (voteRes.id) {
              return {success: true}
            } else {
              return {success: false}
            }
          })
        )
      }),
    );
  }

  public getById(id: string): Observable<IQuoteModel> {
    const queryById = {
      _id: new ObjectId(id),
    };
    return this._quoteRepository.find(queryById).pipe(
      throwIfEmpty(() => {
        throw new HttpException(
          `User Not Found`,
          HttpStatus.NOT_FOUND,
        );
      }),
    );
  }

  public updateQuote(id: string, input: IUpdateQuoteValidator): Observable<{ success: boolean }> {
    return this._quoteRepository.getByID(id).pipe(
      map((model) => {
        if (input.getFunnyQuote()) {
          model.setFunnyQuote(input.getFunnyQuote());
        }
        if (input.getCategoryName()) {
          model.setCategoryName(input.getCategoryName());
        }
        model.setUpdatedBy(input.getUpdatedBy());
        return this._quoteRepository.update(model);
      }),
      map(() => {
        return { success: true };
      }),
    );
  }

  public deleteQuote(id: string): Observable<{ id: string }> {
    return this._quoteRepository.getByID(id).pipe(
      throwIfEmpty(() => {
        throw new HttpException(`Quote Not Found`, HttpStatus.NOT_FOUND);
      }),
      mergeMap((model) => {
        return this._quoteRepository.delete(id).pipe(
          map((res) => {
            if (res) {
              return { id };
            }
          }),
        );
      }),
    );
  }
}