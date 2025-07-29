import React, { useEffect, useState } from 'react'
import AuthUser from '../../helpers/AuthUser';

export default function ContactUs() {

    const [products, setProducts] = useState();

    const { http } = AuthUser();

    useEffect(() => {
        http.get('https://dummyjson.com/products').then((res) => {
            console.log(res.data.products);

            setProducts(res.data.products);


        })
    }, []);


    return (
        <div className='px-4'>
            <h1 className='text-center text-[30px] text-blue-600 font-bold'>
                All Products
            </h1>

            <div>

                {
                    products ? products.map((product, index) => (
                        <div key={product.id} className="bg-white w-[100%] rounded-[10px] p-2 flex items-center gap-4 my-2">
                            <img className='w-[120px] h-[120px] rounded-[10px]' src={product.thumbnail} alt="" />
                            <div>
                                <h1 className='text-blue-500 font-bold text-[20px]'>{product.title}</h1>
                                <h1 className='text-blue-400 font-semibold text-[16pxpx]'>Category: {product.category}</h1>
                                <h1 className='text-blue-400 font-semibold text-[16pxpx]'>Brand: {product.brand}</h1>
                                <h1 className='text-blue-400 font-semibold text-[16pxpx]'>Price: ${product.price}</h1>

                                <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-full'>Buy Now</button>
                            </div>
                        </div>
                    )) : null
                }



            </div>



        </div>
    )
}
