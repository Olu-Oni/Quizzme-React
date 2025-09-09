import loginLogo from '../../../images/login-logo-orange.png'

const Welcome = () => {
  return (
    <div className="content-center overflow-auto text-center text-white font-urbanist bold lg:10">
      <div className="login-bg-image "></div>

      <div className="pt-20 md:mb-32 md:mt-20">
        <img src={loginLogo} className="md:w-[300px] w-[180px] mx-auto mb-24" />
      </div>

      <div className="mx-auto hover:cursor-pointer">
        <button
          id="register-button"
          onClick={()=>window.location.href = "/Login"}
          className="bg-white text-black w-64 text-center mt-5  rounded-xl  mx-auto block text-[10pt] md:text-[13pt] py-2 "
        >
          Register
        </button>
        <button
          id="login-button"
          onClick={()=>window.location.href = "/Login"}
          className="hover:cursor-pointer transition-all duration-300 w-64 h-10 hover:text-[#f8C660] hover:bg-white bg-[#f8C660] text-center mt-6 rounded-xl  mx-auto text-[10pt] md:text-[13pt] py-1"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Welcome;
