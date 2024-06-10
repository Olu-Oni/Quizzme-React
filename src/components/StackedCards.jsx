const Card = ({ question, shadow }) => (
    <div className={`flex bg-white sm:w-[80%] md:w-[90%] h-full md:h-[80%] lg:h-[90%] m-auto rounded-3xl px-10 max-md:px-6 ${shadow}`} >
      <p className="m-auto text-base md:text-xl ">{question}</p>
    </div>

// <div className="flex bg-white sm:w-[80%] md:w-[90%] h-full md:h-[80%] lg:h-[90%] m-auto rounded-3xl px-10 max-md:px-6 shadow-2xl">
// <p className="m-auto text-base md:text-xl ">{question}</p>
// </div>
  );
const StackedCards = ({questions, myCards, changeCards}) => {
  
  const {currentCardIndex} = myCards
  // const {handleNext, handlePrev} = changeCards
  
  return (
    <div className="relative w-full h-full">
      {questions.map((q, index) => (
        <div
          key={q.id}
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            index < currentCardIndex
              ? "transform -translate-x-[150%]"
              : "transform translate-x-0"
          }`}
          style={{ zIndex: questions.length - index }}
        >
          <Card question={q.question} shadow={ (index === currentCardIndex || index === currentCardIndex+1)
              ? "shadow-xl"
              : "shadow-none"}/>
        </div>
      ))}
    </div>
  );
};

export default StackedCards;
