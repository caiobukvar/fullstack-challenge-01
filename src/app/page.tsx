import { Heading } from "@chakra-ui/react";
import styles from "./page.module.scss";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <Heading>Nome do site</Heading>
      <ContactForm />
    </main>
  );
}
