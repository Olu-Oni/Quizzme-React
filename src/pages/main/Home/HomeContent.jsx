import {MyButton} from "../../../components/MyButtons";

const HomeContent = () => {
  return (
    <main className="flex flex-col justify-center min-w-[200px] w-full max-w-[1200px] py-3 px-14 self-center ">
      <div className="home-box relative  flex-grow flex w-[inherit] h-44 rounded-lg my-3 overflow-hidden text-white ">
        <div className="box-bg-image opacity-80"></div>
        <div className="subBG  bg-green-800 "></div>
        <div className="box-text relative max-sm:left-[-20px] m-3 md:m-6  max-sm:mr-6 max-sm:my-auto">
          <p className="max-sm:m-0 py-3 max-sm:opacity-0  md:text-xl">
            Create fun quizzes to share with friends,
            <br className="md:hidden" />
            {" "}or test yourself with our AI assisted self{" "}
            <br className="md:hidden" /> quizzes
          </p>
        </div>
        
        <MyButton changeWindow='/CreateQuiz' text='Create a new Quiz'  extraClass="button-expand max-sm:bg-green-800"/>
        
      </div>

      <div className=" flex flex-wrap content-center text-white">
        <div className="home-box relative sm:basis-[38%] w-full flex h-44 md:h-52 rounded-lg my-3 sm:mr-[2%] overflow-hidden">
          <div className="box-bg-image opacity-80 "></div>
          <div className="subBG  bg-[#a7d231]"></div>
          <p className="box-text sm:m-3 md:m-6 sm:py-3 max-sm:opacity-0 max-sm:m-auto max-sm:pr-6 md:text-xl">
            Start a quiz either you <br className="max-md:hidden" /> or a friend{" "}
            <br className="max-md:hidden" /> created{" "}
          </p>
          <MyButton  changeWindow='/Quizz_me' text='Start a Quiz' extraClass="button-expand  max-sm:bg-[#a7d231]"/>
       
        </div>
        <div className="max-md: home-box relative sm:basis-[58%] w-full flex flex-shrink-[2]  h-44 md:h-52 rounded-lg my-3 sm:ml-[2%] overflow-hidden">
          <div className="box-bg-image opacity-60"></div>
          <div className="subBG  bg-[#0ab6fa]"></div>
          <p className="box-text sm:m-3 md:m-6 sm:py-3 max-sm:opacity-0 max-sm:m-auto max-sm:pr-6 md:text-xl">
            {" "}
            View and Manage all your Quizzes here!
          </p>
          <MyButton  changeWindow='/MyQuizzes' text='View MyQuizzes' extraClass="button-expand max-sm:bg-[#0ab6fa] "/>
       
        </div>
      </div>
      <hr></hr>
    </main>
  );
};

export default HomeContent;
