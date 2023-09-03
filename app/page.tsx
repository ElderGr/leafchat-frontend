"use client"
import SignIn from '@/app/sign-in/page'
import queryClient, { QueryClientProvider } from '@/app/config/react-query'

export default function Page() {

  return (
    <main>
      <QueryClientProvider client={queryClient}>
          <SignIn />
      </QueryClientProvider>
    </main>
  )
}
