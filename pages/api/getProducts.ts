import { useEffect, useState } from 'react';

interface Props {
  url: string;
}

export async function GetProducts({ url }: any) {
  const [products, setProducts] = useState([]);
  const fetchData = await fetch(url);
  const res: any = fetchData.json();
  setProducts(res.products);

  return products;
}
