import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  private readonly apiUrl = 'https://graph.facebook.com/v19.0/336524426202904/messages';
  private readonly token = 'EAAVR9D0FA6QBOyHzobOyLCUJs3T4NOJ1CxmAZA30G8hzHp8vW31haiGv2nqh41VRsGW0LlGMZCKtBUDIGbVhw7Ez6ENJdxM3m7J6UeowalhgtqUgGEeytJwEcYbdPe3dZB1QOver48Y6n0ZA25jzxsuPCINagR9sMCb537fGypgT323Hwg0QHCFZB2odcbyHP4ZBbB4XCZCSfOtekuJpwhZATSH8jxUW';

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(number: string, template: string, parameters: string[]): Promise<any> {
    const body = {
      messaging_product: 'whatsapp',
      to: number,
      type: 'template',
      template: {
        name: template,
        language: {
          code: 'en_US'
        },
        components: [
          {
            type: 'body',
            parameters: parameters.map(param => ({ type: 'text', text: param }))
          }
        ]
      }
    };

    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };

    const response = await lastValueFrom(
      this.httpService.post<AxiosResponse<any>>(this.apiUrl, body, { headers })
    );

    return response.data;
  }

  async sendMultiple(numbers: string[], template: string, parameters: string[]): Promise<any[]> {
    const results = [];
    for (const number of numbers) {
      try {
        const result = await this.sendMessage(number, template, parameters);
        results.push({ number, result });
      } catch (error) {
        results.push({ number, error: error.message });
      }
    }
    return results;
  }
}
