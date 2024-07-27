import {
  ContactEmailDto,
  InvitationCLubMailDto,
} from 'src/infrastructures/repositories/email.repository';

export interface EmailRepository {
  testEmail(data: ContactEmailDto): Promise<boolean>;
  invitationClubEmail(data: InvitationCLubMailDto): Promise<boolean>;
}
