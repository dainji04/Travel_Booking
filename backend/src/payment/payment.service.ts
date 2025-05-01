import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CheckStatusPaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import axios from 'axios';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
dotenv.config();


@Injectable()
export class PaymentService {
    async transactionStatus(body:CheckStatusPaymentDto) 
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

    async confirmPayment(body:ConfirmPaymentDto) {
       
        
        const {partnerCode,requestId,orderId,requestType,amount,lang,description} = body
        const rawSignature = `accessKey=${process.env.access_Key}&amount=${amount}&description=${description}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&requestType=${requestType}`
        const signature = crypto.createHmac('sha256', process.env.secret_Key).update(rawSignature).digest('hex')
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            requestId: requestId,
            orderId: orderId,
            requestType: requestType,
            amount: amount,
            lang: lang,
            signature: signature,
            description: description
        })
        console.log("rawSignature:", rawSignature);
        console.log("signature:", signature);
        console.log("Sending request body to MoMo:", requestBody);

        const options = {
            method:'POST',
            url:"https://test-payment.momo.vn/v2/gateway/api/confirm",
            headers: {
              'Content-Type': 'application/json'
            },
           data: requestBody
        }
        let resuit
        try {
            resuit = await axios(options)
            return {
                rs : resuit.data,
                status:HttpStatus.OK
            }
        } catch (error) {
            throw new InternalServerErrorException('Error while confirming payment', error.message)
        }
    }
}
