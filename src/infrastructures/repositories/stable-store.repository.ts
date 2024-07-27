import { InjectRepository } from '@nestjs/typeorm';
import { StableStoreRepository } from 'src/domains/repositories/stable-store.repository';
import { StableStore } from '../entities/stables-store.entity';
import { Repository } from 'typeorm';
import { StableStoreM } from 'src/domains/models/StableStore';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateStableStoreDto } from '../dtos/create/create-stable-store.dto';
import { JSDOM } from 'jsdom';

export class StableStoreRepositoryOrm implements StableStoreRepository {
  constructor(
    @InjectRepository(StableStore)
    private readonly stableStoreRepository: Repository<StableStore>,
  ) {}

  async create(stableStoreName: string): Promise<any> {
    try {
      const results = await this.getUrlReturn(stableStoreName);
      const resultArray: StableStoreM[] = [];
      for await (const r of results) {
        const saved = await this.stableStoreRepository.save(
          this.toStableStoreEntity(r),
        );
        resultArray.push(this.toStableStoreModel(saved));
      }
      return this.toStableStoreModel(resultArray[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async findByZipcode(zipcode: string): Promise<StableStoreM[]> {
    const stables = await this.stableStoreRepository.find({
      where: { zipcode },
    });
    return stables.map((stable) => this.toStableStoreModel(stable));
  }

  async updateIsUsed(id: number): Promise<StableStoreM> {
    const stable = await this.stableStoreRepository.findOne({ where: { id } });
    if (!stable) {
      throw new HttpException(
        {
          status: 'error',
          code: 404,
          message: 'Stable not found',
          ok: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    stable.isUsed = true;
    await this.stableStoreRepository.save(stable);
    return this.toStableStoreModel(stable);
  }

  private toStableStoreModel(stableStoreEntity: StableStore): StableStoreM {
    const stableStoreModel = new StableStoreM();

    stableStoreModel.id = stableStoreEntity.id;
    stableStoreModel.name = stableStoreEntity.name;
    stableStoreModel.city = stableStoreEntity.city;
    stableStoreModel.zipcode = stableStoreEntity.zipcode;
    stableStoreModel.isUsed = stableStoreEntity.isUsed;

    return stableStoreModel;
  }

  private toStableStoreEntity(stableStore: CreateStableStoreDto): StableStore {
    const stableStoreEntity = new StableStore();

    stableStoreEntity.name = stableStore.name;
    stableStoreEntity.city = stableStore.city;
    stableStoreEntity.zipcode = stableStore.zipcode;

    return stableStoreEntity;
  }

  private async getUrlReturn(name: string): Promise<CreateStableStoreDto[]> {
    let term = name.toUpperCase();
    if (term.includes('LES ')) {
      term = term.replace('LES ', '');
    }
    if (term.includes('LE ')) {
      term = term.replace('LE ', '');
    }
    if (term.includes('LA ')) {
      term = term.replace('LA ', '');
    }
    const baseUrl = `https://www.telemat.org/FFE/sif/-club?nomclub=${term}&gde_ville=&nreg=&dep=&rechercher=rechercher&disc_label_ECval=all&disc_label_ECent=all&disc_label_SEE=all&nomDiscipline1=&nomDiscipline2=&nb_place_poney=&nb_place_cheval=&surface_prairie=&nblits_enfants=&nblits_adultes=&ouvert=&cs=4z.69ffc614e19f85ae3e030550a3e563101b8487205680281f1fe713e80f1c84dfefe4cb781394f7e4213c4526e90d3a5a5e520f8c705b25007b75f0ea37562615026cbb2098336a12776dbf3bf9a0fe9b6cdb9babe33c138c4b636046fd0c3b4b0c3359004e1b7fbfafe562787c6c16ac1f22509257a1a2908598bb62342b3ea48c966ac8a52340b8caceacc1c69c1784a8206eaa4315750eadf5ef6a9d38dbc3796f04babfb6a318d694a9cd7938a77e1994091badd5a787756a3c9913f8720d1cf1df1648b3277e717eb57ac02e3b0800487c8d2560b023076fcc3c6f92f1ed87f30555329fe3f133e4394c59356a9897750124fcbe715263b7eed3110b14fed7e2f1d5a21b97b98d1c954e52b166517a466eee5b1ec84d7e519bda0b4c92247c8947d951c3d28ecec874364e0f2ad8c288809bf087a7e6429a6b86b0de4fae49e93fe7373fa04eb9255bd004f1856d89ff5d3a75c0f8af775be14b05231a66045b62c915fb83c6ba98a4415c1b8e5fe9d55c5bc5c22d06cb3bc2b8584c552e97c43e5d82d35e92723700aaf9325ae792613d3839606f4c09300e053c6ba17bb05b7d095159234d3ae3d1a6a7022254502b7a060eec7d3db0aabeba560d9d1ce20c3183b3ca54f0afcb84befacf439abdfea2a8608aebebbd136d62dfda55ee110d372c73c4df07073bfa9fc02bc12a239a79ea8e700a1db2d64a4e4dbdf17cdc36`;

    const response = await fetch(baseUrl);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const names = Array.from(
      document.querySelectorAll("td[data-label='Nom du club']"),
    ).map((el) => el.innerHTML.trim().split('>')[1].split('<')[0]);
    console.log(names);
    const zipcodes = Array.from(
      document.querySelectorAll("td[data-label='Code postal']"),
    ).map((el) => el.innerHTML.trim());
    console.log(zipcodes);
    const cities = Array.from(
      document.querySelectorAll("td[data-label='Ville']"),
    ).map((el) => el.innerHTML.trim());
    const clubs: CreateStableStoreDto[] = [];
    // need to return an array of stable with name, zipcode and city
    for (let i = 0; i < names.length; i++) {
      const item: CreateStableStoreDto = {
        name: names[i],
        zipcode: zipcodes[i],
        city: cities[i],
      };
      clubs.push(item);
    }
    return clubs;
  }
}
