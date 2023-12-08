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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

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

  const OnBlurEvent = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((prev) => ({
      ...prev,
      [target.name]: true,
    }));

  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md"> Entre em contato conosco!</Heading>
      </CardHeader>
      <CardBody w="500px">
        <VStack spacing={2}>
          <FormControl isRequired isInvalid={touched.name && !values.name}>
            <FormLabel>Nome</FormLabel>
            <Input
              name="name"
              placeholder="Insira seu nome"
              value={values.name}
              onChange={handleChange}
              onBlur={OnBlurEvent}
            />
            <FormErrorMessage>Preenchimento obrigatório</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={touched.email && !values.email}>
            <FormLabel>E-mail</FormLabel>
            <Input
              name="email"
              placeholder="Insira seu email"
              value={values.email}
              onChange={handleChange}
              onBlur={OnBlurEvent}
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
              onBlur={OnBlurEvent}
            />
            <FormErrorMessage>Preenchimento obrigatório</FormErrorMessage>
          </FormControl>

          <FormControl
            isRequired
            isInvalid={touched.message && !values.message}
          >
            <FormLabel>Motivo de contato</FormLabel>
            <Textarea
              name="message"
              placeholder="Insira o motivo de contato "
              value={values.message}
              onChange={handleChange}
              onBlur={OnBlurEvent}
            />
            <FormErrorMessage>Preenchimento obrigatório</FormErrorMessage>
          </FormControl>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button
          colorScheme="blue"
          isDisabled={
            !values.name || !values.email || !values.phone || !values.message
          }
        >
          Enviar
        </Button>
      </CardFooter>
    </Card>
  );
}
