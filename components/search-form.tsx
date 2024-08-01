"use client"


import { scrapProducts } from "@/actions/scrape-products"
import { useStore } from "@/hooks/products"
import { useState } from "react"

const SearchForm = () => {

    const [searchPrompt, setSearchPromt] = useState("")
    const [isloading, setLoarding] = useState(false)


    const products = useStore((state: any) => state.products)
    const addProduct = useStore((state: any) => state.addProduct)


    const OnSubmit = (e: any) => {
        e.preventDefault();
        setLoarding(true)
        setSearchPromt(e.target.value)


        try {
            const product = scrapProducts(searchPrompt)
            addProduct(product)
            setSearchPromt("")
            console.log(product)

        } catch (error) {

        } finally {
            setLoarding(false)
        }

    }


    return (
        <div className="flex items-center justify-between">
            <input
                className="w-full p-3 border-4 border-neutral-50"
                type="text"
                placeholder="search"
                value={searchPrompt}
                onChange={(e) => setSearchPromt(e.target.value)}

            >

            </input>
            <div className=" flex items-center justify-between gap-2 ml-5 mr-4">

                <button
                    className="text-white bg-black rounded-sm "
                    onClick={OnSubmit}
                    disabled={isloading}
                >
                    scrape
                </button>

                <button
                    className={`${!products.length && !isloading ? "cursor-pointer" : ""} text-white bg-black rounded-sm`}
                    onClick={OnSubmit}
                    disabled={isloading}
                >
                    export
                </button>
            </div>

        </div >
    )
}


export default SearchForm;