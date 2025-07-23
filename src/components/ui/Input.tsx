import {InputHTMLAttributes, ReactNode} from 'react';
import {Button} from '@/components/ui/Button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  isDisabled?: boolean;
  isButtonDisabled?: boolean;
  buttonIcon: ReactNode;
}

export function Input({
  value,
  setValue,
  isDisabled = false,
  isButtonDisabled = false,
  buttonIcon,
  ...props
}: InputProps) {
  return (
    <div className="bg-opacity-10 bg-opacity-25 mx-6 flex grow gap-2 rounded-full bg-zinc-200/50 p-1.5 backdrop-blur-lg backdrop-filter">
      <input
        disabled={isDisabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="grow rounded-full px-2 py-1 text-gray-600 placeholder:text-xs focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
        {...props}
      ></input>
      <Button type="submit" disabled={isButtonDisabled}>
        {buttonIcon}
      </Button>
    </div>
  );
}
