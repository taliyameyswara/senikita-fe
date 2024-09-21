import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const CustomerAddress = ({ address }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-xl mt-3">
      <div className="flex justify-between">
        <div className="">
          <p className="font-semibold text-lg">{address.name} </p>
          <p className="font-nunito font-light">{address.phone}</p>
          <div className="text-sm text-gray-500 font-light">
            <p>
              {address.street}, <span>{address.zipCode}</span>
            </p>
            <p>
              {" "}
              {address.district}, {address.city}, {address.province}
            </p>
            <p> ({address.note})</p>
          </div>
        </div>
        <div className="">
          <Link to="/user/dashboard/profile">
            <div className="p-2 bg-tertiary/10 rounded-lg">
              <FiEdit className="text-primary" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerAddress;
