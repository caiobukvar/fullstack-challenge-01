import { Heading } from "@chakra-ui/react";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Heading>Nome do site</Heading>
    </main>
  );
}
