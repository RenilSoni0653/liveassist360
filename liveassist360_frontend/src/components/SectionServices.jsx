import React from "react";
import Image from "next/image";
import {
  FaPhone,
  FaCheckCircle,
  FaUserFriends,
  FaBusinessTime,
} from "react-icons/fa";

function SectionServices() {
  return (
    <section
      id="services"
      className="h-screen flex justify-center items-center pt-20  bg-gradient-to-r from-blue-400 to-indigo-500 "
    >
      <div className="bg-opacity-50 bg-white p-24 rounded-lg">
        <div className="text-center mb-8">
          <p className="text-3xl sm:text-5xl md:text-6xl text-primaryColor font-bold">
            Our Services
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <ServiceItem
            icon={<FaPhone size={30} />}
            title="24/7 Customer Service"
            description="We provide round-the-clock customer support via phone."
          />
          <ServiceItem
            icon={<FaCheckCircle size={30} />}
            title="Satisfaction Guarantee"
            description="Your satisfaction is our priority; we guarantee it."
          />
          <ServiceItem
            icon={<FaUserFriends size={30} />}
            title="User-Friendly Platform"
            description="Our platform is designed with users in mind, ensuring ease of use."
          />
          <ServiceItem
            icon={<FaBusinessTime size={30} />}
            title="Better Business"
            description="We aim for excellence, striving to deliver the best service."
          />
        </div>
      </div>
    </section>
  );
}

const ServiceItem = ({ icon, title, description }) => (
  <div className="flex gap-2 items-center text-left">
    <div>{icon}</div>
    <div>
      <h3 className="text-primaryColor font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default SectionServices;
