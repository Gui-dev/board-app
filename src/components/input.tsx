import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface IInputProps extends ComponentProps<'input'> {}

export const Input = ({ className, ...props }: IInputProps) => {
  return (
    <input
      className={twMerge(
        'flex h-10 items-center rounded-lg border-[0.5px] border-navy-500 bg-navy-900 px-3 text-sm placeholder-navy-200',
        'outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
        className
      )}
      {...props}
    />
  )
}
