import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export async function createTransporter() {
  const config: ConfigService = new ConfigService();
  const oauth2client = new OAuth2(
    config.get('MAIL_CLIENT_ID'),
    config.get('MAIL_KEY'),
    'https://developers.google.com/oauthplayground',
  );
  oauth2client.setCredentials({
    refresh_token:
      '1//04dUzGipQBrTjCgYIARAAGAQSNwF-L9IrC9mM-mAme3NOqaP66IZW3oV_xEDqcW0gxrEXYlmPDx6uju7npPsD1SVhU5fUR__IcLQ',
  });
  try {
    const accessToken = await new Promise((resolve, reject) => {
      oauth2client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token : ' + err);
        }
        resolve(token);
      });
    });
    return accessToken;
  } catch (error) {
    console.log(error);
    return error;
  }
}
