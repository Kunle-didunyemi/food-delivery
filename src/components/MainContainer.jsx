import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems, cartShow }] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  return (
    <div className=" w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className=" w-full my-6">
        <div className=" w-full justify-between items-center flex">
          <p className=" font-semibold capitalize text-2xl text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            {" "}
            Our fresh & healthy fruits
          </p>
          <div className="items-center hidden md:flex gap-3">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg items-center justify-center bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex"
            >
              <MdChevronLeft
                onClick={() => setScrollValue(-200)}
                className=" text-lg text-white"
              />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg items-center justify-center bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex"
            >
              <MdChevronRight
                onClick={() => setScrollValue(200)}
                className=" text-lg  text-white"
              />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      <MenuContainer />

      {cartShow &&  (<CartContainer/>)}
    </div>
  );
};

export default MainContainer;
