import Container from "@/components/Container";
import getProducts from "../actions/getProducts";
import getCurrentUser from "../actions/getCurrentUser";
import Categories from "@/components/categories/Categories";
import ProductList from "@/components/ProductList";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const products = await getProducts();

  return (
    <Container>
      <Categories />
      <ProductList products={products.data} currentUser={currentUser} />
    </Container>
  );
}
