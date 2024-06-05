import Header from "../../components/Header";
import Content from "../../components/contents/MyQuizzesContent"

const MyQuizzes = ({dropDown}) => {
  return (
    <div className="baloo flex flex-col justify-center px-4 sm:px-10 md:px-14 lg:px-[10%]">
      <Header  dropDown={dropDown}/>
      <Content/>
    </div>
  );
};

export default MyQuizzes;
