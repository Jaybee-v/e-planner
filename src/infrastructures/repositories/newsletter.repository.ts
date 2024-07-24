import { InjectRepository } from '@nestjs/typeorm';
import { NewsletterRepository } from 'src/domains/repositories/newsletter.repository';
import Newsletter from '../entities/newsletter.entity';
import { Repository } from 'typeorm';
import { NewsletterM } from 'src/domains/models/Newsletter';

export class NewsletterRepositoryOrm implements NewsletterRepository {
  constructor(
    @InjectRepository(Newsletter)
    private readonly newsletterRepository: Repository<Newsletter>,
  ) {}

  async create(email: string): Promise<NewsletterM> {
    const newsletterEntity = this.toNewsletterEntity({ email });
    const saved = await this.newsletterRepository.save(newsletterEntity);
    return this.toNewsletterModel(saved);
  }

  private toNewsletterModel(newsletter: Newsletter): NewsletterM {
    const model = new NewsletterM();

    model.id = newsletter.id;
    model.email = newsletter.email;
    model.isActive = newsletter.isActive;
    model.createdAt = newsletter.createdAt;
    model.updatedAt = newsletter.updatedAt;

    return model;
  }

  private toNewsletterEntity(newsletter: { email: string }): Newsletter {
    const entity = new Newsletter();

    entity.email = newsletter.email;

    return entity;
  }
}
