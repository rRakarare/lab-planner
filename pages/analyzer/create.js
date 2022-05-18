import { Button, Container, ListItem, UnorderedList, FormControl,
    FormErrorMessage,
    FormLabel,useBoolean,
    Input} from "@chakra-ui/react";
  import prisma from "../../lib/prisma";
  import { Canvas, useFrame } from '@react-three/fiber';
  import { Box, OrbitControls } from '@react-three/drei'
  import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
  import React, { useRef } from "react";
  import { useForm } from "react-hook-form";
  import axios from "axios";
  import { useRouter } from 'next/router';
  import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
  } from "chakra-react-select";

export default function Create({ clients }) {
  
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
      await axios.post("/api/analyzer/create",data);
      setLoading.off();
      router.push("/analyzer")
    };

    const clientOptions = []
    
    for (let i = 0; i < clients.length; i++) {
        clientOptions.push({
        label: clients[i]['name'],
        value: clients[i]['id']
      },);
      }

  
  
  
  
    return (
      
      <Container maxW="container.xl">
        <Container         
          as="form"
          p={6}
          
          onSubmit={handleSubmit(submit)}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              bgColor = "White"
              {...register("name", {
              })}
            />
             <FormLabel htmlFor="width">Width</FormLabel>
            <Input
              id="width"
              bgColor = "White"
              {...register("width", {
              })}
            />
             <FormLabel htmlFor="height">Height</FormLabel>
            <Input
              id="height"
              bgColor = "White"
              {...register("height", {
              })}
            />
             <FormLabel htmlFor="depth">Depth</FormLabel>
            <Input
              id="depth"
              bgColor = "White"
              {...register("depth", {
              })}
            />
            <FormLabel>
            Client
            </FormLabel>
            <Input
              id="client"
              bgColor = "White"
              {...register("client", {
              })}
            />
        {/*}    <Select
              id="client"
              options={clientOptions}
              placeholder="Select a client..."
              closeMenuOnSelect={true}
              colorScheme = "White"
              {...register("client", {})}
            />*/}
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
    </Container>
    );
  }
  
  export async function getServerSideProps({ params }) {
    
  
    const clients = await prisma.client.findMany({
    });
  
    return {
      props: { clients },
    };
  }