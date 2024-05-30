const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('user email:', e.target.email.value)
    console.log('user password:', e.target.password.value)
    window.location.href = "/Home";
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5 mx-auto">
        <input
          name="email"
          type="text"
          placeholder="Enter your email"
          className=" w-[300px] lg:w-[400px] loginInput mb-5"
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className=" w-[300px] lg:w-[400px] loginInput font-bold"
        />
      </div>

      <button
        type="submit"
        id="login-button"
        className="hover:cursor-pointer transition-all duration-300 w-64 h-10 hover:text-[#f8C660] hover:bg-white bg-[#f8C660] text-center mt-6 rounded-xl  mx-auto text-[10pt] md:text-[13pt] py-1"
      >
        Login
      </button>
    </form>
  );
};

const Login = () => {
  return (
    <div className="font-urbanist lg:10 text-white text-center content-center overflow-auto">
      <div className="bg-image "></div>

      <div className="">
        <div>
          <img
            src="/images/login-logo-white.png"
            className="mt-10 mx-auto md:w-[300px] w-[200px] mb-20 md:mb-28` md:mt-20"
          />
        </div>
        <LoginForm/>
        <p className=" mt-6 text-[10pt]">
          Don't have an account? &nbsp;
          <a
            className=" hover:cursor-pointer transition-all duration-500 hover:text-green-500 text-[#35C2C1]"
            href="#"
            onClick={()=> window.location.href = '/Welcome'}
          >
            Sign up Now
          </a>
        </p>
        {/* Other login options */}
        <div className="mt-4">
          <div className="block">
            <hr className="inline-block w-[20%] h-px bg-white mb-[5px] mx-10" />
            <p className="inline text-[9pt]">Login with</p>
            <hr className="inline-block w-[20%] h-px mb-[5px] bg-white mx-10" />
          </div>
          <a className=" hover:cursor-pointer mt-5 h-[40px] inline-block border border-white  py-1 px-10 rounded-md">
            <img
              src="/images/googleLogo.png"
              className="w-[30px] h-[30px] mx-auto "
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
