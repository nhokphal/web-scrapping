"use client"

import { useStore } from "@/hooks/products"



const Products = async () => {

    const products = useStore((state: any) => state.products)
    console.log("product : ", products)
    return (
        <div className="m-auto w-full">
            {products?.length > 0 ? (
                <div>
                    {products.map((product: any, index: number) => (
                        product.title ? (
                            <div key={index} className="border-4">
                                <div className="flex w-full items-top justify-between">
                                    <h3>{product.title}</h3>
                                    <a
                                        target="_blank"
                                        href={product?.url}
                                        className="hover:bg-gray-100 border px-4 py-1 ml-2 rounded-md"
                                    >
                                        link
                                    </a>
                                </div>
                            </div>) : null

                    ))}
                </div>) : (<>no products found</>)
            }
            <p>products: {products.title}</p>
        </div >
    )
}

export default Products;