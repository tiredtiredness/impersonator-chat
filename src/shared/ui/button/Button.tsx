import Link, {LinkProps} from 'next/link';
import {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode} from 'react';

const baseStyles = `
  cursor-pointer rounded-full bg-neutral-100 p-3 
  focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 
`;

const interactiveStyles = `
  hover:bg-blue-500 hover:text-white 
  disabled:cursor-not-allowed disabled:opacity-50
`;

interface ButtonAsLinkProps
  extends Omit<LinkProps, 'href'>,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  children: ReactNode;
  className?: string;
}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

function isLinkProps(props: ButtonProps): props is ButtonAsLinkProps {
  return 'href' in props && props.href !== undefined;
}

export function Button(props: ButtonProps) {
  const {children, className = '', ...restProps} = props;

  const combinedClassName = `${baseStyles} ${interactiveStyles} ${className}`.trim();

  if (isLinkProps(props)) {
    const {href, ...linkProps} = restProps as ButtonAsLinkProps;

    return (
      <Link href={href} className={combinedClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = restProps as ButtonAsButtonProps;

  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
