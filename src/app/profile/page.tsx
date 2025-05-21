export const dynamic = "force-dynamic";

import LocalNav from "@/components/nav/LocalNav";
import Container from "@/components/Container";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getMyProducts from "@/app/actions/getMyProducts";
import getFavoriteProducts from "@/app/actions/getFavoriteProducts";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  const myProducts = await getMyProducts(currentUser?.id);
  const favoriteProducts = await getFavoriteProducts(currentUser?.favoriteIds || []);

  return (
    <Container>
      <LocalNav title="내 프로필" />
      <ProfileClient
        currentUser={currentUser}
        products={myProducts}
        favoriteProducts={favoriteProducts}
      />
    </Container>
  );
};

export default ProfilePage;