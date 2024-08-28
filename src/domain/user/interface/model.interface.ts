import { IEntity } from '../../../common/interface/entity.interface'

export interface IUserModel extends IEntity {
    getUsername(): string
    getPassword(): string
    getSalt(): string
    getName(): string
    getEmail(): string
    getPhone(): string
    getCreatedAt(): Date
    getCreatedBy(): string
    getUpdatedAt(): Date
    getUpdatedBy(): string
    isSuspended(): boolean
    challengePassword(password: string): boolean
    getSessionId(): string

    setUsername(username: string): void
    setPassword(password: string): void
    setName(name: string): void
    setEmail(email: string): void
    setPhone(phone: string): void
    setCreatedAt(createdAt: Date): void
    setCreatedBy(createdBy: string): void
    setUpdatedAt(updatedAt: Date): void
    setUpdatedBy(updatedBy: string): void
    setSuspend(flag: boolean): void
    setSessionId(sessionId: string): void
}
