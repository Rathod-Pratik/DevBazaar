import AboutContentModel from "../model/AboutContentModel.js";

const ABOUT_SINGLETON_KEY = "about-us";

const DEFAULT_ABOUT_CONTENT = {
  title: "Our Story",
  subtitle: "Building trust through quality products and customer-first service.",
  paragraphOne:
    "Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with a strong presence across the region.",
  paragraphTwo:
    "Exclusive offers a fast-growing catalog of products, reliable delivery, and seamless shopping experiences for every customer.",
  missionTitle: "Our Mission",
  missionDescription:
    "To make online shopping simple, reliable, and affordable for everyone.",
  visionTitle: "Our Vision",
  visionDescription:
    "To become the most customer-loved ecommerce platform in the region.",
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
};

const sanitizeStats = (stats) => {
  if (!Array.isArray(stats)) {
    return DEFAULT_ABOUT_CONTENT.stats;
  }

  return stats
    .map((item) => ({
      title: String(item?.title || "").trim(),
      value: String(item?.value || "").trim(),
      description: String(item?.description || "").trim(),
      icon: String(item?.icon || "").trim(),
    }))
    .filter((item) => item.title || item.value || item.description || item.icon);
};

const sanitizeTeamMembers = (members) => {
  if (!Array.isArray(members)) {
    return DEFAULT_ABOUT_CONTENT.teamMembers;
  }

  return members
    .map((item) => ({
      name: String(item?.name || "").trim(),
      role: String(item?.role || "").trim(),
      image: String(item?.image || "").trim(),
    }))
    .filter((item) => item.name || item.role || item.image);
};

const sanitizeServiceCards = (cards) => {
  if (!Array.isArray(cards)) {
    return DEFAULT_ABOUT_CONTENT.serviceCards;
  }

  return cards
    .map((item) => ({
      title: String(item?.title || "").trim(),
      description: String(item?.description || "").trim(),
      image: String(item?.image || "").trim(),
    }))
    .filter((item) => item.title || item.description || item.image);
};

const sanitizeSplitSections = (sections) => {
  if (!Array.isArray(sections)) {
    return DEFAULT_ABOUT_CONTENT.splitSections;
  }

  return sections
    .map((item) => ({
      title: String(item?.title || "").trim(),
      subtitle: String(item?.subtitle || "").trim(),
      description: String(item?.description || "").trim(),
      image: String(item?.image || "").trim(),
      buttonEnabled: Boolean(item?.buttonEnabled),
      buttonEnabled: Boolean(item?.buttonEnabled),
      buttonText: String(item?.buttonText || "").trim(),
      buttonLink: String(item?.buttonLink || "").trim(),
    }))
    .filter(
      (item) => item.title || item.subtitle || item.description || item.image || item.buttonText || item.buttonLink,
    );
};

const sanitizePayload = (input = {}) => ({
  title: String(input.title || "").trim(),
  subtitle: String(input.subtitle || "").trim(),
  paragraphOne: String(input.paragraphOne || "").trim(),
  paragraphTwo: String(input.paragraphTwo || "").trim(),
  imageUrl: String(input.imageUrl || "").trim(),
  serviceCards: sanitizeServiceCards(input.serviceCards),
  splitSections: sanitizeSplitSections(input.splitSections),
  stats: sanitizeStats(input.stats),
  teamMembers: sanitizeTeamMembers(input.teamMembers),
});

const normalizeContent = (data = {}) => ({
  ...DEFAULT_ABOUT_CONTENT,
  ...data,
});

export const getPublicAboutContent = async (req, res) => {
  try {
    const existing = await AboutContentModel.findOne({
      singletonKey: ABOUT_SINGLETON_KEY,
    }).lean();

    return res.status(200).json({
      success: true,
      data: normalizeContent(existing || {}),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminAboutContent = async (req, res) => {
  try {
    const existing = await AboutContentModel.findOne({
      singletonKey: ABOUT_SINGLETON_KEY,
    }).lean();

    return res.status(200).json({
      success: true,
      exists: Boolean(existing),
      data: normalizeContent(existing || {}),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const upsertAboutContent = async (req, res) => {
  const { data } = req.body;

  if (!data || typeof data !== "object") {
    return res.status(400).json({ success: false, message: "data object is required" });
  }

  const sanitized = sanitizePayload(data);

  if (!sanitized.title || !sanitized.paragraphOne || !sanitized.imageUrl) {
    return res.status(400).json({
      success: false,
      message: "title, paragraphOne and imageUrl are required",
    });
  }

  try {
    const existing = await AboutContentModel.findOne({
      singletonKey: ABOUT_SINGLETON_KEY,
    }).lean();

    const payload = {
      singletonKey: ABOUT_SINGLETON_KEY,
      ...normalizeContent(existing || {}),
      ...sanitized,
    };

    const updated = await AboutContentModel.findOneAndUpdate(
      { singletonKey: ABOUT_SINGLETON_KEY },
      payload,
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadAboutImage = async (req, res) => {
  if (!req.imageUrl) {
    return res.status(400).json({ success: false, message: "Image upload failed" });
  }

  return res.status(200).json({ success: true, imageUrl: req.imageUrl });
};
