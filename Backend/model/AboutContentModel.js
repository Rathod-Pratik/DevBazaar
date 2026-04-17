import mongoose from "mongoose";

const AboutContentSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      unique: true,
      default: "about-us",
    },
    title: {
      type: String,
      default: "Our Story",
    },
    subtitle: {
      type: String,
      default: "Building trust through quality products and customer-first service.",
    },
    paragraphOne: {
      type: String,
      default:
        "Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with a strong presence across the region.",
    },
    paragraphTwo: {
      type: String,
      default:
        "Exclusive offers a fast-growing catalog of products, reliable delivery, and seamless shopping experiences for every customer.",
    },
    missionTitle: {
      type: String,
      default: "Our Mission",
    },
    missionDescription: {
      type: String,
      default:
        "To make online shopping simple, reliable, and affordable for everyone.",
    },
    visionTitle: {
      type: String,
      default: "Our Vision",
    },
    visionDescription: {
      type: String,
      default:
        "To become the most customer-loved ecommerce platform in the region.",
    },
    imageUrl: {
      type: String,
      default: "/About Image.png",
    },
    serviceCards: {
      type: [
        {
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          image: { type: String, default: "" },
        },
      ],
      default: [
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
    },
    splitSections: {
      type: [
        {
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
          description: { type: String, default: "" },
          image: { type: String, default: "" },
          buttonEnabled: { type: Boolean, default: false },
          buttonText: { type: String, default: "" },
          buttonLink: { type: String, default: "" },
        },
      ],
      default: [
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
    },
    stats: {
      type: [
        {
          title: { type: String, default: "" },
          value: { type: String, default: "" },
          description: { type: String, default: "" },
          icon: { type: String, default: "" },
        },
      ],
      default: [
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
    },
    teamMembers: {
      type: [
        {
          name: { type: String, default: "" },
          role: { type: String, default: "" },
          image: { type: String, default: "" },
        },
      ],
      default: [
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
    },
  },
  { timestamps: true }
);

const AboutContentModel = mongoose.model("about_content", AboutContentSchema);

export default AboutContentModel;
