import { Button, Container, FormLabel, Input, useBoolean, FormControl } from "@chakra-ui/react";
import prisma from "../../../lib/prisma";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei'
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/router'
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { Material } from "three";

const boxes = ({ project })=>{
    
    const amount = anaylzers.length
    return(
      <h1>hello world</h1>
    )
}

export default function ProjectDetail({ project }) {
  const teiler = 40;
  const refs = [];
  const names = [];
  const analyzerIds = [];
  const analyzers = project["analyzers"]
  for (let i = 0; i < analyzers.length; i++) {
    names[i] = analyzers[i]["name"];
    analyzers[i]["zaehler"] = i
  }
  for (let index = 0; index < analyzers.length; index++) {
    refs[index] = useRef();
    analyzerIds[index] = analyzers[index]["id"]
  }
  const router = useRouter()
  

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({defaultValues: {
    name: project.name,
    analyzers: analyzerIds,
  }});


  const submit = async (data) => {
    console.log(data)
    await axios.post("/api/project/update",data);
    router.push("/projects/")
  };



  return (
    
    <Container maxW="container.xl">
      <Container         
        as="form"
        p={6}
        
        onSubmit={handleSubmit(submit)}>
        <FormControl>
        <FormLabel htmlFor="id">ID</FormLabel>
          <Input
            defaultValue={project.id}
            id="id"
            bgColor = "White"
            //disabled
            {...register("id", {
            })}
          />
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            bgColor = "White"
            {...register("name", {
            })}
          />
           <FormLabel htmlFor="analyzers">Analyzers</FormLabel>
          <Input
            id="analyzers"
            bgColor = "White"
            {...register("analyzers", {
            })}
          />
        </FormControl>
        <Button
          mt={4}
          type="submit"
          colorScheme="blackAlpha"
          isFullWidth
        >
          Update
        </Button>
      </Container>
        {analyzers.map(item =>
        <div>
          {item.name}
              <Canvas>
                <OrbitControls
                  autoRotate />
                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <mesh ref={refs[item.zaehler]}>
                  <boxGeometry args={[item.width / teiler, item.height / teiler, item.depth / teiler]} />
                  <meshPhongMaterial color="white" />

                </mesh>
              </Canvas>
            </div>)}

      <Button onClick={()=>exportAll(refs, names)}>Export</Button> 
  </Container>
  );
}

export async function getServerSideProps({ params }) {
  const id = Number(params.id);
  

  const project = await prisma.project.findFirst({
    where: {
      id: id,
    },
    include: {
      analyzers: true,
    }
  });


  return {
    props: { project },
  };
}



export function save(blob, filename) {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

  }

function exportdata(ref, filename) {
    const exporter = new GLTFExporter();
    const options = {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      binary: false,
      maxTextureSize: Number(4096) || Infinity // To prevent NaN value
    };
    exporter.parse(
        ref.current,
        function (result) {
            const output = JSON.stringify(result, null, 2);
            save(new Blob([output], { type: "text/plain" }), filename);      
        },
        options
      );
    
    };

function exportAll(refs, names) {
  
  for (let index = 0; index < refs.length; index++) {
    exportdata(refs[index], names[index] + ".gltf")    
  }
}
