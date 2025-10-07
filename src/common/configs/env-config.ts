export const configEnv = {
  envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
  isGlobal: true,
  cache: true,
  expandVariables: true,
};
