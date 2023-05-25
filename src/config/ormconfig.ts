import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export = [
  {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,
    migrations: [join(__dirname, '../..', 'db/migrations/*.{ts,js}'), join(__dirname, '../..', 'db/seeds/*.{ts,js}')],
    cli: {
      migrationsDir: 'db/migrations',
    },
    entities: [
      join(__dirname, '..', '**/*.entity.{ts,js}'),
    ],
    synchronize: false,
    dropSchema: false,
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
  } as TypeOrmModuleOptions,
];