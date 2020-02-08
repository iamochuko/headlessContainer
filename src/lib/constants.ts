export enum Gender {
  male = 'male',
  female = 'female',
}

export enum CONFIG {
  CONFIG_OPTIONS = 'CONFIG_OPTIONS',
  MONGODB_URI = 'MONGODB_URI',
}

export const JWT_OPTIONS = {
  secret: process.env.JWT_OPTION_SECRETE || 'secret101Key',
};
