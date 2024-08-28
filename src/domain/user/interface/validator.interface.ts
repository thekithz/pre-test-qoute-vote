
export interface ICreateUserValidator {
    getUsername(): string
    getPassword(): string
    getName(): string
    getEmail(): string
    getPhone(): string
    getCreatedBy(): string
    setCreatedBy(createdBy: string): void
}

export interface IUpdateUserValidator {
    getName(): string
    getEmail(): string
    getPhone(): string
    getUpdatedBy(): string
    setUpdatedBy(updatedBy: string): void
    getId(): string
    setId(id: string): void
}

export interface ILoginUserValidator {
    getUsername(): string
    getPassword(): string
}