import { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import { GET_ABOUT_CONTENT } from "../../Utils/Constant";
import { toast } from "react-toastify";

const About = () => {
  const [loading, setLoading] = useState(true);
  const [aboutContent, setAboutContent] = useState({
    title: "Our Story",
    subtitle: "",
    paragraphOne: "",
    paragraphTwo: "",
    imageUrl: "/About Image.png",
    serviceCards: [
      {
        title: "FREE AND FAST DELIVERY",
        description: "Free delivery for all orders over $140",
        image: "/Services.png",
      },
      {
        title: "24/7 CUSTOMER SERVICE",
        description: "Friendly 24/7 customer support",
        image: "/Services (1).png",
      },
      {
        title: "MONEY BACK GUARANTEE",
        description: "We return money within 30 days",
        image: "/Services (2).png",
      },
    ],
    splitSections: [
      {
        title: "Why Customers Choose Us",
        subtitle: "Trusted quality, fast delivery, and seamless shopping every day.",
        description:
          "We focus on reliable service, curated products, and a smooth shopping experience from browse to delivery.",
        image: "/About Image.png",
        buttonEnabled: true,
        buttonText: "Learn More",
        buttonLink: "/about",
      },
      {
        title: "Built Around Customer Experience",
        subtitle: "From support to checkout, every detail is designed for convenience.",
        description:
          "Our team continuously improves speed, product quality, and post-purchase support so every customer stays confident and happy.",
        image: "/hero.png",
        buttonEnabled: true,
        buttonText: "Explore Products",
        buttonLink: "/product",
      },
    ],
    stats: [
      {
        title: "Total Revenue",
        value: "₹ 120M+",
        description: "Revenue generated across all channels",
        icon: "💰",
      },
      {
        title: "Orders Completed",
        value: "280K+",
        description: "Successfully fulfilled orders",
        icon: "📦",
      },
      {
        title: "Total Customers",
        value: "450K+",
        description: "Happy customers shopping with us",
        icon: "👥",
      },
      {
        title: "Team Members",
        value: "120+",
        description: "People building DevBazaar daily",
        icon: "🚀",
      },
    ],
    teamMembers: [
      {
        name: "Tom Cruise",
        role: "Founder & Chairman",
        image: "/Frame 874.png",
      },
      {
        name: "Emma Watson",
        role: "Managing Director",
        image: "/Frame 875.png",
      },
      {
        name: "Will Smith",
        role: "Product Designer",
        image: "/Frame 876.png",
      },
    ],
  });

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await apiClient.get(GET_ABOUT_CONTENT);
        if (response.status === 200) {
          setAboutContent(response.data.data || {});
        }
      } catch {
        toast.error("Failed to load about content");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] p-8 animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-11/12 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-10/12 bg-gray-200 rounded mb-8"></div>
        <div className="h-72 w-full bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-4 md:px-8 lg:px-14 pb-10 overflow-x-hidden">
      <div className="mt-12 gap-12 flex flex-col items-center">
        {(aboutContent.splitSections || []).map((section, index) => (
          <div
            key={section.title || index}
            className={`flex flex-col md:items-center gap-8 w-full ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <div className="hidden md:block md:w-1/2 w-full min-w-0">
              <img
                src={section.image}
                alt={section.title}
                className="w-full max-h-[520px] object-cover rounded-2xl shadow"
              />
            </div>

            <div className="space-y-5 min-w-0 w-full md:w-1/2">
              <h2 className="font-semibold text-4xl md:text-5xl text-gray-900">
                {section.title}
              </h2>
              {section.subtitle ? (
                <p className="text-lg text-gray-700">{section.subtitle}</p>
              ) : null}
              <p className="text-gray-700 leading-8">{section.description}</p>
              {section.buttonEnabled && section.buttonText && section.buttonLink ? (
                <a
                  href={section.buttonLink}
                  className="inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  {section.buttonText}
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3  className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Our Growth at a Glance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {(aboutContent.stats || []).map((item, index) => (
            <div
              key={item.title}
              
              data-aos-delay={index * 80}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-sm text-gray-500 mb-1">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3  className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Our Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(aboutContent.teamMembers || []).map((member, index) => (
            <div
              key={member.name}
              
              data-aos-delay={index * 90}
              className="flex flex-col items-center text-center border p-6 rounded-lg shadow-md bg-white"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h4 className="text-xl font-medium text-gray-900">{member.name}</h4>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(aboutContent.serviceCards || []).map((card, index) => (
            <div
              key={card.title || index}
              
              data-aos-delay={index * 90}
              className="flex flex-col items-center text-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/90 p-2">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-6">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
