import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  async sendMessage(
    @Body('number') number: string,
    @Body('template') template: string,
    @Body('parameters') parameters: string[],
  ) {
    return this.whatsappService.sendMessage(number, template, parameters);
  }

  @Post('send-multiple')
  async sendMessages(
    @Body('numbers') numbers: string[],
    @Body('template') template: string,
    @Body('parameters') parameters: string[],
  ) {
    return this.whatsappService.sendMultiple(numbers, template, parameters);
  }
}
