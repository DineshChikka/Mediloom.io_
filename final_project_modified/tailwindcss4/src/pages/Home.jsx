import { assets } from "../assets/asserts";
import Aboutus from "../components/Aboutus";
import Contactus from "../components/Contactus";
import { Link } from "react-router-dom";
import GSAPcomponent from "../components/GSAPcomponent";
import Header from "../components/Header";
import Fotter from "../components/Fotter";


const Home = () => {


  return (
    <>
        <GSAPcomponent />
        <Header />
      <section
            className="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px]"
            id="hero-section"
        >
            <div
                className="flex h-full min-h-[100vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-4"
            >
                <div
                    className="flex flex-col place-content-center items-center"
                >
                    <div
                        className="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug"
                    >
                        <span className=""> Welcome to Mediloom.io</span>
                        <br />
                        <span className="">  Where Security is our first priority for your privacy</span>
                    </div>
                    

                    <div
                        className="reveal-up mt-10 flex place-items-center gap-4"
                    >
                        <Link
                            className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]"
                            to="/login"
                        >
                            Get started
                        </Link>
                        <Link
                            className="btn flex gap-2 !bg-black !text-white transition-colors duration-[0.3s] hover:!bg-white hover:!text-black"
                            to="/modelpage"
                        >
                            <i className="bi bi-play-circle-fill"></i>
                            <span>Learn more</span>
                        </Link>
                    </div>
                </div>

                <div
                    className="reveal-up relative mt-8 flex w-full place-content-center place-items-center"
                    id="dashboard-container"
                >
                    <div
                        className="relative max-w-[80%] overflow-hidden rounded-xl bg-transparent max-md:max-w-full"
                        id="dashboard"
                    >
                        <img
                            src={assets.dashboard_main}
                            alt="dashboard"
                            className="h-full w-full object-cover opacity-90 max-lg:object-contain"
                        />
                    </div>

                    <div
                        className="hero-img-bg-grad absolute left-[20%] top-5 h-[200px] w-[200px]"
                    ></div>
                </div>
                <div
                    className="reveal-up relative mt-20 flex w-full place-content-center place-items-center"
                    id="dashboard-container"
                >
                    <div
                        className="relative max-w-[80%] overflow-hidden rounded-xl bg-transparent max-md:max-w-full"
                        id="dashboard"
                    >
                        <img
                            src={assets.graph}
                            alt="dashboard"
                            className="h-full w-full object-cover opacity-90 max-lg:object-contain"
                        />
                    </div>

                    <div
                        className="hero-img-bg-grad absolute left-[20%] top-5 h-[200px] w-[200px]"
                    ></div>
                </div>
            </div>
        </section>

       

        <section
            className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6"
        >
            <div
                className="mt-8 flex flex-col place-items-center gap-5"
            >
                <div
                    className="reveal-up mt-5 flex flex-col gap-3 text-center"
                >
                    <h2
                        className="text-4xl font-medium text-gray-200 max-md:text-3xl"
                    >
                        Key benifits
                    </h2>
                </div>
                <div
                    className="mt-6 flex max-w-[80%] flex-wrap place-content-center gap-8 max-lg:flex-col"
                >
                    <div
                        className="reveal-up flex h-[400px] w-[450px] flex-col gap-3 text-center max-md:w-[320px]"
                    >
                        <div
                            className="border-gradient h-[200px] w-full overflow-hidden max-md:h-[150px]"
                        >
                            <div
                                className="flex h-full w-full place-content-center place-items-end p-2"
                            >
                                <i
                                className="bi bi-rocket-takeoff-fill text-7xl text-gray-200 max-md:text-5xl"
                                ></i>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-2">
                            <h3
                                className="mt-8 text-2xl font-normal max-md:text-xl"
                            >
                                Data privacy and Security
                            </h3>
                            <div className="text-gray-300">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                            </div>
                        </div>
                    </div>
                    <div
                        className="reveal-up flex h-[400px] w-[450px] flex-col gap-3 text-center max-md:w-[320px]"
                    >
                        <div
                            className="border-gradient h-[200px] w-full overflow-hidden max-md:text-[150px]"
                        >
                            <div
                                className="flex h-full w-full place-content-center place-items-end p-2"
                            >
                                <i
                                    className="bi bi-layout-sidebar-inset text-7xl text-gray-200 max-md:text-5xl"
                                ></i>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-2">
                            <h3
                                className="mt-8 text-2xl font-normal max-md:text-xl"
                            >
                                Predictive Analytics
                            </h3>
                            <div className="text-gray-300">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                            </div>
                        </div>
                    </div>
                    <div
                        className="reveal-up flex h-[400px] w-[450px] flex-col gap-3 text-center max-md:w-[320px]"
                    >
                        <div
                            className="border-gradient h-[200px] w-full overflow-hidden max-md:h-[150px]"
                        >
                            <div
                                className="flex h-full w-full place-content-center place-items-end p-2"
                            >
                                <i
                                    className="bi bi-lightning-charge-fill text-7xl text-gray-200 max-md:text-5xl"
                                ></i>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-2">
                            <h3
                                className="mt-8 text-2xl font-normal max-md:text-xl"
                            >
                            seamless Resource Management
                            </h3>
                            <div className="text-gray-300">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            className="relative flex min-h-[80vh] w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6"
        >
            <div
                className="mt-8 flex flex-col place-items-center gap-5"
            >
                <div
                    className="reveal-up mt-5 flex flex-col gap-3 text-center"
                >
                    <h2
                        className="text-4xl font-medium text-gray-200 max-md:text-2xl"
                    >
                        seamless Resource Management
                    </h2>
                </div>
                <div
                    className="mt-6 flex max-w-[80%] flex-wrap place-content-center gap-8 max-lg:flex-col"
                >
                    <div
                        className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]"
                    >
                        <div className="text-4xl max-md:text-2xl">
                            <i className="bi bi-globe"></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl max-md:text-xl">
                                Centralized Patient Data
                            </h3>
                            <p className="text-gray-300 max-md:text-sm">
                                Secure and real-time access to medical records for authorized healthcare providers.

                            </p>
                        </div>
                    </div>

                    <div
                        className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]"
                    >
                        <div className="text-4xl max-md:text-2xl">
                            <i className="bi bi-bar-chart-fill"></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl max-md:text-xl">
                                Predictive Analytics
                            </h3>
                            <p className="text-gray-300 max-md:text-sm">
                                AI-driven forecasts for drug demand, patient inflow/outflow, and bed availability.

                            </p>
                        </div>
                    </div>

                    <div
                        className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]"
                    >
                        <div className="text-4xl max-md:text-2xl">
                            <i className="bi bi-fingerprint"></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl max-md:text-xl">
                                2 Factor Authentication
                            </h3>
                            <p className="text-gray-300 max-md:text-sm">
                                Ensuring seamless expansion and compliance with healthcare data protection standards.

                            </p>
                        </div>
                    </div>

                    

                    

                    <div
                        className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]"
                    >
                        <div className="text-4xl max-md:text-2xl">
                            <i className="bi bi-sliders"></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl max-md:text-xl">
                                Real-Time Resource Tracking
                            </h3>
                            <p className="text-gray-300 max-md:text-sm">
                                Live monitoring of hospital resources, including beds, medical equipment, and specialized personnel.

                            </p>
                        </div>
                    </div>

                    <div
                        className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]"
                    >
                        <div className="text-4xl max-md:text-2xl">
                            <i className="bi bi-graph-up"></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl max-md:text-xl">
                                Visualizations
                            </h3>
                            <p className="text-gray-300 max-md:text-sm">
                                A central monitoring system that enhances decision-making and emergency response coordination.
                            </p>
                        </div>
                    </div>

                    <div
                        className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]"
                    >
                        <div className="text-4xl max-md:text-2xl">
                            <i className="bi bi-lightning-charge-fill"></i>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-2xl max-md:text-xl">
                                Enhanced Efficiency
                            </h3>
                            <p className="text-sm text-gray-300">
                                Optimizing hospital operations and logistics to improve productivity.

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Contactus />
        <Aboutus />
        <Fotter />
    </>
  );
};

export default Home;
