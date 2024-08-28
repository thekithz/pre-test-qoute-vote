import { IRepositoryMapping } from '../../common/interface/repository.interface';
import { IUserModel } from '../../domain/user/interface/model.interface';
import { IUserSchema } from './user.schema';
import { UserBuilder } from '../../domain/user/user.builder';
import { ObjectId } from 'bson';
import * as _ from 'lodash';

export class UserRepositoryMapping implements IRepositoryMapping<IUserModel, IUserSchema> {
  deserialize(schema: IUserSchema): IUserModel {
    const builder = new UserBuilder();
    builder
      .setId(schema._id.toHexString())
      .setUsername(schema.username)
      .encryptedPassword(schema.password, schema.salt)
      .setEmail(schema.email)
      .setPhone(schema.phone)
      .setName(schema.name)
      .setSuspended(schema.suspended)
      .setCreatedAt(schema.createdAt)
      .setCreatedBy(schema.createdBy)
      .setUpdatedAt(schema.updatedAt)
      .setUpdatedBy(schema.updatedBy)
      .setSessionId(schema.sessionId)
    return builder.build();
  }

  serialize(model: IUserModel): IUserSchema {
    return {
      _id: _.isNil(model.getId())
        ? new ObjectId()
        : new ObjectId(model.getId()),
      username: model.getUsername(),
      password: model.getPassword(),
      salt: model.getSalt(),
      name: model.getName(),
      email: model.getEmail(),
      phone: model.getPhone(),
      suspended: model.isSuspended(),
      createdAt: model.getCreatedAt(),
      createdBy: model.getCreatedBy(),
      updatedAt: model.getUpdatedAt(),
      updatedBy: model.getUpdatedBy(),
      sessionId: model.getSessionId(),
    };
  }

}
