"use client"
import SignIn from '@/app/sign-in/page'
import AuthProvider from '@/app/context/auth'
import queryClient, { QueryClientProvider } from '@/app/config/react-query'

export default function Page() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
      </QueryClientProvider>
    </main>
  )
}
