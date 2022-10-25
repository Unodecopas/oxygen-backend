export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      JWTSECRETWORD: string
      ENV: 'test' | 'dev' | 'prod'
    }
  }
}
