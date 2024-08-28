import { ICreateQuoteValidator, IUpdateQuoteValidator, IVoteQuoteValidator } from '../../domain/qoute/interface/validator.interface'
import { IsDefined, IsString } from 'class-validator'

export class CreateQuoteValidator implements ICreateQuoteValidator {

  @IsDefined()
  @IsString()
  private funny_quote: string

  @IsString()
  private category_name: string

  private createdBy: string

  getFunnyQuote(): string {
    return this.funny_quote
  }

  getCategoryName(): string {
    return this.category_name
  }

  getTotalVote(): number {
    return 0
  }

  getCreatedBy(): string {
    return this.createdBy
  }

  setCreatedBy(createdBy: string): void {
    this.createdBy = createdBy
  }
}

export class VoteQuoteValidator implements IVoteQuoteValidator {

  @IsDefined()
  @IsString()
  private quote_id: string

  private user_id: string

  private createdBy: string

  getQuoteID(): string {
    return this.quote_id
  }

  getUserID(): string {
    return this.user_id
  }

  getCreatedBy(): string {
    return this.createdBy
  }

  setCreatedBy(createdBy: string): void {
    this.createdBy = createdBy
  }

  setUserID(user_id: string): void {
    this.user_id = user_id
  }
}

export class UpdateQuoteValidator implements IUpdateQuoteValidator {

  @IsDefined()
  @IsString()
  private funny_quote: string

  @IsString()
  private category_name: string

  private createdBy: string

  getFunnyQuote(): string {
    return this.funny_quote
  }

  getCategoryName(): string {
    return this.category_name
  }

  getUpdatedBy(): string {
    return this.createdBy
  }

  setUpdatedBy(createdBy: string): void {
    this.createdBy = createdBy
  }
}