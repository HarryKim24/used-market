import Container from "@/components/Container";
import getProducts, { ProductsParams } from "../actions/getProducts";
import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import getCurrentUser from "../actions/getCurrentUser";

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {

  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <Container localNavTitle='홈'>
      {
        products?.data.length === 0
        ? <EmptyState /> :
        <>
          <div className="grid grid-cols-1 gap-8 pt-12
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6
          ">
            {
              products.data.map((product) => (
                <ProductCard
                  currentUser={currentUser}
                  key={product.id}
                  data={product}
                />
              ))
            }
          </div>
        </>
      } 
    </Container>
  );
}
