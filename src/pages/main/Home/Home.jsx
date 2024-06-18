import Content from "./HomeContent";
import Header from "../../../components/Header";

const Home = ({dropDown}) => {
  return (
    <div className="baloo flex flex-col justify-center">
      <Header  dropDown={dropDown}/>
      <Content/>
    </div>
  );
};

export default Home;
