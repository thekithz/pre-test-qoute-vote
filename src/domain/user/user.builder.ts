import { UserModel } from './user.model'

export class UserBuilder {
    private readonly _model: UserModel

    constructor() {
        this._model = new UserModel()
    }

    public build(): UserModel {
        return this._model
    }

    public setId(id: string) {
        this._model.setId(id)
        return this
    }

    public setUsername(username: string) {
        this._model.setUsername(username)
        return this
    }

    public setPassword(password: string) {
        this._model.setPassword(password)
        return this
    }

    public setName(name: string) {
        this._model.setName(name)
        return this
    }

    public setEmail(email: string) {
        this._model.setEmail(email)
        return this
    }

    public setPhone(phone: string) {
        this._model.setPhone(phone)
        return this
    }

    public setSuspended(suspended: boolean) {
        this._model.setSuspend(suspended)
        return this
    }


    public setCreatedAt(createdAt: Date) {
        this._model.setCreatedAt(createdAt)
        return this
    }

    public setCreatedBy(createdBy: string) {
        this._model.setCreatedBy(createdBy)
        return this
    }

    public setUpdatedAt(updatedAt: Date) {
        this._model.setUpdatedAt(updatedAt)
        return this
    }

    public setUpdatedBy(updatedBy: string) {
        this._model.setUpdatedBy(updatedBy)
        return this
    }

    public encryptedPassword(password: string, salt: string) {
        Object.assign(this._model, {
            _password: password,
            _salt: salt,
        })
        return this
    }

    public setSessionId(sessionId: string) {
        this._model.setSessionId(sessionId)
    }

}
