import React from 'react';
import { cn } from '@/lib/utils';

export type GlowVariant = 'orange' | 'blue' | 'green' | 'dark' | 'purple' | 'gray';

export const SocialGlowButton = ({
  href,
  children,
  variant = 'blue',
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: GlowVariant;
  className?: string;
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'orange':
        return "[box-shadow:0_0_100px_-10px_#DE732C] before:[box-shadow:0_0_4px_-1px_#fff_inset] bg-[#DE732C] border-[#f8d4b3]/80";
      case 'blue':
        return "[box-shadow:0_0_100px_-10px_#0165FF] before:[box-shadow:0_0_7px_-1px_#d5e5ff_inset] bg-[#126fff] border-[#9ec4ff]/90";
      case 'green':
        return "[box-shadow:0_0_100px_-10px_#21924c] before:[box-shadow:0_0_7px_-1px_#91e6b2_inset] bg-[#176635] border-[#c0f1d3]/70";
      case 'purple':
        return "[box-shadow:0_0_100px_-10px_#5865F2] before:[box-shadow:0_0_7px_-1px_#c2c7ff_inset] bg-[#5865F2] border-[#aab1ff]/90";
      case 'dark':
        return "[box-shadow:0_0_100px_-10px_#ffffff] before:[box-shadow:0_0_7px_-1px_#999_inset] bg-[#24292e] border-[#888888]/90";
      case 'gray':
        return "[box-shadow:0_0_100px_-10px_#888] before:[box-shadow:0_0_4px_-1px_#fff_inset] bg-[#333] border-[#ccc]/80";
      default:
        return "";
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-11 h-11 justify-center hover:opacity-[0.90] rounded-lg border font-medium relative overflow-hidden after:absolute after:content-[''] after:inset-0 after:[box-shadow:0_0_15px_-1px_#ffffff90_inset] after:rounded-lg before:absolute before:content-[''] before:inset-0 before:rounded-lg flex items-center before:z-20 after:z-10 text-white transition-all duration-300 ease-out scale-80 hover:scale-85 active:scale-75 group",
        getVariantStyles(),
        className
      )}
    >
      <div className="flex items-center justify-center w-full h-full z-0 relative text-[14px]">
        {children}
      </div>
    </a>
  );
};
