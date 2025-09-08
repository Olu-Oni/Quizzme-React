import whiteLogo from "../../../images/login-logo-white.png"
import googleIcon from "../../../images/googleLogo.png"
const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('user email:', e.target.email.value)
    console.log('user password:', e.target.password.value)
    window.location.href = "/Home";
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mx-auto mt-5">
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          className=" w-[250px] md:w-[300px] lg:w-[400px] loginInput mb-5"
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-[250px] md:w-[300px] lg:w-[400px] loginInput font-bold"
        />
      </div>

      <button
        type="submit"
        id="login-button"
        className="hover:cursor-pointer transition-all duration-300 w-56 sm:w-64 h-10 hover:text-[#f8C660] hover:bg-white bg-[#f8C660] text-center mt-6 rounded-xl  mx-auto text-[10pt] md:text-[13pt] py-1"
      >
        Login
      </button>
    </form>
  );
};

const Login = () => {
  return (
    <div className="content-center overflow-auto text-center text-white bold lg:10">
      <div className="login-bg-image "></div>

      <div className="">
        <div>
          <img
            src={whiteLogo}
            className="mt-16 mx-auto md:w-[300px] w-[200px] mb-20 md:mb-26 md:mt-18"
          />
        </div>
        <LoginForm/>
        <p className=" mt-6 text-[10pt]">
          Don't have an account? &nbsp;
          <a
            className=" hover:cursor-pointer transition-all duration-500 hover:text-green-500 text-[#35C2C1]"
            href="/Welcome"
          >
            Sign up Now
          </a>
        </p>
        {/* Other login options */}
        <div className="mt-4">
          <div className="block">
            <hr className="inline-block w-[20%] h-px bg-white mb-[5px] mx-3 sm:mx-10" />
            <p className="inline text-[9pt]">Login with</p>
            <hr className="inline-block w-[20%] h-px mb-[5px] bg-white mx-3 sm:mx-10" />
          </div>
          <a className=" hover:cursor-pointer hover:backdrop-brightness-150 mt-5 h-[40px] inline-block border border-white  py-1 px-10 rounded-md">
            <img
              src={googleIcon}
              className="w-[30px] h-[30px] mx-auto "
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
