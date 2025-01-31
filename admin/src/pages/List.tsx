import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL, currency } from "../App";
import { toast } from "react-toastify/unstyled";

type ListProps = {
  token: string;
};

type Product = {
  _id: string;
  image: string[];
  title: string;
  category: string;
  originalPrice: number;
};

const List: React.FC<ListProps> = ({ token }) => {
  const [list, setList] = useState<Product[]>([]);

  const fetchItemList = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(
          response.data.listOfProducts ? response.data.listOfProducts : [],
        );
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

  const removeProduct = async (id: string) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/product/remove`,
        { productId: id },
        { headers: { token } },
      );
      console.log(response.data.success);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchItemList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An Unexpected Error occurred");
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
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img src={item.image[0]} className="w-12" alt="" />
            <p>{item.title}</p>
            <p>{item.category}</p>
            <p>
              {item.originalPrice}
              {currency}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
