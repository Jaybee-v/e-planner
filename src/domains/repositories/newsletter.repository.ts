import { NewsletterM } from '../models/Newsletter';

export interface NewsletterRepository {
  create(email: string): Promise<NewsletterM>;
}
