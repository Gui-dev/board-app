import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface IButtonProps extends ComponentProps<'button'> {}

export const Button = ({ className, ...props }: IButtonProps) => {
  return (
    <button
      className={twMerge(
        'flex cursor-pointer items-center gap-2 rounded-lg bg-navy-600 px-2.5 py-1 text-navy-100',
        'transition-colors duration-150 hover:bg-navy-500',
        'outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
        className
      )}
      {...props}
    />
  )
}
