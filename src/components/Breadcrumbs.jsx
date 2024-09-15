import { IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <Link
            to={item.to}
            className={`hover:text-tertiary ${
              index === items.length - 1
                ? "font-medium text-gray-700"
                : "text-gray-400"
            }`}
          >
            {item.label}
          </Link>

          {index < items.length - 1 && (
            <IoChevronForwardOutline className="mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
