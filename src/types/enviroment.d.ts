export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      JWTSECRETWORD: string
      ENV: 'test' | 'dev' | 'prod'
      MYSQL_HOST: string
      MYSQL_USER: string
      MYSQL_PASSWORD: string
      MYSQL_DATABASE: string
    }
  }
}
