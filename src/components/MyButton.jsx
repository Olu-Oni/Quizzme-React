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
      className={`py-1 px-3 rounded-2xl ${hover?'hover:brightness-150' :'hover:bg-opacity-60'} hover:outline ${outline?outline:'outline-white'} ${extraClass}  `}
    >
      {text}
    </button>
  );
};

export default MyButton;
