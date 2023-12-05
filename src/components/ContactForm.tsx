"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";
import database from "../../infra/database";

const initValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type ContactError = string | undefined;

interface ContactDataState {
  values: typeof initValues;
  isLoading: boolean;
  error: ContactError;
}

const initState: ContactDataState = {
  values: initValues,
  isLoading: false,
  error: undefined,
};

export default function ContactForm() {
  const toast = useToast();
  const [contactData, setContactData] = useState(initState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const { values, isLoading, error } = contactData;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setContactData((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [event.target.name]: event.target.value,
      },
    }));

  type onBlurEvent = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  const onBlur: onBlurEvent = ({ target }) => {
    setTouched((prev) => ({
      ...prev,
      [target.name]: true,
    }));
  };

  const onSubmit = async () => {
    setContactData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await sendContactForm(values);

      setTouched({});
      setContactData(initState);

      toast({
        title: "E-mail enviado com sucesso!",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      const typedError = error as Error;

      setContactData((prev) => ({
        ...prev,
        isLoading: false,
        error: typedError.message,
      }));
      toast({
        title: "Falha ao enviar e-mail. Tente novamente mais tarde!",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  return (
    <Card align="center" w="400px">
      <CardHeader>
        <Heading size="md"> Entre em contato</Heading>
      </CardHeader>
      <CardBody w="100%">
        <VStack gap={2}>
          <FormControl isRequired isInvalid={touched.name && !values.name}>
            <FormLabel>Nome</FormLabel>
            <Input
              name="name"
              placeholder="Insira seu nome"
              value={values.name}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <FormErrorMessage>Preenchimento obrigatório</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={touched.email && !values.email}>
            <FormLabel>E-mail</FormLabel>
            <Input
              name="email"
              placeholder="Insira seu e-mail"
              value={values.email}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <FormErrorMessage>Preenchimento obrigatório</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={touched.phone && !values.phone}>
            <FormLabel>Telefone</FormLabel>
            <Input
              name="phone"
              placeholder="Insira seu telefone"
              value={values.phone}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <FormErrorMessage>Preenchimento obrigatório</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={touched.message && !values.message}
          >
            <FormLabel>Mensagem</FormLabel>
            <Textarea
              name="message"
              placeholder="Insira o motivo de contato"
              value={values.message}
              onChange={handleChange}
              onBlur={onBlur}
            />
            <FormErrorMessage>Preenchimento obrigatório</FormErrorMessage>
          </FormControl>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          isDisabled={
            !values.name || !values.phone || !values.email || !values.message
          }
          onClick={onSubmit}
        >
          Enviar
        </Button>
      </CardFooter>
    </Card>
  );
}
