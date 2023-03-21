import { Repository } from 'mikro-orm';
import { BaseLaw, Law } from '../models/law';

type LawRepository = Repository<Law>;

const getAllLaws =
  (repository: LawRepository) =>
    async (): Promise<Law[]> => {
      return await repository.findAll();
    };

const getLawById =
  (repository: LawRepository) =>
    async (id: number): Promise<Law | null> => {
      return await repository.findOne({ id });
    };

const createLaw =
  (repository: LawRepository) =>
    async (lawData: Law): Promise<Law> => {
      const law = new BaseLaw(lawData);
      await repository.persistAndFlush(law);
      return law;
    };

const updateLaw =
  (repository: LawRepository) =>
    async (id: number, lawData: Partial<Law>): Promise<Law | null> => {
      const law = await repository.findOne({ id });
      if (!law) {
        return null;
      }
      Object.assign(law, lawData);
      await repository.persistAndFlush(law);
      return law;
    };

const deleteLaw =
  (repository: LawRepository) =>
    async (id: number): Promise<boolean> => {
      const result = await repository.nativeDelete({ id });
      return result !== undefined && result > 0;
    };

module.exports = {
  getAllLaws,
  getLawById,
  createLaw,
  updateLaw,
  deleteLaw
}