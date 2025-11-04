export const configEnv = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
  stage: process.env.NEXT_PUBLIC_STAGE,
  version: process.env.NEXT_PUBLIC_VERSION,
  restApiUrlCsr: '/api',
  tokenExpired: Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRED) || 0,
  keyToken: process.env.NEXT_PUBLIC_CREDENTIAL_TOKEN,
  keyProfile: process.env.NEXT_PUBLIC_CREDENTIAL_PROFILE,
  otpExpired: Number(process.env.NEXT_PUBLIC_OTP_EXPIRED || 90),
  maxUploadSize: Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE) || 2,
  appName: process.env.NEXT_PUBLIC_APP_NAME,
};
