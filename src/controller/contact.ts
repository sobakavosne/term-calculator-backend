import { Repository } from 'mikro-orm';
import { BaseContact, Contact } from '../infrastructure/models/contact';


type ContactRepository = Repository<Contact>;

const getAllContacts =
  (repository: ContactRepository) =>
    async (): Promise<Contact[]> => {
      return await repository.findAll();
    };

const getContactById =
  (repository: ContactRepository) =>
    async (id: number): Promise<Contact | null> => {
      return await repository.findOne({ id });
    };

const createContact =
  (repository: ContactRepository) =>
    async (contactData: Contact): Promise<Contact> => {
      const contact = new BaseContact(contactData);
      await repository.persistAndFlush(contact);
      return contact;
    };

const updateContact =
  (repository: ContactRepository) =>
    async (id: number, contactData: Partial<Contact>): Promise<Contact | null> => {
      const contact = await repository.findOne({ id });
      if (!contact) {
        return null;
      }
      Object.assign(contact, contactData);
      await repository.persistAndFlush(contact);
      return contact;
    };

const deleteContact =
  (repository: ContactRepository) =>
    async (id: number): Promise<boolean> => {
      const result = await repository.nativeDelete({ id });
      return result !== undefined && result > 0;
    };

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
}