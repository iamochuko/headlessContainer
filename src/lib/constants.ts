export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Config {
  CONFIG_OPTIONS = 'CONFIG_OPTIONS',
}

export const JWT_OPTIONS = {
  secret: process.env.JWT_OPTION_SECRETE || 'secret101Key',
};
