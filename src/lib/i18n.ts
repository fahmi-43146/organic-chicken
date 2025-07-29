export type Language = "en" | "ar" | "fr"

export interface Translations {
  // Navigation
  home: string
  products: string
  about: string
  contact: string
  cart: string

  // Common
  loading: string
  error: string
  success: string
  submit: string
  cancel: string
  save: string
  delete: string
  edit: string
  view: string
  search: string
  filter: string
  sort: string
  price: string
  category: string
  name: string
  description: string
  image: string
  add: string

  // Products
  allProducts: string
  featuredProducts: string
  newProducts: string
  bestSellers: string
  addToCart: string
  buyNow: string
  outOfStock: string
  inStock: string
  priceRange: string
  sortBy: string
  filterBy: string
  showingResults: string
  noResults: string
  loadMore: string

  // About
  ourStory: string
  ourMission: string
  ourValues: string
  ourTeam: string

  // Contact
  contactUs: string
  getInTouch: string
  sendMessage: string
  yourName: string
  yourEmail: string
  yourMessage: string
  subject: string
  phone: string
  email: string
  address: string
  workingHours: string

  // Footer
  quickLinks: string
  contactInfo: string
  followUs: string
  newsletter: string
  subscribeNewsletter: string
  aboutUs: string

  // Admin
  dashboard: string
  orders: string
  customers: string
  categories: string
  settings: string
  analytics: string
  manageProducts: string
  manageOrders: string
  manageCategories: string
  manageCustomers: string

  // Farm specific
  organicChicken: string
  freshChicken: string
  freeRange: string
  naturalFeed: string
  noHormones: string
  noAntibiotics: string
  farmFresh: string
  qualityGuaranteed: string

  // Hero section
  heroTitle: string
  heroSubtitle: string
  shopNow: string
  learnMore: string
  viewAll: string
}

