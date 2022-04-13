import { ListItem, OrderedList } from "@chakra-ui/react";
import prisma from "../../../lib/prisma";

export default function AnalyzerDetail({ analyzer }) {
  console.log(analyzer);

  return (
    <OrderedList>
      <ListItem>name: {analyzer.name}</ListItem>
      <ListItem>name: {analyzer.width}</ListItem>
      <ListItem>name: {analyzer.height}</ListItem>
      <ListItem>name: {analyzer.depth}</ListItem>
    </OrderedList>
  );
}

export async function getServerSideProps({ params }) {
  const id = Number(params.id);

  const analyzer = await prisma.analyzer.findFirst({
    where: {
      id: id,
    },
  });

  console.log(analyzer);

  return {
    props: { analyzer },
  };
}
