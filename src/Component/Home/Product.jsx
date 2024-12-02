import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    ScrollShadow,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
const Product = ({ product,index }) => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [display, setdisplay] = useState(false);
    const color = [...new Set(product.varients.map(el1 => el1.color.colorhex))];
    console.log(color)

    const handlepushItem = async () => {
        };
    return (
        <div>
            <Card className=" w-[280px] rounded-xl bg-white">
                <CardHeader className=" flex-col items-start">
                    <div
                        onMouseEnter={() => {
                            setdisplay(true);
                        }}
                        onMouseLeave={() => {
                            setdisplay(false);
                        }}
                        className="relative bg-center bg-no-repeat bg-cover w-full h-[250px] rounded-2xl"
                        style={{
                            backgroundImage: `url(${product.image.urlImage})`,
                        }}
                    >
                    </div>
                </CardHeader>
                <CardBody className="overflow-visible p-2 ml-4 p-2">
                    <p className="hover:underline font-[400] font-mono text-slate-500 font-xs mt-4" onClick={()=>{
                        navigate(`/detail/${index}`)
                    }}>
                        {product.name}
                    </p>


                </CardBody>
                <CardFooter className="flex justify-around w-full p-0 pb-2 ml-2 mt-0">
                    <div>
                        {color.map((el) => (
                            <div style={{ backgroundColor: el }} className="w-4 h-4 rounded-3xl"></div>
                        ))}
                    </div>
                    <div>{product.varients[0].versions.filter((el)=>!el.isdeleted)[0].selling_price} vnd</div>
                </CardFooter>
            </Card>
        </div>
    );
};
export default Product;
