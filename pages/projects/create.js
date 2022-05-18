import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useBoolean,
    useDisclosure,
  } from "@chakra-ui/react";
  import Image from "next/image";
  import { useRouter } from 'next/router'
  import { useCallback, useEffect, useRef, useState } from "react";
  import { useForm } from "react-hook-form";
  import CropperComp from "../../components/Unsorted/Cropper";
  import { useToast } from "@chakra-ui/react";
  import axios from "axios";
  import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
  } from "chakra-react-select";
  import prisma from "../../lib/prisma";
  
  
  export default function Project({analyzer}) {
    const [isLoading, setLoading] = useBoolean(false);
    const router = useRouter()
  
    const {
      register,
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  

    const submit = async (data) => {
      console.log(data)
      await axios.post("/api/project/create",data);
      setLoading.off();
      router.push("/projects")
    };

    const analyzerOptions = []
    console.log(analyzer)
    for (let i = 0; i < analyzer.length; i++) {
      analyzerOptions.push({
        label: analyzer[i]['name'],
        value: analyzer[i]['id']
      },);
      }
  
    return (
      <>
        <Container
          as="form"
          p={6}
          bg="white"
          onSubmit={handleSubmit(submit)}
        >
          <FormControl pb={4} isInvalid={errors.name}>
            <FormLabel htmlFor="name">Projectname</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register("name", {
              })}
            />
            <FormLabel>
              Select Analyzers
            </FormLabel>
            <select {...register("analyzers")} multiple>
              {analyzerOptions.map(item =>
              <option value={item.value}>
                {item.label}
              </option>)}
            </select>
          </FormControl>
          
          <Button
            mt={4}
            isLoading={isLoading}
            type="submit"
            colorScheme="blackAlpha"
            isFullWidth
          >
            Create
          </Button>
        </Container>
      </>
    );
  }

  export async function getServerSideProps({params}) {
    const analyzer = await prisma.analyzer.findMany({
      select: {
        id: true,
        name: true,
        width: true,
        height: true,
        depth: true,
        client: {
          select: {
            name: true,
          },
        },
      },
    });
  
    return {
      props: { analyzer },
    };
  }




  