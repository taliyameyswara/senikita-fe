const Heading = ({ title }) => {
  return (
    <div>
      <div className="">
        <h1 className="md:text-3xl text-2xl text-secondary font-crimson my-5">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
