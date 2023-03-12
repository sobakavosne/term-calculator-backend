import { Repository } from 'mikro-orm';
import { Contact } from '../infrastructure/models/contact';
import { Law } from '../infrastructure/models/law';
import { BasePrisoner, Prisoner } from '../infrastructure/models/prisoner';

type PrisonerRepository = Repository<Prisoner>;

const getAllPrisoners =
  (repository: PrisonerRepository) =>
    async (): Promise<Prisoner[]> => {
      return await repository.findAll(['contact', 'law']);
    };

const getPrisonerById =
  (repository: PrisonerRepository) =>
    async (id: number): Promise<Prisoner | null> =>
      await repository.findOne({ id }, ['contact', 'law']);

const createPrisoner =
  (repository: PrisonerRepository) =>
    async (prisonerData: Prisoner, contact: Contact, law: Law): Promise<Prisoner> => {
      const prisoner = new BasePrisoner(prisonerData);
      // prisoner.contact = contact;
      // prisoner.law = law;
      await repository.persistAndFlush(prisoner);
      return prisoner;
    };

const updatePrisoner =
  (repository: PrisonerRepository) =>
    async (id: number, prisonerData: Partial<Prisoner>): Promise<Prisoner | null> => {
      const prisoner = await repository.findOne({ id }, ['contact', 'law']);
      if (!prisoner) {
        return null;
      }
      Object.assign(prisoner, prisonerData);
      await repository.persistAndFlush(prisoner);
      return prisoner;
    };

const deletePrisoner =
  (repository: PrisonerRepository) =>
    async (id: number): Promise<boolean> => {
      const result = await repository.nativeDelete({ id });
      return result !== undefined && result > 0;
    };

module.exports = {
  getAllPrisoners,
  getPrisonerById,
  createPrisoner,
  updatePrisoner,
  deletePrisoner
}