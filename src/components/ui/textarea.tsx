import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-secondary/50 focus:outline-none resize-none transition-colors',
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'