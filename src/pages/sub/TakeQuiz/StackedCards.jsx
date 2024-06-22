const Card = ({ question, shadow }) => (
    <div className={`flex bg-white sm:w-[80%] md:w-[90%] h-full md:h-[80%] lg:h-[90%] m-auto rounded-3xl px-10 max-md:px-6 ${shadow}`} >
      <p className="m-auto text-base md:text-xl ">{question}</p>
    </div>
  );
const StackedCards = ({questions, myCards, changeCards}) => {

  const {currentIndex} = myCards 
  return (
    <div className="relative w-full h-full">
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={`absolute w-full h-full transition-transform duration-[700ms] ease-in-out ${
            index < currentIndex
              ? "transform sm:-translate-x-[100%] -translate-x-[120%]"
              : "transform translate-x-0"
          }`}
          style={{ zIndex: questions.length - index }}
        >
          <Card question={q.content} shadow={ (index === currentIndex || index === currentIndex+1)
              ? "shadow-xl"
              : "shadow-none"}/>
        </div>
      ))}
    </div>
  );
};

export default StackedCards;
