

import "./App.css";
import Navbar from "./Component/Home/Navbar";
/*
import { useDispatch } from "react-redux";
*/
import { Outlet } from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {FetchInfom} from "./Component/Redux/Product.jsx";
/*import { infor } from "./Component/Redux/Selector";*/
/*
import { useSelector } from "react-redux";
*/
function App() {
/*
    const Infor=useSelector(infor)
*/
    const dispatch = useDispatch();
    /*useWebSocket(
        'ws://26.232.136.42:8080/ws/purchase',
        async(event) => {
            const newOrder = JSON.parse(event.data);
            await dispatch(GetproductbyID(newOrder))
            toast.info('Hệ thống vừa có sản phẩm mới', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        },
    );
    useWebSocket(
        `ws://26.232.136.42:8080/ws/orderstatus?idAccount=${Object.keys(Infor).length!=0?Infor.account_id:-1}`,
        async(event) => {
            // alert(event.data)
            const newOrder = event.data;
            await dispatch(GetOrderbyID(newOrder.split(' ')[0]));
            toast.info(`${Status[newOrder.split(' ')[1]]}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        },
    );*/
    useEffect(() => {
        const fetch = async () => {
            await dispatch(FetchInfom());
        };
        fetch();
    }, []);
    // useSocket();
    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-full h-full flex flex-col">
                <div className="w-screen h-20">
                    <Navbar />
                </div>
                <div className="w-full h-full ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default App;
