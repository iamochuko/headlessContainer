export const TypeOrmOptions = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  entities: process.env.DB_ENTITIES,
  synchronize: process.env.DB_SYNCHRONIZE,
};
