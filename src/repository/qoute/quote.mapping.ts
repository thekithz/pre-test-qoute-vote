import { IRepositoryMapping } from '../../common/interface/repository.interface';
import { IQuoteSchema } from './quote.schema'
import { ObjectId } from 'bson';
import * as _ from 'lodash';
import { IQuoteModel } from '../../domain/qoute/interface/model.interface'
import { QuoteBuilder } from '../../domain/qoute/quote.builder'

export class QuoteRepositoryMapping implements IRepositoryMapping<IQuoteModel, IQuoteSchema> {
  deserialize(schema: IQuoteSchema): IQuoteModel {
    const builder = new QuoteBuilder();
    builder
      .setId(schema._id.toHexString())
      .setFunnyQuote(schema.funny_quote)
      .setCategoryName(schema.category_name)
      .setTotalVote(schema.total_vote)
      .setCreatedAt(schema.createdAt)
      .setCreatedBy(schema.createdBy)
      .setUpdatedAt(schema.updatedAt)
      .setUpdatedBy(schema.updatedBy);
    return builder.build();
  }

  serialize(model: IQuoteModel): IQuoteSchema {
    return {
      _id: _.isNil(model.getId())
        ? new ObjectId()
        : new ObjectId(model.getId()),
      funny_quote: model.getFunnyQuote(),
      category_name: model.getCategoryName(),
      total_vote: model.getTotalVote(),
      createdAt: model.getCreatedAt(),
      createdBy: model.getCreatedBy(),
      updatedAt: model.getUpdatedAt(),
      updatedBy: model.getUpdatedBy()
    };
  }

}
