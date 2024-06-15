import {MyButton} from "../../../components/MyButtons";

const Modal = ({ modalVisible, startQuiz }) => {
  return (
    <div className={modalVisible ? "block" : "hidden"}>
      <div className="fixed top-0 h-dvh w-dvw backdrop-blur-md z-10 flex items-center justify-center">
        <div className="min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <MyButton text="Back" changeWindow="/Quizz_me" className="hidden" />
          <MyButton
            text="Start"
            onClick={startQuiz}
            extraClass="bg-green-900 text-white h-fit px-[15%] md:px-[12%] py-2 md:py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
