import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData = require('form-data');

@Injectable()
export class SmsService {
    async sendSms(phone:string, otp: string) {
        const formData = new FormData();
        formData.append('mobile_phone', phone);
        formData.append('message', `Sizning CRM tizimida parolingiz - ${otp}`);
        formData.append('from', '4546');

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.SMS_SERVICE_URL,
            headers: {Authorization: `Bearer ${process.env.SMS_TOKEN}`},
            data: formData,
        };

        try {
            const resp = await axios(config)
            return resp
        } catch (error) {
            console.log(error);
            return {status: 500}
        }

    }
}
