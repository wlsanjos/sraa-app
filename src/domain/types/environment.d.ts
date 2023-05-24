interface ImportMeta {
  env: {
    NODE_ENV: 'development' | 'production';
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
    GG_CLIENT_ID: string;
  };
}
