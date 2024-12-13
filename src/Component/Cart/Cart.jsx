import {
  faMinus,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Slider,
} from "@nextui-org/react";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {ChangeQuantity, DeleteOrderItem, UpdateOrderItem} from "../Redux/OrderSlice.jsx";
import {ColorData, SizeData} from "../Redux/Selector.jsx";

const Cart = ({ item, product }) => {
    console.log(item)
    console.log(product)
  const dispatch = useDispatch();
    const colorApi=useSelector(ColorData);
    const sizeApi=useSelector(SizeData);
  const [selectedKeysSize, setSelectedKeysSize] = React.useState(item.sizename);
  const [selectedKeysColor, setSelectedKeysColor] = React.useState(colorApi.find((el)=>el.colorname==item.colorname).colorhex);
  const sizedata=Array.from(new Set(product.varients.map((el)=>el.size.size)));
  const colordata=Array.from(new Set(product.varients.map((el)=>el.color.colorhex)))
console.log(selectedKeysSize)
    console.log(selectedKeysColor)
  const [flat, setflat] = useState(true);
  const handlechangeSize = (e) => {
    setSelectedKeysSize(Array.from(e));
    setSelectedKeysColor("");
    // console.log(selectedKeysColor)
  };
  const handlechangeColor = (e) => {
    setSelectedKeysColor(Array.from(e));
  };

  console.log(selectedKeysColor);
  return (
    <div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardBody>
          <div className=" w-full flex flex-row gap-2  border-b-2 border-slate-300">
            <div className="relative w-[30%] col-span-6 md:col-span-4 items-center flex">
              <Image
                alt="Album cover"
                className="object-cover m-auto p-2 rounded-2xl"
                height={100}
                shadow="md"
                radius="lg"
                src={product.image.urlImage}
                width="100%"
              />
            </div>

            <div className="flex flex-col h-full w-[350px] p-3 gap-4">
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                  <Button
                    onClick={async () => {
                        if (item.quantity - 1 != 0) {
                            await dispatch(
                                ChangeQuantity({
                                    OrderItemid: item.idorderitem,
                                    quantity: item.quantity - 1,
                                })
                            );
                        }
                    }}
                    size="sm"
                    className="w-4"
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                      style={{ color: "#74C0FC" }}
                    />
                  </Button>
                  <div className="flex items-center text-lg font-mono">
                    {item.quantity}
                  </div>
                  <Button
                    size="sm"
                    onClick={async () => {
                        await dispatch(
                            ChangeQuantity({
                                OrderItemid: item.idorderitem,
                                quantity: item.quantity + 1,
                            })
                        );
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ color: "#74C0FC" }}
                    />
                  </Button>
                </div>
                <div className=" flex flex-row gap-3 items-center">
                  <FontAwesomeIcon
                  onClick={async () => {
                      await dispatch(DeleteOrderItem({OrderItemid: item.idorderitem,}))
                  }}
                    icon={faTrash}
                    style={{
                      color: "#f37474",
                    }}
                  />
                  <FontAwesomeIcon
                    onClick={() => setflat(!flat)}
                    icon={faPenToSquare}
                    style={{
                      color: "#5d96f8",
                    }}
                  />
                </div>
              </div>
              <div className="w-full font-serif text-md">
                {item.productname}
              </div>
              {flat ? (
                <div className="flex flex-row gap-2">
                  <div className="font-serif">
                    Size{" "}
                    <span className="font-mono font-bold">{item.sizename}</span>{" "}
                  </div>
                  /
                  <div className="font-serif flex flex-row items-center gap-2">
                    Color{" "}
                    <div
                      className="w-10 h-4 rounded-sm"
                      style={{ backgroundColor: colorApi.find((el)=>el.colorname==item.colorname).colorhex }}
                    ></div>{" "}
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-row gap-3">
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize border-[2px] border-slate-300"
                        >
                          {Array.from(selectedKeysSize)[0]}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        onBlurCapture={"onBlurCapture"}
                        classNames={{
                          base: "w-[100px] rounded-xl bg-white border-[2px] border-slate-200 backdrop-blur-2xl",
                        }}
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeysSize}
                        onSelectionChange={handlechangeSize}
                      >
                        {sizedata.map((el) => (
                          <DropdownItem key={el}>{el}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize  border-[2px] border-slate-200"
                        >
                          {selectedKeysColor != "" ? (
                            <div
                              style={{ backgroundColor: selectedKeysColor }}
                              className="h-[30px] w-[50px] rounded-xl"
                            ></div>
                          ) : (
                            "Chọn Size"
                          )}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        classNames={{
                          base: "w-[100px] rounded-xl bg-white border-[2px] border-slate-200 backdrop-blur-2xl",
                        }}
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeysColor}
                        onSelectionChange={handlechangeColor}
                      >
                        {colordata
                          .map((el) => (
                            <DropdownItem
                              style={{ backgroundColor: el }}
                              className="h-10 rounded-xl"
                              key={el}
                            ></DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              )}
              {flat ? (
                <div className="font-mono text-xl">
                  {(item.price_at_sale*item.quantity).toLocaleString("vi-VN")} vnd
                </div>
              ) : (
                <div className="w-full flex justify-end">
                  <Button
                    onClick={async () => {
                        await dispatch(UpdateOrderItem({data:{
                            colorname:colorApi.find((el)=>el.colorhex==selectedKeysColor).colorname,
                            sizename:sizeApi.find((el)=>el.size==selectedKeysSize).sizename,
                            price_at_sale:product.varients
                                .find((el) => el.color.colorhex == selectedKeysColor && el.size.size == selectedKeysSize)
                                .versions.find((el) => el.isdeleted == false).selling_price
                        },id:item.idorderitem}))
                    }}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cart;
