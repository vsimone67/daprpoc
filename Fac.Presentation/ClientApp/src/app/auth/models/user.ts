import { ApplicationRoleModel } from './applicationRoleModel';

export class User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  roles: Array<ApplicationRoleModel>;
  token?: string;
  userId: string;
}
