import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  Product } from '../Redux/Selector.jsx';
import Product1 from './Product';

const List = () => {
/*
  const filter = useSelector(filtertype);
*/
  const [productlist, setProductlist] = useState([]);
  const list = useSelector(Product);
/*
  const search=useSelector(Search)
*/
  useEffect(() => {
    setProductlist(list);
  }, [list]);

  return (
    <div className='w-full flex flex-row flex-wrap gap-3 justify-center bg-[#f4f4f4] pt-3 pb-8'>
      {productlist &&
        productlist
          /*.filter((el) => (filter ? el.type.includes(filter) : true)).filter((el)=>el.name.includes(search))*/
          .map((el,index) => (
            <Product1 key={el.id} product={el} index={index} />
          ))}
    </div>
  );
};

export default List;
