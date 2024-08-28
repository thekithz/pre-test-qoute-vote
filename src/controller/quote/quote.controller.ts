import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from '../../domain/qoute/quote.service'
import { Injector } from '@nestjs/core/injector/injector'
import { providerNames } from '../../provider/provider.name'
import { IConfig } from '../../common/interface/config.interface'
import { IQuoteService } from '../../domain/qoute/interface/service.interface'
import { CreateUserValidator } from '../user/user.validator'
import { CreateQuoteValidator, UpdateQuoteValidator, VoteQuoteValidator } from './quote.validator'
import { map, reduce } from 'rxjs/operators'
import { UserDto } from '../user/user.dto'
import * as _ from 'lodash'
import { QuoteDto } from './quote.dto'
import * as jwt from 'jsonwebtoken'
import { IUpdateQuoteValidator } from '../../domain/qoute/interface/validator.interface'
import { ProfileSessionGuard, UserGuard } from '../../common/guard/user.guard';

// @UseGuards(ProfileSessionGuard)
@UseGuards(UserGuard)
@Controller('/quote')
export class QuoteController {
  constructor(
    @Inject(providerNames.QUOTE_SERVICE)
    private readonly _quoteService: IQuoteService
  ) {
  }

  @Post('/create')
  public createQuote(
    @Headers('authorization') profileToken: string,
    @Body() payload: CreateQuoteValidator
  ) {

    return this._quoteService.save(payload)
  }

  @Get('/')
  public searchQuote(
    @Query('funny_quote') funnyQuote: string
  ) {
    const dtoTemplate = {
      total: 0,
      data: []
    }

    return this._quoteService.searchQuote(funnyQuote).pipe(
      reduce((acc, model) => {
        if (_.isNil(model)) {
          return dtoTemplate
        }
        acc.total++
        acc.data.push(QuoteDto.toQuoteDto(model))
        return acc
      }, dtoTemplate)
    )
  }

  @Post('/vote')
  public createVote(
    @Headers('authorization') token: string,
    @Body() payload: VoteQuoteValidator
  ) {
    if (token) {
      const profile: any = jwt.decode(token.split(' ')[1])
      payload.setUserID(profile.id)
      payload.setCreatedBy(profile.name)
    } else {
      throw new HttpException(
        'Token Not Found',
        HttpStatus.NOT_FOUND
      )
    }

    return this._quoteService.vote(payload)
  }

  @Get('/get/:id')
  public getByIdQuote(
    @Param('id') id: string
  ) {

    return this._quoteService.getById(id).pipe(
      map((model) => {
        return QuoteDto.toQuoteDto(model)
      })
    )
  }

  @Put('/update/:id')
  public updateQuote(
    @Param('id') id: string,
    @Body() payload: UpdateQuoteValidator,
    @Headers('authorization') token: string
  ) {
    if (token) {
      const profile: any = jwt.decode(token.split(' ')[1])
      payload.setUpdatedBy(profile.name)
    } else {
      throw new HttpException(
        'Token Not Found',
        HttpStatus.NOT_FOUND
      )
    }
    return this._quoteService.updateQuote(id, payload)
  }

  @Delete('/delete/:id')
  public deleteQuote(
    @Param('id') id: string
  ) {

    return this._quoteService.deleteQuote(id)
  }
}