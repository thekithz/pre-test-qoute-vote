
export interface ICreateQuoteValidator {
  getFunnyQuote(): string
  getCategoryName(): string
  getTotalVote(): number
  getCreatedBy(): string
  setCreatedBy(createdBy: string): void
}

export interface IVoteQuoteValidator {
  getQuoteID(): string
  getUserID(): string
  getCreatedBy(): string
  setCreatedBy(createdBy: string): void
  setUserID(userId: string): void
}

export interface IUpdateQuoteValidator {
  getFunnyQuote(): string
  getCategoryName(): string
  getUpdatedBy(): string
  setUpdatedBy(createdBy: string): void
}