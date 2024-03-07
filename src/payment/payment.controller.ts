import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsAdmin } from '../guards/isAdmin.guard';
import { Payment } from './models/payment.model';

@ApiTags("Payment")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({summary: "create payment"})
  @ApiResponse({status: 201, type: Payment})
  @UseGuards(IsAdmin)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @CookieGetter('refresh_token') refreshToken:string) {
    return this.paymentService.create(createPaymentDto, refreshToken);
  }

  @ApiOperation({summary: "Get group payment"})
  @UseGuards(IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @ApiOperation({summary: "delete payment"})
  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
