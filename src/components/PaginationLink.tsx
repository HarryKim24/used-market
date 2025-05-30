'use client'
import { PRODUCTS_PER_PAGE } from '@/constants';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import qs from 'query-string';
import Link from 'next/link';

interface PaginationLinkProps {
  children: React.ReactNode;
  page?: number | string;
  active?: boolean;
  disabled?: boolean;
}

const PaginationLink = ({
  page, active, children, disabled
}: PaginationLinkProps) => {

  const params = useSearchParams();

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery = {
    ...currentQuery,
    page: page,
  }
  

  return (
    <Link 
      href={{ query: updatedQuery }} 
      className={`
        p-2 text-2xl
        ${active ? 'font-bold text-gray-700' : 'text-gray-500'}
        ${disabled ? 'pointer-events-none text-neutral-300' : ''}
      `}
    >
      {children}
    </Link>
  )
}

export default PaginationLink
