import { NextPageContext } from 'next';
import nookies from 'nookies';

import { ILoginResponse, IUser } from '@/interfaces/IUser';
import { configEnv } from '@/lib/config';

export const keyToken = configEnv.keyToken;
export const keyProfile = configEnv.keyProfile;

export const setBasicToken = (
  token: string,
  tokenExpiredInMinutes: number,
  context?: object,
): void => {
  const minutes = 2;
  const subSeconds = 60 * minutes;
  const maxAge = tokenExpiredInMinutes * 60 - subSeconds;

  setCookies({ name: keyToken, value: token, maxAge, context });
};

export const setCookies = ({
  name,
  value,
  maxAge = 0,
  context = {},
}: {
  name: string;
  value: string;
  maxAge?: number;
  context?: object;
}) => {
  nookies.set(context, name, value, {
    maxAge,
    sameSite: false,
    path: '/',
  });
};

export const getCookies = (name: string, context?: object) => {
  const cookiesBrowser = nookies.get(context);
  return cookiesBrowser[name];
};

export const clearCookies = (context?: NextPageContext) => {
  if (context?.req) {
    context?.res?.setHeader('set-cookie', []);
  } else {
    const cookies = nookies.get();
    const keys = Object.keys(cookies);

    if (keys) {
      keys.forEach((key: string) => setCookies({ name: key, value: '' }));
    }
  }
};

export const getBasicTokenString = (context?: NextPageContext): string => {
  if (context?.req) {
    const headerCookies = context?.req?.headers?.cookie;
    const value = `; ${headerCookies}`;
    const parts = value.split(`; ${keyToken}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : '';
  }
  return getCookies(keyToken, context);
};

export const saveCredentials = (credentials: ILoginResponse) => {
  if (credentials) {
    const maxAge = configEnv.tokenExpired * 60;
    setBasicToken(credentials.token, maxAge, {});
    setProfile({
      name: credentials.user.name,
      email: credentials.user.email,
      role: credentials.user.role,
      id: credentials.user.id,
    });
  }
};

export const setProfile = (profile: IUser) => {
  setCookies({
    name: keyProfile,
    value: JSON.stringify(profile),
    maxAge: 6000 * 60,
  });
};

export const getProfile = (context?: NextPageContext): IUser | null => {
  let profileString = null;
  if (context?.req) {
    const headerCookies = context?.req?.headers?.cookie;
    const value = `; ${headerCookies}`;
    const parts = value.split(`; ${keyProfile}=`);
    const getProfileString =
      parts.length === 2 ? parts.pop().split(';').shift() : null;
    profileString = decodeURIComponent(getProfileString);
  } else {
    const cookieBrowser = getCookies(keyProfile, context);
    profileString =
      !cookieBrowser || !cookieBrowser ? null : cookieBrowser;
  }
  return JSON.parse(profileString);
};

export const getCookieSsr = (ctx: NextPageContext, name: string) => {
  return nookies.get(ctx)[name] ?? undefined;
};
