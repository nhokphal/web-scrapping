"use client"



import { useStore } from "@/hooks/products"
import axios from "axios"
import { useState } from "react"

const SearchForm = () => {

    // const [searchPrompt, setSearchPromt] = useState("")
    // const [isloading, setLoarding] = useState(false)


    // const products = useStore((state: any) => state.products)
    // const addProduct = useStore((state: any) => state.addProduct)
    const [data, setData] = useState("");

    const OnSubmit = async (e: any) => {
        e.preventDefault();
        // setLoarding(true)
        // setSearchPromt(e.target.value)
        // axios.get("/api/job")
        const res = await fetch('/api/job/')
        setData(data)
        console.log(res)
        try {
            // const product = scrapProducts(searchPrompt)
            // addProduct(product)
            // setSearchPromt("")
            // console.log(product)

        } catch (error) {

        } finally {
            // setLoarding(false)
        }

    }


    return (
        <div className="flex items-center justify-between">
            <input
                className="w-full p-3 border-4 border-neutral-50"
                type="text"
                placeholder="search"
            >

            </input>
            <div className=" flex items-center justify-between gap-2 ml-5 mr-4">

                <button
                    className="text-white bg-black rounded-sm "
                    onClick={OnSubmit}
                // disabled={isloading}
                >
                    scrape
                </button>

                <button
                    // className={`${!products.length && !isloading ? "cursor-pointer" : ""} text-white bg-black rounded-sm`}
                    onClick={OnSubmit}
                // disabled={isloading}
                >
                    export
                </button>
            </div>

        </div >
    )
}


export default SearchForm;