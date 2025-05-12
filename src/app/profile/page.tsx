import React from 'react';
import LocalNav from '@/components/nav/LocalNav';
import Container from '@/components/Container';
import getCurrentUser from '../actions/getCurrentUser';
import getMyProducts from '../actions/getMyProducts';
import ProfileContent from '@/components/ProfileContent';

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();
  const products = await getMyProducts(currentUser?.id);

  return (
    <Container>
      <LocalNav title="내 프로필" />
      <ProfileContent currentUser={currentUser} products={products} />
    </Container>
  );
};

export default ProfilePage;
