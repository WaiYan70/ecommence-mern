import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify/unstyled";

type ListProps = {
  token: string;
};

type Item = {
  image: string[];
  name: string;
  category: string;
  originalPrice: number;
};

const List: React.FC<ListProps> = ({ token }) => {
  const [itemList, setItemList] = useState([]);

  const fetchItemList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      if (response.data.success) {
        setItemList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <>
      <p className="mb-2">List of All Items</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
        </div>
        {itemList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img src={item.image[0]} className="w-12" alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {item.originalPrice}
              {currency}
            </p>
            <p></p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
