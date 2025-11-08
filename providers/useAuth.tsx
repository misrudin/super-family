import {
  FC,
  ReactNode,
  createContext,
  useContext
} from 'react';

import { getCookies } from '@/helpers/credentials';
import { IUser } from '@/interfaces/IUser';
import { getProfileFromAPI } from '@/lib/api/account/account.api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
  const isGuest = getCookies('isGuest') === 'true' ? true : false;
  const queryClient = useQueryClient()

  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileFromAPI(),
    enabled: !!token && !isGuest,
    select: (data) => data.data?.data || null,
  })

  function resetProfile() {
    queryClient.setQueryData(['profile'], null)
  }

  const value = {
    isAuth: !!token,
    isGuest,
    profile: profile || initialProfile,
    reFetch: refetchProfile,
    token,
    resetProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IUseAuth => useContext(AuthContext);
