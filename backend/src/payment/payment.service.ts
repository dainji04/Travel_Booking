import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import axios from 'axios';
dotenv.config();


@Injectable()
export class PaymentService {



    async transactionStatus(body:CreatePaymentDto) 
    {
        const {orderId} = body
        const rawSignature = `accessKey=${process.env.access_Key}&orderId=${orderId}&parnerCode=MOMO&requestId=${orderId}`
        const signature = crypto.createHmac('sha256', process.env.secret_Key).update(rawSignature).digest('hex')
        const requestBody = JSON.stringify({
            parnerCode: 'MOMO',
            requestId: orderId,
            orderId: orderId,
            signature: signature,
            lang:'vi'
        })
        const options = {
            method:'POST',
            url:"https://test-payment.momo.vn/v2/gateway/api/query",
            headers: {
              'Content-Type': 'application/json'
            },
           data: requestBody
            }
            let resuit
            try {
                resuit = await axios(options)
                return  {
                    rs : resuit.data,
                    status:HttpStatus.OK

                }
            } catch (error) {
                return {
                status:HttpStatus.BAD_REQUEST
            }
            }
    }
  
}
