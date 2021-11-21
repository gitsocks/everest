import { EverestUser } from '../../models/everest-user.model';

export interface User extends EverestUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
