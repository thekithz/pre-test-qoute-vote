import { IRepositoryMapping } from '../../common/interface/repository.interface';
import { IVoteTransactionsSchema } from './vote-transactions.schema';
import { ObjectId } from 'bson';
import * as _ from 'lodash';
import { IVoteTransactionsModel } from '../../domain/vote-transactions/interface/model.interface';
import { VoteTransactionsBuilder } from '../../domain/vote-transactions/vote-transactions.builder';

export class VoteTransactionsRepositoryMapping implements IRepositoryMapping<IVoteTransactionsModel, IVoteTransactionsSchema> {
  deserialize(schema: IVoteTransactionsSchema): IVoteTransactionsModel {
    const builder = new VoteTransactionsBuilder();
    builder
      .setId(schema._id.toHexString())
      .setQuoteID(schema.quote_id.toHexString())
      .setUserID(schema.user_id.toHexString())
      .setTotalVote(schema.total_vote)
      .setCreatedAt(schema.createdAt)
      .setCreatedBy(schema.createdBy)
      .setUpdatedAt(schema.updatedAt)
      .setUpdatedBy(schema.updatedBy);
    return builder.build();
  }

  serialize(model: IVoteTransactionsModel): IVoteTransactionsSchema {
    return {
      _id: _.isNil(model.getId())
        ? new ObjectId()
        : new ObjectId(model.getId()),
      quote_id: new ObjectId(model.getQuoteID()),
      user_id: new ObjectId(model.getUserID()),
      total_vote: model.getTotalVote(),
      createdAt: model.getCreatedAt(),
      createdBy: model.getCreatedBy(),
      updatedAt: model.getUpdatedAt(),
      updatedBy: model.getUpdatedBy(),
    };
  }

}
