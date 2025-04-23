import { cookies } from "next/headers";
import { parse } from "url";
import Container from "@/components/Container";
import getProducts from "../actions/getProducts";
import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import getCurrentUser from "../actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  const requestUrl = (await cookies()).get("next-url")?.value || "/";
  const { query } = parse(requestUrl, true);

  const latitude = query.latitude ? Number(query.latitude) : undefined;
  const longitude = query.longitude ? Number(query.longitude) : undefined;
  const category = typeof query.category === "string" ? query.category : undefined;

  const products = await getProducts({
    latitude,
    longitude,
    category,
  });

  return (
    <Container localNavTitle="홈">
      {products?.data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {products.data.map((product) => (
            <ProductCard key={product.id} currentUser={currentUser} data={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
