import {
    ICreateUserValidator, ILoginUserValidator,
    IUpdateUserValidator
} from '../../domain/user/interface/validator.interface'
import {
    IsDefined,
    IsString,
} from 'class-validator'

export class CreateUserValidator implements ICreateUserValidator {
    @IsDefined()
    private username: string

    @IsDefined()
    private password: string

    @IsString()
    private name: string
    @IsString()
    private email: string
    @IsString()
    private phone: string

    private createdBy: string

    getCreatedBy(): string {
        return this.createdBy
    }

    getPassword(): string {
        return this.password
    }

    getName(): string {
        return this.name
    }

    getEmail(): string {
        return this.email
    }

    getPhone(): string {
        return this.phone
    }

    getUsername(): string {
        return this.username
    }

    setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy
    }
}

export class UpdateUserValidator implements IUpdateUserValidator {
    @IsString()
    private email: string

    @IsString()
    private name: string

    private phone: string

    private updatedBy: string

    private id: string

    getName(): string {
        return this.name
    }

    getEmail(): string {
        return this.email
    }

    getPhone(): string {
        return this.phone
    }

    getUpdatedBy(): string {
        return this.updatedBy
    }

    setUpdatedBy(updatedBy: string): void {
        this.updatedBy = updatedBy
    }

    getId(): string {
        return this.id
    }

    setId(id: string) {
        this.id = id
    }

}

export class LoginUserValidator implements ILoginUserValidator {
    @IsDefined()
    private username: string

    @IsDefined()
    private password: string

    getUsername(): string {
        return this.username
    }

    getPassword(): string {
        return this.password
    }
}
