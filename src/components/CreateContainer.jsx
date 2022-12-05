import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFunctions";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading: Try Again 🤲");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("image uploaded successfully😍");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("image deleted successfully😍");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Reqired fields must be filled 🤲");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully😍");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading: Try Again 🤲");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("select Category");
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className=" w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-4 justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800 "
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className=" text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            placeholder="Give me a title"
            onChange={(e) => setTitle(e.target.value)}
            className=" w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            className=" outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className=" text-base outline-none capitalize bg-white text-headingColor border-0"
                >
                  {item.name}
                </option>
              ))}
          </select>

          <div className=" group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <>
                    <label className=" w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className=" w-full h-full flex flex-col items-center justify-center gap-2 ">
                        <MdCloudUpload className=" text-gray-500 text-3xl hover:text-gray-700" />
                        <p className=" text-gray-500 hover:text-gray-700">
                          Click here to upload
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                        className=" w-0 h-0"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className=" relative h-full">
                      <img
                        src={imageAsset}
                        alt="upload image"
                        className=" w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className=" absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                        onClick={deleteImage}
                      >
                        <MdDelete className=" text-white" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className=" w-full flex flex-col md:flex-row items-center gap-3">
            <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdFoodBank className=" text-gray-700 text-2xl" />
              <input
                type="text"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
                placeholder="Calories"
                className=" w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>

            <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdAttachMoney className=" text-gray-700 text-2xl" />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="price"
                className=" w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
          </div>
        </div>
        <div className=" flex items-center w-full">
          <button
            type="button"
            className=" md:ml-auto ml-0 w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
