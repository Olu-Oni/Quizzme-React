const MyButton = ({
  text,
  extraClass,
  changeWindow,
  onClick,
  hover,
  outline
}) => {
  return (
    <button
      onClick={
        changeWindow ? () => (window.location.href = changeWindow) : onClick
      }
      className={`py-1 px-3 rounded-2xl ${hover?'hover:brightness-150' :'hover:bg-opacity-80'} hover:outline ${outline?outline:'outline-white'} ${extraClass}  `}
    >
      {text}
    </button>
  );
};

const CreateQuizButton = ({
  text,
  extraClass,
  changeWindow,
  onClick,
  hover,
  outline
}) =>{
  return(
    <div className="createButton fixed z-30 bottom-5 right-4">
          <MyButton
            hover={hover}
            outline={outline}
            text={text}
            changeWindow={changeWindow}
            extraClass={`relative -left-12 bg-white text-green-800 py-2 px-5 rounded-s-3xl hover:brightness-100 shadow-lg ${extraClass}`}
          />
          <button
            onClick={
              changeWindow ? () => (window.location.href = changeWindow) : onClick
            }
            className="absolute -top-[5px] right-3 bg-white p-2 pl-3 rounded-full border border-slate-200 shadow-md"
          >
            <svg
              width="30"
              height="32"
              viewBox="0 0 131 116"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M91.1327 78.147L98.3817 70.898C99.5143 69.7654 101.485 70.5582 101.485 72.1892V105.127C101.485 111.13 96.6147 116 90.6117 116H10.8734C4.87038 116 0 111.13 0 105.127V25.3883C0 19.3852 4.87038 14.5149 10.8734 14.5149H72.8292C74.4375 14.5149 75.253 16.463 74.1204 17.6183L66.8715 24.8673C66.5317 25.207 66.0786 25.3883 65.5802 25.3883H10.8734V105.127H90.6117V79.4155C90.6117 78.9398 90.7929 78.4867 91.1327 78.147ZM126.607 32.4333L67.1206 91.9199L46.6424 94.1852C40.7073 94.8422 35.6557 89.8359 36.3126 83.8555L38.5779 63.3772L98.0645 3.89064C103.252 -1.29688 111.634 -1.29688 116.799 3.89064L126.585 13.6767C131.772 18.8642 131.772 27.2685 126.607 32.4333ZM104.226 39.4331L91.0648 26.2717L48.9756 68.3835L47.322 83.1759L62.1143 81.5222L104.226 39.4331ZM118.905 21.3787L109.119 11.5926C108.19 10.6639 106.673 10.6639 105.767 11.5926L98.7668 18.5924L111.928 31.7537L118.928 24.754C119.834 23.8026 119.834 22.3075 118.905 21.3787Z"
                fill="#166534"
              />
            </svg>
          </button>
        </div>
  )
}
export  {MyButton, CreateQuizButton};
