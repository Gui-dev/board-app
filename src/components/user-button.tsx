'use client'

import { Loader2Icon, LogInIcon } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export const UserButton = () => {
  const { data: session, isPending } = authClient.useSession()

  const handleSignIn = async () => {
    await authClient.signIn.social({ provider: 'github', callbackURL: '/' })
  }

  const handleSignOut = async () => {
    await authClient.signOut()
  }

  return (
    <>
      {isPending && (
        <div className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-navy-500 bg-navy-700 transition-colors duration-150 hover:bg-navy-600">
          <Loader2Icon className="size-3.5 animate-spin text-navy-200" />
        </div>
      )}

      {!isPending && session?.user && (
        <button
          type="button"
          className="size-8 cursor-pointer overflow-hidden rounded-full"
          title="Sign out"
          onClick={handleSignOut}
        >
          <img
            src={session.user.image ?? ''}
            alt={session.user.name ?? ''}
            className="size-8 rounded-full"
          />
        </button>
      )}

      {!isPending && !session?.user && (
        <button
          type="button"
          className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-navy-500 bg-navy-700 transition-colors duration-150 hover:bg-navy-600"
          title="Sign in"
          onClick={handleSignIn}
        >
          <LogInIcon className="size-3.5 text-navy-200" />
        </button>
      )}
    </>
  )
}
