// ExampleComponent.tsx
"use client"


import React, { useEffect, useState } from 'react';


interface Job {
    title?: string,
    category: string,
    salary: string,
}


const Products: React.FC = () => {
    const [scrapedData, setScrapedData] = useState<Job[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/job');
                const data = await res.json()

                console.log("data", data)
                setScrapedData(data)
                console.log("hook:", scrapedData, "type", typeof (scrapedData))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [scrapedData]);
    return (
        <div>
            {/* <p>Title: {scrapedData?.title.map((item: any, index: any) => (
                <li key={index}>{item.title}</li>
            ))}</p> */}

            {/* <p>item list: {scrapedData.itemList.map((item: any, index) => (
                <li key={index}>{item}</li>
            ))}</p> */}
            {Object.keys(scrapedData).map((key: any) => (
                <>
                    <div className='text-center flex justify-center rounded-md w-full '>
                        <div className="flex " title="Woman holding a mug">
                            <div className=' items-center m-auto justify-start'>

                                <h3>Position:{scrapedData[key].title}</h3>
                                <p>salary:{scrapedData[key].salary}</p>
                                <p>category: {scrapedData[key].category}</p>
                            </div>

                        </div>
                    </div>


                </>
            ))}


        </div>
    );
};

export default Products;
