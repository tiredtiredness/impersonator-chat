import Link from 'next/link';
import {ButtonHTMLAttributes, ReactNode} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
}

export function Button({children, className, href, ...props}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`cursor-pointer rounded-full bg-neutral-100 p-3 hover:bg-blue-500 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 ${className} `}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`cursor-pointer rounded-full bg-neutral-100 p-3 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 enabled:hover:bg-blue-500 enabled:hover:text-white disabled:cursor-not-allowed ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}
