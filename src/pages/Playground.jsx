import React, { useState, useEffect } from "react";
import SelectionOne from "../components/SelectionOne";

const Playground = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ]);

    useEffect(() => {
        // Simulasi data dari API
        const apiData = { selectedOptionValue: '2' }; // Data dari API menunjukkan 'Option 2' yang aktif

        // Cari opsi yang sesuai dengan `selectedOptionValue` dari API
        const selected = options.find(opt => opt.value === apiData.selectedOptionValue);
        setSelectedOption(selected);
    }, [options]);

    const handleSelect = (option) => {
        setSelectedOption(option);
        console.log("Selected Option:", option);
    };

    return (
        <div className="Playground">
            <h2>Custom Selection Dropdown</h2>
            <SelectionOne
                name="Choose an Option"
                options={options}
                selectedOption={selectedOption}
                onSelect={handleSelect}
                placeholder="Select an option"
            />
            {selectedOption && (
                <div>
                    <p>Selected Option: {selectedOption.label}</p>
                </div>
            )}
        </div>
    );
};

export default Playground;
