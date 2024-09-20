import { Fragment } from "react";
import { AiOutlineCheck } from "react-icons/ai";

const Stepper = ({ steps, currentStep, stepperTitle, stepperSubtitle }) => {
  return (
    <div className="">
      <div className="flex flex-col gap-3 items-center text-center">
        <h1 className="md:text-xl  font-semibold">{stepperTitle}</h1>
        <p className="text-gray-500 text-sm md:text-base">{stepperSubtitle}</p>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <Fragment key={index}>
              <div
                className={`flex items-center relative 
                ${index <= currentStep ? "text-primary" : "text-gray-500"}`}
              >
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 flex items-center justify-center border ${
                    index <= currentStep
                      ? "bg-primary text-white border-primary "
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {index < currentStep ? (
                    <AiOutlineCheck className="w-6 h-6" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-16 md:w-32 w-[8rem] md:text-sm text-xs font-medium ">
                  {step}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`flex-auto border-t transition duration-500 ease-in-out ${
                    index < currentStep ? "border-primary" : "border-gray-300"
                  }`}
                ></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
