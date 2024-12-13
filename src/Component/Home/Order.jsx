import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader, Dropdown,
    DropdownItem, DropdownMenu,
    DropdownTrigger,
    User
} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faMinus, faPlus, faTrash, faTruckRampBox} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {ColorData, Product, SizeData} from "../Redux/Selector.jsx";
import {ChangeItemQuanlity, ChangeQuantity, DeleteOrderItem} from "../Redux/OrderSlice.jsx";
const Order = ({ order }) => {
    const dispatch=useDispatch();
    const product=useSelector(Product)
    const color=useSelector(ColorData);
    const size=useSelector(SizeData);
    console.log(product)
    return(
        <Dropdown
            showArrow
            radius="sm"
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
            }}
            aria-label="Multiple selection example"
            variant="flat"
        >
            <DropdownTrigger>
                <Button
                    variant="ghost"
                    disableRipple
                    className="focus:outline-none hover:border-0"
                >
                    <Badge
                        content={3}
                        className="bg-blue-300"
                        color="primary"
                    >
                        <FontAwesomeIcon size="xl" icon={faCartShopping} />
                    </Badge>
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={["profile"]}
                className="p-3 bg-white rounded-xl shadow-inner h-[300px] overflow-y-scroll"
                itemClasses={{
                    base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                }}
            >
                 <DropdownItem
                    key="Orders"
                    endContent={<FontAwesomeIcon icon={faTruckRampBox} />}
                  >
                  <Link to={'order'}>Orders</Link>

                  </DropdownItem>
                <DropdownItem className=""
                              startContent={<div>{3} Sản Phẩm</div>}
                >
                    <Link to={"/cart"}>Xem tất cả</Link>
                </DropdownItem>
                {Object.entries(order).length != 0&&order.orderitems!=null&&order.orderitems.map((el) => (
                    <DropdownItem
                        className="border-b-[2px] border-slate-200  rounded-none"
                        endContent={
                            <div>
                                <Button
                                    size="sm"
                                    onClick={async () => {
                                        if (el.quantity - 1 != 0) {
                                                await dispatch(
                                                    ChangeQuantity({
                                                        OrderItemid: el.idorderitem,
                                                        quantity: el.quantity - 1,})
                                                );

                                        }
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        style={{ color: "#74C0FC" }}
                                    />
                                </Button>
                                <span className="p-2">{el.quantity}</span>
                                <Button
                                    size="sm"
                                    className="w-5"
                                    onClick={async () => {
                                        await dispatch(
                                            ChangeQuantity({
                                                OrderItemid: el.idorderitem,
                                                quantity: el.quantity + 1,})
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ color: "#74C0FC" }}
                                    />
                                </Button>
                            </div>
                        }
                        startContent={
                            <div
                                onClick={async () => {
                                    await dispatch(DeleteOrderItem({OrderItemid: el.idorderitem,}))
                                }}
                                className="w-6 justify-center items-center flex rounded-full h-6 hover:border-[2px] hover:border-red-400"
                            >
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ color: "#ff0a74" }}
                                />
                            </div>
                        }
                        key={el.productID}
                    >
                        <div className="w-full flex justify-between gap-2">
                            <User
                                avatarProps={{
                                    size: "md",
                                    src: product.find(
                                        (el1) => el1.name == el.productname
                                    ).image.urlImage
                                        ||"",
                                }}
                                description={
                                    <div className="flex flex-row items-center justify-center  w-[100px] items-center gap-1">
                                        <div
                                            className="flex flex-row w-[40px] h-[13px] rounded-2xl gap-1 font-serif font-bold"
                                            style={{
                                                backgroundColor: color.length != 0
                                                    ? color.find((el1) => el1.colorname == el.colorname)?.colorhex || ""
                                                    : "",
                                            }}
                                        >


                                        </div>
                                        <div
                                            className="flex flex-row w-[40px] h-[13px] rounded-2xl gap-1 font-serif font-bold"

                                        > /{" "}{
                                            size.length != 0
                                                ? size.find((el1) => el1.sizename == el.sizename)?.size:""

                                        }</div>
                                    </div>

                                }
                                name={el.productname}
                            />
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>


    );
};
export default Order;