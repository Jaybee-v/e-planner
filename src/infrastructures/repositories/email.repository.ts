import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailRepository } from 'src/domains/repositories/email.repository';
import { StableStoreRepositoryOrm } from './stable-store.repository';

export interface InvitationCLubMailDto {
  email: string;
  name: string;
  riderName: string;
}

export interface ContactEmailDto {
  email: string;
  firstName: string;
  subject: string;
  message: string;
}

@Injectable()
export class EmailService implements EmailRepository {
  constructor(
    private mailerService: MailerService,
    private readonly stableStoreService: StableStoreRepositoryOrm,
  ) {}

  async testEmail(data: ContactEmailDto): Promise<boolean> {
    try {
      console.log(data);
      console.log(process.env.EMAIL_USER);

      await this.mailerService.sendMail({
        to: process.env.EMAIL_USER,
        subject: `${data.firstName} vous invite à découvrir Equita-planner !`,
        template: './landing-page/contact-email',
        context: {
          firstName: data.firstName,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  async contactEmail(data: ContactEmailDto): Promise<boolean> {
    try {
      console.log(data);
      console.log(process.env.EMAIL_USER);

      await this.mailerService.sendMail({
        to: process.env.EMAIL_USER,
        subject: `${data.firstName} cherche à vous contacter !`,
        template: './landing-page/contact-email',
        context: {
          firstName: data.firstName,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  async invitationClubEmail(data: InvitationCLubMailDto): Promise<boolean> {
    try {
      console.log(data);

      await this.mailerService.sendMail({
        to: data.email,
        subject: `${data.riderName} vous invite à découvrir Equita-planner !`,
        template: './landing-page/invitation-club',
        context: {
          name: data.name,
          riderName: data.riderName,
          link: process.env.WEBSITE_URL_LP,
          contactLink: process.env.WEBSITE_URL_LP + '/contact',
        },
      });
      try {
        await this.stableStoreService.create(data.name);
      } catch (error) {
        console.log(error);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
