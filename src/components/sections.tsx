import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface SectionRootProps extends ComponentProps<'div'> {}
interface SectionHeaderProps extends ComponentProps<'div'> {}
interface SectionTitleProps extends ComponentProps<'span'> {}
interface SectionIssueCountProps extends ComponentProps<'span'> {}
interface SectionContentProps extends ComponentProps<'div'> {}

const SectionRoot = ({ className, ...props }: SectionRootProps) => {
  return (
    <div
      className={twMerge(
        'relative flex flex-col gap-1 rounded-xl border-[0.5px] border-navy-500 bg-navy-800 pt-3',
        className
      )}
      {...props}
    />
  )
}

const SectionHeader = ({ className, ...props }: SectionHeaderProps) => {
  return <div className={twMerge('flex items-center justify-between px-3', className)} {...props} />
}

const SectionTitle = ({ className, ...props }: SectionTitleProps) => {
  return (
    <span
      className={twMerge(
        'flex items-center gap-2 rounded-lg bg-navy-700 px-3 py-1.5 text-xs',
        className
      )}
      {...props}
    />
  )
}

const SectionIssueCount = ({ className, ...props }: SectionIssueCountProps) => {
  return <span className={twMerge('text-navy-200 text-xs', className)} {...props} />
}

const SectionContent = ({ className, ...props }: SectionContentProps) => {
  return (
    <div
      className={twMerge(
        'scrollbar-thin scrollbar-thumb-navy-500 scrollbar-track-transparent absolute inset-0 top-12 flex flex-col gap-2.5 overflow-y-auto p-3',
        className
      )}
      {...props}
    />
  )
}

export const Section = {
  Root: SectionRoot,
  Header: SectionHeader,
  Title: SectionTitle,
  IssueCount: SectionIssueCount,
  Content: SectionContent,
}
