'use client'

import { SearchIcon } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'
import type { ChangeEvent } from 'react'
import { Input } from '@/components/input'

export const SearchInput = () => {
  const [search, setSearch] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ shallow: false })
  )

  const handleSearchUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value !== '' ? debounce(500) : undefined,
    })
  }

  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-navy-200" />

      <Input
        placeholder="Search for features..."
        className="w-67.5 pl-8"
        value={search}
        onChange={handleSearchUpdate}
      />
    </div>
  )
}
