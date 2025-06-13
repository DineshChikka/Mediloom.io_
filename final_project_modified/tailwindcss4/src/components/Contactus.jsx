
const Contactus = () => {
  return (
    <section
            className="mt-5 flex w-full flex-col place-items-center p-[2%]"
            id="Contactus"
        >
            <h3
                className="text-3xl font-medium text-gray-300 max-md:text-2xl"
            >
                Contact Us
            </h3>
            <div
                className="mt-10 flex flex-wrap place-content-center gap-8 max-lg:flex-col"
            >
                <div
                    className="reveal-up flex w-[380px] flex-col place-items-center gap-2 rounded-lg border-[1px] border-outlineColor hover:border-primary bg-secondary p-8 shadow-xl max-lg:w-[320px]"
                >
                    <h3 className="">
                        <span className="text-5xl font-semibold"><img src="https://res.cloudinary.com/dmnys8vsr/image/upload/v1740465897/icons8-email-48_phqcbo.png" className="image2" />
                        </span>
                        
                    </h3>
                    <p className="mt-3 text-center text-gray-300 text-3xl">
                        Email Us
                    </p>
                    <hr />
                    <ul
                        className="mt-4 flex flex-col gap-2 text-center text-lg text-gray-200"
                    >
                        <li>General Inquiries</li>
                        <li><a href="">mediloom.io@gmail.com</a></li>
                        <li>Support</li>
                        <li><a href="">supportmediloom.io@gmail.com</a></li>
                    </ul>
                </div>
                <div
                    className="reveal-up flex w-[380px] flex-col place-items-center gap-2 rounded-lg border-1 border-outlineColor hover:border-primary bg-secondary p-8 shadow-xl max-lg:w-[320px]"
                >
                    <h3 className="">
                        <span className="text-5xl font-semibold"><img src="https://res.cloudinary.com/dmnys8vsr/image/upload/v1740465897/icons8-phone-50_jipsoy.png" className="image2" /></span>
                    </h3>
                    <p className="mt-3 text-center text-gray-300 text-3xl">
                        Phone
                    </p>
                    <hr />
                    <ul
                        className="mt-4 flex flex-col gap-2 text-center text-lg text-gray-200"
                    >
                        <li>We're here to assist you with </li>
                        <li>any questions and queries</li>
                        <li>+91 1234567809</li>
                        
                    </ul>
                
                </div>
                <div
                    className="reveal-up flex w-[380px] flex-col place-items-center gap-2 rounded-lg border-[1px] border-outlineColor hover:border-primary bg-secondary p-8 shadow-xl max-lg:w-[320px]"
                >
                    <h3 className="">
                        <span className="text-5xl font-semibold"><img src="https://res.cloudinary.com/dmnys8vsr/image/upload/v1740465897/icons8-location-50_dzfuvb.png" className="image2" />
</span>
                    </h3>
                    <p className="mt-3 text-center text-gray-300 text-3xl">
                        Our Address
                    </p>
                    <hr />
                    <ul
                        className="mt-4 flex flex-col gap-2 text-center text-lg text-gray-200"
                    >
                        <li>Visit us at our headquaters</li>
                        <li> for more information.</li>
                        <li>Mediloom.io,Nadargul</li>
                        <li>Hyderabad,501510.</li>
                    </ul>
                </div>
            </div>
        </section>
  )
}

export default Contactus;
