import React from "react";
import LocalNav from "@/components/nav/LocalNav";
import Container from "@/components/Container";
import getCurrentUser from "../actions/getCurrentUser";
import getMyProducts from "../actions/getMyProducts";
import ProfileContent from "@/app/profile/ProfileClient";
import getFavoriteProducts from '../actions/getFavoriteProducts'

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  const myProducts = await getMyProducts(currentUser?.id);
  const favoriteProducts = await getFavoriteProducts(currentUser?.favoriteIds || []);

  return (
    <Container>
      <LocalNav title="내 프로필" />
      <ProfileContent
        currentUser={currentUser}
        products={myProducts}
        favoriteProducts={favoriteProducts}
      />
    </Container>
  );
};

export default ProfilePage;
