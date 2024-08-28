import { Entity } from '../../common/entity'
import { IUserModel } from './interface/model.interface'
import * as Crypto from 'crypto'

export class UserModel extends Entity implements IUserModel {
    private _username: string
    private _password: string
    private _name: string
    private _email: string
    private _phone: string
    private _createdAt: Date
    private _createdBy: string
    private _updatedAt: Date
    private _updatedBy: string
    private _salt: string
    private _suspended: boolean
    private _sessionId: string

    constructor() {
        super()
        this._generateNewSalt()
        this._name = ''
        this._email = ''
        this._suspended = true
        this._password = ''
    }

    private _generateNewSalt() {
        this._salt = Crypto.randomBytes(24).toString('hex')
    }

    getCreatedAt(): Date {
        return this._createdAt
    }

    getCreatedBy(): string {
        return this._createdBy
    }

    getName(): string {
        return this._name
    }

    getEmail(): string {
        return this._email
    }

    getPhone(): string {
        return this._phone
    }

    getPassword(): string {
        return this._password
    }

    getUpdatedAt(): Date {
        return this._updatedAt
    }

    getSalt(): string {
        return this._salt
    }

    getUpdatedBy(): string {
        return this._updatedBy
    }

    getUsername(): string {
        return this._username
    }

    setCreatedAt(createdAt: Date): void {
        this._createdAt = createdAt
    }

    setCreatedBy(createdBy: string) {
        this._createdBy = createdBy
    }

    setName(name: string): void {
        this._name = name
    }

    setEmail(email: string): void {
        this._email = email
    }

    setPhone(phone: string) {
        this._phone = phone
    }

    setUpdatedAt(updatedAt: Date): void {
        this._updatedAt = updatedAt
    }

    setUpdatedBy(updatedBy: string): void {
        this._updatedBy = updatedBy
    }

    setUsername(username: string): void {
        this._username = username
    }

    public challengePassword(password: string): boolean {
        const buffer = Crypto.pbkdf2Sync(
          password,
          this._salt,
          12000,
          64,
          'sha256')
        return buffer.toString('hex') === this._password
    }

    public setPassword(password: string): string {
        this._generateNewSalt()
        const buffer = Crypto.pbkdf2Sync(
          password,
          this._salt,
          12000,
          64,
          'sha256')
        this._password = buffer.toString('hex')
        return this._password
    }

    public isSuspended(): boolean {
        return this._suspended
    }

    public setSuspend(flag: boolean): void {
        this._suspended = flag
    }

    public getSessionId(): string {
        return this._sessionId
    }

    public setSessionId(setSessionId: string) {
        this._sessionId = setSessionId
    }

}
