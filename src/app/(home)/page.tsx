import Container from "@/components/Container";
import getProducts, { ProductsParams } from "../actions/getProducts";

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {

  const products = await getProducts(searchParams);

  return (
    <Container localNavTitle='홈'>
      Home
    </Container>
  );
}