export const translations = {
  // Navigation
  home: {
    ar: "الرئيسية",
    en: "Home",
    fr: "Accueil",
  },
  about: {
    ar: "من نحن",
    en: "About",
    fr: "À propos",
  },
  products: {
    ar: "المنتجات",
    en: "Products",
    fr: "Produits",
  },
  contact: {
    ar: "اتصل بنا",
    en: "Contact",
    fr: "Contact",
  },
  cart: {
    ar: "السلة",
    en: "Cart",
    fr: "Panier",
  },

  // Product related
  addToCart: {
    ar: "أضف للسلة",
    en: "Add to Cart",
    fr: "Ajouter au panier",
  },
  outOfStock: {
    ar: "نفد المخزون",
    en: "Out of Stock",
    fr: "Rupture de stock",
  },
  weight: {
    ar: "الوزن",
    en: "Weight",
    fr: "Poids",
  },

  // Common
  loading: {
    ar: "جاري التحميل...",
    en: "Loading...",
    fr: "Chargement...",
  },
  error: {
    ar: "خطأ",
    en: "Error",
    fr: "Erreur",
  },
  success: {
    ar: "نجح",
    en: "Success",
    fr: "Succès",
  },
  submit: {
    ar: "إرسال",
    en: "Submit",
    fr: "Soumettre",
  },
  cancel: {
    ar: "إلغاء",
    en: "Cancel",
    fr: "Annuler",
  },
  save: {
    ar: "حفظ",
    en: "Save",
    fr: "Enregistrer",
  },
  delete: {
    ar: "حذف",
    en: "Delete",
    fr: "Supprimer",
  },
  edit: {
    ar: "تعديل",
    en: "Edit",
    fr: "Modifier",
  },
  view: {
    ar: "عرض",
    en: "View",
    fr: "Voir",
  },
  search: {
    ar: "بحث",
    en: "Search",
    fr: "Rechercher",
  },
  filter: {
    ar: "تصفية",
    en: "Filter",
    fr: "Filtrer",
  },
  sort: {
    ar: "ترتيب",
    en: "Sort",
    fr: "Trier",
  },
  price: {
    ar: "السعر",
    en: "Price",
    fr: "Prix",
  },
  category: {
    ar: "الفئة",
    en: "Category",
    fr: "Catégorie",
  },
  name: {
    ar: "الاسم",
    en: "Name",
    fr: "Nom",
  },
  description: {
    ar: "الوصف",
    en: "Description",
    fr: "Description",
  },
  image: {
    ar: "الصورة",
    en: "Image",
    fr: "Image",
  },
  add: {
    ar: "إضافة",
    en: "Add",
    fr: "Ajouter",
  },

  // Products
  allProducts: {
    ar: "جميع المنتجات",
    en: "All Products",
    fr: "Tous les produits",
  },
  featuredProducts: {
    ar: "المنتجات المميزة",
    en: "Featured Products",
    fr: "Produits vedettes",
  },
  newProducts: {
    ar: "المنتجات الجديدة",
    en: "New Products",
    fr: "Nouveaux produits",
  },
  bestSellers: {
    ar: "الأكثر مبيعاً",
    en: "Best Sellers",
    fr: "Meilleures ventes",
  },
  buyNow: {
    ar: "اشتري الآن",
    en: "Buy Now",
    fr: "Acheter maintenant",
  },
  inStock: {
    ar: "متوفر",
    en: "In Stock",
    fr: "En stock",
  },
  priceRange: {
    ar: "نطاق السعر",
    en: "Price Range",
    fr: "Gamme de prix",
  },
  sortBy: {
    ar: "ترتيب حسب",
    en: "Sort By",
    fr: "Trier par",
  },
  filterBy: {
    ar: "تصفية حسب",
    en: "Filter By",
    fr: "Filtrer par",
  },
  showingResults: {
    ar: "عرض النتائج",
    en: "Showing Results",
    fr: "Affichage des résultats",
  },
  noResults: {
    ar: "لا توجد نتائج",
    en: "No Results Found",
    fr: "Aucun résultat",
  },
  loadMore: {
    ar: "تحميل المزيد",
    en: "Load More",
    fr: "Charger plus",
  },

  // About
  ourStory: {
    ar: "قصتنا",
    en: "Our Story",
    fr: "Notre histoire",
  },
  ourMission: {
    ar: "مهمتنا",
    en: "Our Mission",
    fr: "Notre mission",
  },
  ourValues: {
    ar: "قيمنا",
    en: "Our Values",
    fr: "Nos valeurs",
  },
  ourTeam: {
    ar: "فريقنا",
    en: "Our Team",
    fr: "Notre équipe",
  },

  // Contact
  contactUs: {
    ar: "اتصل بنا",
    en: "Contact Us",
    fr: "Contactez-nous",
  },
  getInTouch: {
    ar: "تواصل معنا",
    en: "Get in Touch",
    fr: "Prenez contact",
  },
  sendMessage: {
    ar: "إرسال رسالة",
    en: "Send Message",
    fr: "Envoyer message",
  },
  yourName: {
    ar: "اسمك",
    en: "Your Name",
    fr: "Votre nom",
  },
  yourEmail: {
    ar: "بريدك الإلكتروني",
    en: "Your Email",
    fr: "Votre email",
  },
  yourMessage: {
    ar: "رسالتك",
    en: "Your Message",
    fr: "Votre message",
  },
  subject: {
    ar: "الموضوع",
    en: "Subject",
    fr: "Sujet",
  },
  phone: {
    ar: "الهاتف",
    en: "Phone",
    fr: "Téléphone",
  },
  email: {
    ar: "البريد الإلكتروني",
    en: "Email",
    fr: "Email",
  },
  address: {
    ar: "العنوان",
    en: "Address",
    fr: "Adresse",
  },
  workingHours: {
    ar: "ساعات العمل",
    en: "Working Hours",
    fr: "Heures d'ouverture",
  },

  // Footer
  quickLinks: {
    ar: "روابط سريعة",
    en: "Quick Links",
    fr: "Liens rapides",
  },
  contactInfo: {
    ar: "معلومات الاتصال",
    en: "Contact Info",
    fr: "Informations de contact",
  },
  followUs: {
    ar: "تابعنا",
    en: "Follow Us",
    fr: "Suivez-nous",
  },
  newsletter: {
    ar: "النشرة الإخبارية",
    en: "Newsletter",
    fr: "Newsletter",
  },
  subscribeNewsletter: {
    ar: "اشترك في النشرة",
    en: "Subscribe to Newsletter",
    fr: "S'abonner à la newsletter",
  },
  aboutUs: {
    ar: "نحن ملتزمون بتربية الدجاج العضوي الطازج بأعلى معايير الجودة والاستدامة لعائلتك.",
    en: "We are committed to raising fresh organic chicken with the highest standards of quality and sustainability for your family.",
    fr: "Nous nous engageons à élever des poulets biologiques frais selon les plus hauts standards de qualité et de durabilité.",
  },

  // Admin
  dashboard: {
    ar: "لوحة التحكم",
    en: "Dashboard",
    fr: "Tableau de bord",
  },
  orders: {
    ar: "الطلبات",
    en: "Orders",
    fr: "Commandes",
  },
  customers: {
    ar: "العملاء",
    en: "Customers",
    fr: "Clients",
  },
  categories: {
    ar: "الفئات",
    en: "Categories",
    fr: "Catégories",
  },
  settings: {
    ar: "الإعدادات",
    en: "Settings",
    fr: "Paramètres",
  },
  analytics: {
    ar: "التحليلات",
    en: "Analytics",
    fr: "Analyses",
  },
  manageProducts: {
    ar: "إدارة المنتجات",
    en: "Manage Products",
    fr: "Gérer les produits",
  },
  manageOrders: {
    ar: "إدارة الطلبات",
    en: "Manage Orders",
    fr: "Gérer les commandes",
  },
  manageCategories: {
    ar: "إدارة الفئات",
    en: "Manage Categories",
    fr: "Gérer les catégories",
  },
  manageCustomers: {
    ar: "إدارة العملاء",
    en: "Manage Customers",
    fr: "Gérer les clients",
  },

  // Farm specific
  organicChicken: {
    ar: "دجاج عضوي",
    en: "Organic Chicken",
    fr: "Poulet bio",
  },
  freshChicken: {
    ar: "دجاج طازج",
    en: "Fresh Chicken",
    fr: "Poulet frais",
  },
  freeRange: {
    ar: "مرعى حر",
    en: "Free Range",
    fr: "Élevage en liberté",
  },
  naturalFeed: {
    ar: "علف طبيعي",
    en: "Natural Feed",
    fr: "Alimentation naturelle",
  },
  noHormones: {
    ar: "بدون هرمونات",
    en: "No Hormones",
    fr: "Sans hormones",
  },
  noAntibiotics: {
    ar: "بدون مضادات حيوية",
    en: "No Antibiotics",
    fr: "Sans antibiotiques",
  },
  farmFresh: {
    ar: "طازج من المزرعة",
    en: "Farm Fresh",
    fr: "Frais de la ferme",
  },
  qualityGuaranteed: {
    ar: "جودة مضمونة",
    en: "Quality Guaranteed",
    fr: "Qualité garantie",
  },

  // Hero section
  heroTitle: {
    ar: "دجاج عضوي طازج من المزرعة إلى مائدتك",
    en: "Fresh Organic Chicken from Farm to Your Table",
    fr: "Poulet bio frais de la ferme à votre table",
  },
  heroSubtitle: {
    ar: "نقدم أجود أنواع الدجاج العضوي المربى بطريقة طبيعية وصحية في تونس",
    en: "We provide the finest organic chicken raised naturally and healthily in Tunisia",
    fr: "Nous fournissons le meilleur poulet bio élevé naturellement et sainement en Tunisie",
  },
  shopNow: {
    ar: "تسوق الآن",
    en: "Shop Now",
    fr: "Acheter maintenant",
  },
  learnMore: {
    ar: "اعرف المزيد",
    en: "Learn More",
    fr: "En savoir plus",
  },
  viewAll: {
    ar: "عرض الكل",
    en: "View All",
    fr: "Voir tout",
  },
}

export type TranslationKey = keyof typeof translations

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[key]?.[language] || translations[key]?.en || key
}

export function getLanguageDirection(language: Language): "ltr" | "rtl" {
  return language === "ar" ? "rtl" : "ltr"
}

export function getLanguageName(language: Language): string {
  const names = {
    en: "English",
    ar: "العربية",
    fr: "Français",
  }
  return names[language]
}
