import { Container, HStack, Tag, Box, Icon, Button } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { Image } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import Link from "next/link";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";

export default function Analyzer({ data }) {
  console.log(data);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Breite",
      selector: (row) => row.width,
    },
    {
      name: "Höhe",
      selector: (row) => row.height,
    },
    {
      name: "Tiefe",
      selector: (row) => row.depth,
    },
    {
      name: "Edit",
      cell: (e) => {
        return (
          <Link href={`analyzer/${e.id}`}>
            <Button>Edit</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <Container maxW="container.xl">
        <Link href="/">
          <Button my={4} size={"sm"} bg="white" colorScheme={"gray"}>
            <Box mr={2}>Create Analyzer</Box> <FaPlus />
          </Button>
        </Link>
        <DataTable columns={columns} data={data} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const data = await prisma.analyzer.findMany();

  return {
    props: {
      data: data,
    },
  };
}
