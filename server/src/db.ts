import { DataSource } from 'typeorm';
import Wilder from './entity/Wilder';
import Skill from './entity/Skill';
import Grade from './entity/Grade';
import User from './entity/User';
import AuthObj from './entity/AuthObj';
export const datasource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  entities: [Wilder, Skill, Grade, User, AuthObj],
  logging: ['error'],
});
