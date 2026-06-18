'use client'

import { Loader2Icon, LogInIcon, SearchIcon } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'
import type { ChangeEvent } from 'react'
import { Input } from '@/components/input'
import { authClient } from '@/lib/auth-client'

export const Header = () => {
  const { data: session, isPending } = authClient.useSession()
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ shallow: false })
  )

  const handleSearchUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== '' ? debounce(500) : undefined,
    })
  }

  const handleSignIn = async () => {
    await authClient.signIn.social({ provider: 'github', callbackURL: '/' })
  }

  const handleSignOut = async () => {
    await authClient.signOut()
  }

  return (
    <header className="mx-auto flex w-full max-w-225 items-center justify-between">
      <div className="space-y-1">
        <h1 className="font-semibold text-xl">Product Roadmap</h1>
        <p className="text-navy-100 text-sm">
          Follow the development progress of our entire platform
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-navy-200" />
          <Input
            placeholder="Search for features..."
            className="w-67.5 pl-8"
            value={search}
            onChange={handleSearchUpdate}
          />
        </div>

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
      </div>
    </header>
  )
}
