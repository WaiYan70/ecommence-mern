import { image_section } from "../assets/assets";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={image_section.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adi pisicing elit. Velit hic
            maiores nostrum at officiis sunt omnis alias laudantium provident
            voluptatibus.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore at
            veniam iusto nam omnis reprehenderit officiis.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quae exercitationem nam! Obcaecati est exercitationem velit
            reiciendis minus voluptatibus cum dolorum eos eum temporibus, culpa
            error, officiis quo ipsam ipsum.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
            vel tempora beatae mollitia molestias iure expedita saepe dolorem
            ipsum animi quas, consequuntur ea sed odio deleniti aliquid possimus
            officiis vitae.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
            facere officia aspernatur consequuntur nisi nobis laborum corrupti
            nostrum perferendis voluptatem, saepe ea quam, esse autem eum
            molestias minima ducimus vel?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            necessitatibus voluptatibus consequatur sequi, architecto deserunt
            accusamus soluta ab dignissimos odio, ipsa recusandae laboriosam
            obcaecati! Tenetur est maxime iusto aspernatur odit!
          </p>
        </div>
      </div>
      <div className="text-xl text-center pt-8">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={image_section.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl">Our Store</p>
          <p className="text-gray-500">
            12345 Central Rama 9 <br /> Phra Rama 9{" "}
          </p>
          <p className="text-gray-500">
            Tel: 123-456-789 <br /> Email: example@gmail.com
          </p>
          <p className="font-semibold text-gray-600">ExampleFaceBookPage</p>
          <p className="font-semibold text-gray-600">ExampleInstragramPage</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
