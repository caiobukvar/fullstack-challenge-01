import { Heading } from "@chakra-ui/react";
import styles from "./page.module.scss";
import ContactForm from "@/components/contactForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <Heading>Bkvr.DEV</Heading>
      <ContactForm />
    </main>
  );
}
