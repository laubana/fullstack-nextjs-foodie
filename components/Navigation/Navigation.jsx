"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

export default ({ href, children }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={pathname.startsWith(`${href}`) ? styles.active : undefined}
      >
        {children}
      </Link>
    </li>
  );
};
