import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { useMagneticHover } from "../hooks/useMagneticHover";
import styles from "./Button.module.css";

interface SharedProps {
  variant?: "solid" | "outline" | "ghost";
  children: ReactNode;
  icon?: ReactNode;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "outline", children, icon, className, ...rest }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  // Ghost buttons are inline text links, not filled targets — a magnetic
  // pull there would read as a bug, not a feature.
  const magneticRef = useMagneticHover<HTMLAnchorElement & HTMLButtonElement>(variant === "ghost" ? 0 : 8);

  if ("href" in rest && rest.href) {
    return (
      <a ref={magneticRef} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span>{children}</span>
        {icon ?? <ArrowIcon />}
      </a>
    );
  }

  return (
    <button ref={magneticRef} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
      {icon ?? <ArrowIcon />}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
