import { icons } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <img src={icons.logo} alt="" className="mb-5  w-32" />
          <p className="w-full text-gray-60000">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            impedit velit, itaque recusandae qui ut eveniet? Asperiores facere
            temporibus at optio et consectetur. Ut, ipsum aspernatur iure optio
            ab recusandae.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-234-567-89</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 &copy; www.example.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
