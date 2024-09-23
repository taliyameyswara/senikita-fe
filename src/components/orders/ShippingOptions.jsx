import React, { useState } from "react";
import DropdownFilter from "../DropdownFilter";
import { formatNumber } from "../../utils/formatNumber";
import { BsTruck } from "react-icons/bs";

const ShippingOptions = ({ onShippingCostChange }) => {
  const [selectedShipping, setSelectedShipping] = useState(null);

  const shippingOptions = [
    { id: 1, name: "JNE Regular", cost: 20000 },
    { id: 2, name: "J&T Express", cost: 18000 },
    { id: 3, name: "SiCepat", cost: 15000 },
  ];

  const getShippingLabel = (option) =>
    `${option.name} - ${formatNumber(option.cost)}`;

  const handleShippingSelect = (optionLabel) => {
    const selectedOption = shippingOptions.find(
      (option) => getShippingLabel(option) === optionLabel
    );
    setSelectedShipping(selectedOption || null);
    onShippingCostChange(selectedOption ? selectedOption.cost : 0);
  };

  return (
    <div>
      {/* <h3 className="text-lg font-semibold mb-3">Pilih Pengiriman</h3> */}
      <DropdownFilter
        label="Pilih Pengiriman"
        icon={<BsTruck />}
        options={shippingOptions.map((option) => getShippingLabel(option))}
        selectedOption={
          selectedShipping ? getShippingLabel(selectedShipping) : ""
        }
        setSelectedOption={handleShippingSelect}
      />
    </div>
  );
};

export default ShippingOptions;
