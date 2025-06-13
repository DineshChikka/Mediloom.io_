import { useState } from "react";

const faqData = [
    { 
        title: "Introducing Mediloom.io to Transform Healthcare", 
        content: [
            "In today's busy healthcare environment, hospitals and other medical facilities frequently face challenges such inconsistent data management, ineffective allocation of resources, and delayed coordination of emergency responses.", 
            "These difficulties cause operational inefficiencies, particularly in times of health emergencies such as pandemics, natural disasters, or seasonal flu diseases."
            ]
    },
    { 
        title: "Benefits", 
        content: [
            "With the introduction of an integrated healthcare management system that centralizes hospital resources and patient data across all licensed healthcare institutions, Mediloom.io is dedicated to modernizing healthcare management.",
            "Our platform makes sure that important medical records are easily accessible, allowing medical professionals to make timely and accurate decisions."
        ]
    },
    { 
        title: "Our Goal", 
        content: [
            "In the connected, data-driven healthcare ecosystem we think about, patient care and hospital efficiency are improved by real-time insights, predictive analytics, and seamless resource sharing.",
            "At Mediloom.io, we are dedicated to bridging the gaps in healthcare management by integrating advanced technology, real-time monitoring, and predictive analytics to build a smarter, more efficient healthcare infrastructure."
        ]
    },
    { 
        title: "What We Offer", 
        content: [
            "Centralized Patient Data – Secure and real-time access to medical records for authorized healthcare providers.",
            "Real-Time Resource Tracking – Live monitoring of hospital resources, including beds, medical equipment, and specialized personnel.",
            "Predictive Analytics – AI-driven forecasts for drug demand, patient inflow/outflow, and bed availability.",
            "Visualizations – A central monitoring system that enhances decision-making and emergency response coordination."
        ]
    },
    { 
        title: "Why to  Choose Mediloom.io", 
        content: [
            "Enhanced Efficiency – Optimizing hospital operations and logistics to improve productivity.",
            "Data-Driven Decision Making – Leveraging machine learning for real-time insights.",
            "Scalability & Security – Ensuring seamless expansion and compliance with healthcare data protection standards.",
            "Improved Emergency Response – Enabling faster and more effective healthcare crisis management."
         ]
    }
];


const Aboutus = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="flex w-full flex-col place-content-center place-items-center gap-[10%] p-[5%] px-[10%]" id="Aboutus">
            <h3 className="text-4xl font-medium text-gray-300 max-md:text-2xl mb-4">About us</h3>

            <div className="mt-5 flex min-h-[300px] w-full max-w-[850px] flex-col gap-4">
                {faqData.map((faq, index) => (
                    <div key={index} className="reveal-up faq w-full rounded-md border-[1px] border-solid border-[#1F2123] bg-[#080808]  hover:border-primary">
                        <div 
                            className="reveal-up faq-accordion flex w-full select-none text-xl max-md:text-lg cursor-pointer p-4" 
                            onClick={() => toggleFAQ(index)}
                        >
                            <span>{faq.title}</span>
                            <i className={`bi bi-${openIndex === index ? "dash" : "plus"} ml-auto font-semibold`}></i>
                        </div>

                        <div 
                            className={`content overflow-hidden transition-all duration-300 ease-in-out border-[1px] border-solid border-primary`} 
                            style={{ 
                                maxHeight: openIndex === index ? "500px" : "0px",  
                                padding: openIndex === index ? "15px 18px" : "0px 18px", 
                                opacity: openIndex === index ? 1 : 0 
                            }}
                        >
                            {/* Check if content is an array and render accordingly */}
                            {Array.isArray(faq.content) ? (
                                <ul className="list-disc pl-6 space-y-2">
                                    {faq.content.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{faq.content}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 flex flex-col place-items-center gap-4">
                <div className="text-3xl max-md:text-2xl text-center">
                    Join us in redefining the future of healthcare 
                    where data-driven decisions save lives <br />
                    and 
                    every resource is utilized to its fullest potential.
                </div>
            </div>
        </section>
    );
};

export default Aboutus;
