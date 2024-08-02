// ExampleComponent.tsx
"use client"


import React, { useEffect, useState } from 'react';


interface Job {
    title?: string,
    description: string,
    price: string,
    itemList: []
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
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>

            <p>"title" {scrapedData.title}</p>
            {/* <p>Title: {scrapedData?.title.map((item: any, index: any) => (
                <li key={index}>{item.title}</li>
            ))}</p> */}

            {/* <p>item list: {scrapedData.itemList.map((item: any, index) => (
                <li key={index}>{item}</li>
            ))}</p> */}


        </div>
    );
};

export default Products;
