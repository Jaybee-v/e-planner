import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EmailService } from 'src/infrastructures/repositories/email.repository';
import { createTransporter } from './oauthclient';
import { RepositoriesModule } from 'src/infrastructures/repositories/repositories.module';

const token = createTransporter();

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          debug: true,
          logger: true,
          tls: {
            rejectUnauthorized: false,
          },
          auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USER,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken: token.toString(),
          },
        },
        defaults: {
          from: `Equita-planner <${config.get('EMAIL_USER')}>`,
        },
        template: {
          dir: 'dist/applications/email/templates',
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    RepositoriesModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
