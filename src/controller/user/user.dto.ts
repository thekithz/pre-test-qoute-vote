import { IUserModel } from '../../domain/user/interface/model.interface'
import * as _ from 'lodash'

export interface IUserDto {
    id: string
    username: string
    name: string
    email: string
    phone: string
    createdAt: number
    updatedBy: string
    updatedAt: number
}

export class UserDto {
    public static toUserDto(model: IUserModel): IUserDto {
        let createdAt = null
        if (!_.isNil(model.getCreatedAt())) {
            createdAt = model.getCreatedAt().getTime()
        }

        let updatedAt = null
        if (!_.isNil(model.getUpdatedAt())) {
            updatedAt = model.getUpdatedAt().getTime()
        }

        return {
            id: model.getId(),
            username: model.getUsername(),
            name: model.getName(),
            email: model.getEmail(),
            phone: model.getPhone(),
            createdAt,
            updatedBy: model.getUpdatedBy(),
            updatedAt,
        }
    }
}
