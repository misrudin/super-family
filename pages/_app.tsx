import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { getCookies, getProfile, keyToken } from "@/helpers/credentials";
import { AuthProvider } from "@/providers/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider token={getCookies(keyToken)} initialProfile={getProfile()}>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </Provider>
  )
}
