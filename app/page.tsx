"use client"
import SignUp from '@/app/sign-up/page'
import queryClient, { QueryClientProvider } from '@/app/config/react-query'

export default function Page() {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>
    </main>
  )
}
