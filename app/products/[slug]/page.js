import React from 'react'
import ProductPage from './product'
import { cookies } from 'next/headers'

const page = async () => {
    const cookieStore = await cookies();
  const token = cookieStore.get("Authtoken");

   
  return (
    <ProductPage token={token?.value}/>
  )
}

export default page