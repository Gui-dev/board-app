import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface CommentRootProps extends ComponentProps<'div'> {}
interface CommentAvatarProps extends ComponentProps<'img'> {}
interface CommentContentProps extends ComponentProps<'div'> {}
interface CommentHeaderProps extends ComponentProps<'div'> {}
interface CommentTextProps extends ComponentProps<'p'> {}
interface CommentAuthorProps extends ComponentProps<'span'> {}
interface CommentTimeProps extends ComponentProps<'span'> {}

const CommentRoot = ({ className, ...props }: CommentRootProps) => {
  return <div className={twMerge('flex items-start gap-2', className)} {...props} />
}

const CommentAvatar = ({ className, ...props }: CommentAvatarProps) => {
  return <img className={twMerge('size-8 rounded-full', className)} alt="" {...props} />
}

const CommentContent = ({ className, ...props }: CommentContentProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-1 flex-col gap-1 rounded-lg border-[0.5px] border-navy-600 bg-navy-700 px-3 py-2.5',
        className
      )}
      {...props}
    />
  )
}

const CommentHeader = ({ className, ...props }: CommentHeaderProps) => {
  return <div className={twMerge('flex items-baseline gap-1', className)} {...props} />
}

const CommentText = ({ className, ...props }: CommentTextProps) => {
  return <p className={twMerge('text-navy-100 text-sm leading-relaxed', className)} {...props} />
}

const CommentAuthor = ({ className, ...props }: CommentAuthorProps) => {
  return <span className={twMerge('font-medium text-sm', className)} {...props} />
}

const CommentTime = ({ className, ...props }: CommentTimeProps) => {
  return <span className={twMerge('text-navy-200 text-xs', className)} {...props} />
}

export const Comment = {
  Root: CommentRoot,
  Avatar: CommentAvatar,
  Content: CommentContent,
  Header: CommentHeader,
  Text: CommentText,
  Author: CommentAuthor,
  Time: CommentTime,
}
