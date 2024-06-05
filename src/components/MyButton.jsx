const MyButton = ({txtColor,bgColor,text, extraClass, changeWindow, onClick}) => {
    return (
      <button onClick={changeWindow?(()=> window.location.href = changeWindow):onClick} className={`myButton text-${txtColor} bg-${bgColor} py-1 pt-2 px-2 rounded-2xl ${extraClass}`}>
        {text}
      </button>
    );
  };

  export default MyButton