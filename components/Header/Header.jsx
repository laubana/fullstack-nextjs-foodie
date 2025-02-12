import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";

import HeaderBackground from "@/components/HeaderBackground/HeaderBackground";
import Navigation from "@/components/Navigation/Navigation";

const navigations = [
  {
    href: "/meals",
    children: "Browse Meals",
  },
  {
    href: "/community",
    children: "Foodies Community",
  },
];

export default () => {
  return (
    <>
      <HeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image
            src="/images/logo.png"
            width={1024}
            height={1024}
            alt="logo"
            priority
          />
          <span>NextLevel Food</span>
        </Link>
        <nav className={styles.nav}>
          <ul>
            {navigations.map((navigation, index) => (
              <Navigation href={navigation.href} key={index}>
                {navigation.children}
              </Navigation>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};
