'use client';
import React, { useEffect, useState } from 'react';

import { useApi } from '@/hooks';
import MuiNavBar from './MuiNavBar';
import { useCart } from './cart';

const NavBar = (props) => {
  const [query, setQuery] = useState('');
  const { count } = useCart();

  const { searchProducts } = useApi();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length === 0) {
        props.loadProducts(10);
      } else {
        searchProducts(query).then((res) => {
          props.setProducts(res.data.products);
        });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return <MuiNavBar query={query} setQuery={setQuery} cart={count} />;
};

export default NavBar;
