import { FC } from 'react';
import cn from 'classnames';

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const NavButton: FC<NavButtonProps> = ({ label, isActive, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'text-left font-semibold leading-tight transition-colors',
      isActive ? 'text-[#217EA6]' : 'text-[#171717] hover:text-[#217EA6]',
      className
    )}
  >
    {label}
  </button>
);
