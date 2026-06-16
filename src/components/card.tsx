import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface CardRootProps extends ComponentProps<'a'> {}
interface CardHeaderProps extends ComponentProps<'div'> {}
interface CardTitleProps extends ComponentProps<'span'> {}
interface CardNumberProps extends ComponentProps<'span'> {}
interface CardFooterProps extends ComponentProps<'div'> {}

const CardRoot = ({ className, ...props }: CardRootProps) => {
  return (
    <a
      href="/"
      className={twMerge(
        'block space-y-4 rounded-lg border-[0.5px] border-navy-600 bg-navy-700 p-3',
        'transition-colors duration-150 hover:border-navy-500 hover:bg-navy-600/60',
        'outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950',
        className
      )}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return <div className={twMerge('flex flex-col gap-2', className)} {...props} />
}

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return <span className={twMerge('font-medium text-sm', className)} {...props} />
}

const CardNumber = ({ className, ...props }: CardNumberProps) => {
  return <span className={twMerge('text-navy-200 text-xs', className)} {...props} />
}

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return <div className={twMerge('flex items-center gap-2', className)} {...props} />
}

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Number: CardNumber,
  Footer: CardFooter,
}
