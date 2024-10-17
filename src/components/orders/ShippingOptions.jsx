import React, { useState } from "react";
import DropdownFilter from "../DropdownFilter";
import { formatNumber } from "../../utils/formatNumber";
import { BsTruck } from "react-icons/bs";

const ShippingOptions = ({ shippingOptions = null, onShippingCostChange }) => {
  // Provide default options if shippingOptions is null or undefined
  const defaultShippingOptions = [
    { id: 1, name: "JNE Regular", cost: 20000 },
    { id: 2, name: "J&T Express", cost: 18000 },
    { id: 3, name: "SiCepat", cost: 15000 },
  ];

  const options = shippingOptions || defaultShippingOptions;
  const [selectedShipping, setSelectedShipping] = useState(null);

  const getShippingLabel = (option) =>
    `${option.name} - ${formatNumber(option.cost)}`;

  const handleShippingSelect = (optionLabel) => {
    const selectedOption = options.find(
      (option) => getShippingLabel(option) === optionLabel
    );
    setSelectedShipping(selectedOption || null);
    onShippingCostChange(selectedOption ? selectedOption.cost : 0);
  };

  return (
    <div className="w-[100%] ">
      <DropdownFilter
        label="Pilih Pengiriman"
        icon={<BsTruck />}
        width="w-[100%]"
        options={options.map((option) => getShippingLabel(option))}
        selectedOption={
          selectedShipping ? getShippingLabel(selectedShipping) : ""
        }
        setSelectedOption={handleShippingSelect}
      />
    </div>
  );
};

export default ShippingOptions;
