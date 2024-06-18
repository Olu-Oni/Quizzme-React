const MyModal = ({ modalVisible, children }) => {
  return (
    <div className={modalVisible ? "block" : "hidden"}>
      <div className="fixed top-0 h-dvh w-dvw backdrop-blur-md z-10 flex items-center justify-center">
       {children}
      </div>
    </div>
  );
};

export default MyModal;
