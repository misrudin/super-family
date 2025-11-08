import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { getCookies } from '@/helpers/credentials';
import { IBaseResponse } from '@/interfaces/IBaseResponse';
import { IUser } from '@/interfaces/IUser';
import { getProfileFromAPI } from '@/lib/api/account/account.api';
import { AxiosResponse } from 'axios';

interface IUseAuth {
  isAuth: boolean;
  isGuest: boolean;
  profile: IUser | null;
  token: string;
  reFetch: () => void;
  resetProfile: () => void;
}

const AuthContext = createContext<IUseAuth>({
  isAuth: false,
  isGuest: true,
  token: '',
  profile: null,
  reFetch: () => { },
  resetProfile: () => { },
});

type TAuthProvider = {
  children: ReactNode;
  token: string;
  initialProfile?: IUser | null;
};

export const AuthProvider: FC<TAuthProvider> = ({
  children,
  token,
  initialProfile,
}) => {
  const [profile, setProfile] = useState<any | null>(initialProfile || null);
  const isGuest = getCookies('isGuest') === 'true' ? true : false;

  const getProfile = async () => {
    try {
      const response: AxiosResponse<IBaseResponse<IUser>> =
        await getProfileFromAPI();
      if (response.status === 200) {
        setProfile(response.data.data);
      }
    } catch (error) {
      resetProfile();
    }
  };

  const resetProfile = () => setProfile(null);

  useEffect(() => {
    token && !isGuest && getProfile();
  }, [token, isGuest]);

  const value = {
    isAuth: !!token,
    isGuest,
    profile,
    reFetch: getProfile,
    token,
    resetProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IUseAuth => useContext(AuthContext);
