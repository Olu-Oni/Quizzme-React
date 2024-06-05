import Header from "../../components/Header";

const Performance = ({ dropDown }) => {
  return (
    <div className="baloo flex flex-col justify-center px-4 sm:px-10 md:px-14 lg:px-[10%]">
      <Header dropDown={dropDown} />
    </div>
  );
};

export default Performance;
