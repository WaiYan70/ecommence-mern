import React, { useState } from "react";
import { assets } from "../assets/assets";

type AddProps = {
  token: string;
};

const Add: React.FC<AddProps> = ({ token }) => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productSize, setProductSize] = useState<string[]>([]);

  return (
    <form className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setImage1(event.target.files[0]);
                }
              }}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(event) => {
                if (event.target.files && event.target.files[1]) {
                  setImage2(event.target.files[1]);
                }
              }}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(event) => {
                if (event.target.files && event.target.files[2]) {
                  setImage3(event.target.files[2]);
                }
              }}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(event) => {
                if (event.target.files && event.target.files[3]) {
                  setImage4(event.target.files[3]);
                }
              }}
              type="file"
              id="image3"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(event) => setProductName(event.target.value)}
          value={productName}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write Product Name"
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(event) => setProductDescription(event.target.value)}
          value={productDescription}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Product Description"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(event) => setProductCategory(event.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(event) => setProductSubCategory(event.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="T-Shirt">TopWear</option>
            <option value="Jean">Jean</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(event) => setProductPrice(event.target.value)}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="100"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onChange={() =>
              setProductSize((prev) =>
                prev.includes("XXS")
                  ? prev.filter((item: string) => item !== "XXS")
                  : [...prev, "XXS"],
              )
            }
          >
            <p
              className={`${productSize.includes("XXS") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              XXS
            </p>
          </div>
          <div
            onChange={() =>
              setProductSize((prev) =>
                prev.includes("XS")
                  ? prev.filter((item: string) => item !== "XS")
                  : [...prev, "XS"],
              )
            }
          >
            <p
              className={`${productSize.includes("XS") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              XS
            </p>
          </div>
          <div
            onChange={() =>
              setProductSize((prev) =>
                prev.includes("S")
                  ? prev.filter((item: string) => item !== "S")
                  : [...prev, "S"],
              )
            }
          >
            <p
              className={`${productSize.includes("S") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onChange={() =>
              setProductSize((prev) =>
                prev.includes("M")
                  ? prev.filter((item: string) => item !== "M")
                  : [...prev, "M"],
              )
            }
          >
            <p
              className={`${productSize.includes("M") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onChange={() =>
              setProductSize((prev) =>
                prev.includes("L")
                  ? prev.filter((item: string) => item !== "L")
                  : [...prev, "L"],
              )
            }
          >
            <p
              className={`${productSize.includes("L") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onChange={() =>
              setProductSize((prev) =>
                prev.includes("XL")
                  ? prev.filter((item: string) => item !== "XL")
                  : [...prev, "Xl"],
              )
            }
          >
            <p
              className={`${productSize.includes("XL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onChange={() =>
              setProductSize((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item: string) => item !== "XXL")
                  : [...prev, "XXL"],
              )
            }
          >
            <p
              className={`${productSize.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
