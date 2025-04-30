import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, InternalServerErrorException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Request, Response } from 'express';
import axios from 'axios';
import { ApiTags } from '@nestjs/swagger';
import { CheckStatusPaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Post()
  async create(@Body() createPaymentDto: CheckStatusPaymentDto) {
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const partnerCode = 'MOMO';
    const requestType = 'payWithMethod';
  
    const {
      amount,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData = '',
      orderGroupId = '',
      autoCapture = true,
      lang = 'vi'
    } = createPaymentDto;
  
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
  
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  
    const crypto = require('crypto');
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
  
    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      orderGroupId,
      signature
    });
  
    const axios = require('axios');
  
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/create',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };
  
    try {
      const result = await axios(options);
      return result.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw new InternalServerErrorException('Error while processing payment');
    }
  }

  @Post('transaction-status')
  async transactionStatus(@Body() createPaymentDto: CheckStatusPaymentDto) {
    return await this.paymentService.transactionStatus(createPaymentDto);
  }
  
  @Post('confirm-payment')
  async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return await this.paymentService.confirmPayment(confirmPaymentDto);
  }
  
}
