import { Body, Controller, Post } from '@nestjs/common';
import {
  ContactEmailDto,
  EmailService,
  InvitationCLubMailDto,
} from 'src/infrastructures/repositories/email.repository';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  async testEmail(@Body() data: ContactEmailDto) {
    try {
      console.log(data);

      const result = await this.emailService.testEmail(data);
      if (result) {
        return {
          status: 'success',
          code: 200,
          message: `Nous allons lire attentivement votre message pour vous répondre dans les plus brefs délais.`,
          // data: result,
        };
      } else {
        return {
          status: 'error',
          code: 500,
          message: "Une erreur est survenue lors de l'envoi de l'email",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: 500,
        message: "Une erreur est survenue lors de l'envoi de l'email",
      };
    }
  }
  @Post('contact')
  async contactEmail(@Body() data: ContactEmailDto) {
    try {
      console.log(data);

      const result = await this.emailService.contactEmail(data);
      if (result) {
        return {
          status: 'success',
          code: 200,
          message: `Nous allons lire attentivement votre message pour vous répondre dans les plus brefs délais.`,
          // data: result,
        };
      } else {
        return {
          status: 'error',
          code: 500,
          message: "Une erreur est survenue lors de l'envoi de l'email",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: 500,
        message: "Une erreur est survenue lors de l'envoi de l'email",
      };
    }
  }
  @Post('invitation-club')
  async invitationCLubEmail(@Body() data: InvitationCLubMailDto) {
    try {
      console.log(data);

      const result = await this.emailService.invitationClubEmail(data);
      if (result) {
        return {
          status: 'success',
          code: 200,
          message: `Le Club ${data.name} va recevoir un email d'invitation à découvrir Equita-planner !`,
          // data: result,
        };
      } else {
        return {
          status: 'error',
          code: 500,
          message: "Une erreur est survenue lors de l'envoi de l'email",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 'error',
        code: 500,
        message: "Une erreur est survenue lors de l'envoi de l'email",
      };
    }
  }
}
