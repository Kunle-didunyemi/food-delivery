import React from "react";
import Delivery from "../images/delivery.png";
import HeroBg from "../images/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className=" grid grid-cols-1 md:grid-cols-2 gap-2 w-full"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start md:items-center justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] md:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            {" "}
            Your City{" "}
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:first-letter:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          temporibus porro et iste voluptas saepe in autem consectetur magni at
          ad itaque, nam aut enim dolore numquam quidem, non pariatur?
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 "
        >
          Order Now
        </button>
      </div>
      <div className="py-4 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className="ml-auto h-420 w-full lg:w-auto lg:h-650 "
          alt="hero-bg"
        />
        <div className="w-full h-full absolute lg:px-32 top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap ">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className=" lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg "
              >
                <img
                  src={n.imageSrc}
                  alt=""
                  className="w-20 lg:w-40 lg:-mt-20 -mt-10"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>
                <p className="lg:text-sm text-[12px] text-lighttextGray font-semibold lg:my-3 my-1">
                  {n.desp}
                </p>
                <p className=" text-sm font-semibold to-headingColor">
                  {" "}
                  <span className=" text-xs text-red-600">$</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
