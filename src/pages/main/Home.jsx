import Content from "../../components/Content";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div className=" flex flex-col justify-center px-4 sm:px-10 md:px-14 lg:px-[10%]">
      <Header/>
      <Content/>
    </div>
  );
};

export default Home;
