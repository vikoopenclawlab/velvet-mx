import { ModelType } from "./types";

// Helper to generate picsum URLs
const photo = (seed: string, w = 400, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const SEED_CITIES = [
  { id: "city-cdmx", name: "Ciudad de México", state: "CDMX" },
  { id: "city-gdl", name: "Guadalajara", state: "Jalisco" },
  { id: "city-mty", name: "Monterrey", state: "Nuevo León" },
  { id: "city-pue", name: "Puebla", state: "Puebla" },
  { id: "city-tij", name: "Tijuana", state: "Baja California" },
  { id: "city-leon", name: "León", state: "Guanajuato" },
  { id: "city-cjs", name: "Ciudad Juárez", state: "Chihuahua" },
  { id: "city-zap", name: "Zapopan", state: "Jalisco" },
  { id: "city-mer", name: "Mérida", state: "Yucatán" },
  { id: "city-qto", name: "Querétaro", state: "Querétaro" },
];

export const SEED_SERVICES = [
  { id: "svc-1", name: "Citas companionship", description: "Acompañamiento elegante para eventos y reuniones", price: 1500, duration: 120 },
  { id: "svc-2", name: "Encuentros íntimos", description: "Encuentros privados consentimiento mutuo", price: 2000, duration: 60 },
  { id: "svc-3", name: "旅途acompanamiento", description: "Viajes con nuestra compañía", price: 5000, duration: 1440 },
  { id: "svc-4", name: "Masaje sensi", description: "Masaje relajante con técnicas sensuales", price: 1200, duration: 60 },
  { id: "svc-5", name: "Noche especial", description: "Noche completa de compañía", price: 8000, duration: 480 },
  { id: "svc-6", name: "Brindis escort", description: "Acompañamiento para cenas y eventos", price: 2500, duration: 180 },
];

const LOREM_BIO = "Soy una persona apasionada por el arte de la compañía. Me encanta conocer personas nuevas,shy viajes,y experiencias únicas. Siempre busco crear momentos inolvidables llenos de complicidad y buena conversación.";

export const SEED_MODELS = [
  // CDMX - 3 models
  {
    id: "model-001", cityId: "city-cdmx", name: "Valentina Noir", tagline: "Elegancia que seduce", bio: LOREM_BIO, age: 26, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("valentina-noir-cdmx"), gallery: [photo("valentina-1"), photo("valentina-2"), photo("valentina-3"), photo("valentina-4")],
    rating: 4.9, reviewCount: 47, viewCount: 3420, bookingCount: 89, verified: true,
  },
  {
    id: "model-002", cityId: "city-cdmx", name: "Luna Reyes", tagline: "Mysteries enclosed", bio: LOREM_BIO, age: 24, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("luna-reyes-cdmx"), gallery: [photo("luna-1"), photo("luna-2"), photo("luna-3"), photo("luna-4")],
    rating: 4.8, reviewCount: 32, viewCount: 2150, bookingCount: 67, verified: true,
  },
  {
    id: "model-003", cityId: "city-cdmx", name: "Sofia Mencia", tagline: "Belleza natural", bio: LOREM_BIO, age: 28, type: ModelType.MASAJISTA,
    mainPhoto: photo("sofia-mencia-cdmx"), gallery: [photo("sofia-1"), photo("sofia-2"), photo("sofia-3"), photo("sofia-4")],
    rating: 4.7, reviewCount: 28, viewCount: 1890, bookingCount: 54, verified: false,
  },
  // Guadalajara - 3 models
  {
    id: "model-004", cityId: "city-gdl", name: "Camila Vega", tagline: "Dulzura que envuelve", bio: LOREM_BIO, age: 25, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("camila-vega-gdl"), gallery: [photo("camila-1"), photo("camila-2"), photo("camila-3"), photo("camila-4")],
    rating: 4.9, reviewCount: 41, viewCount: 2980, bookingCount: 78, verified: true,
  },
  {
    id: "model-005", cityId: "city-gdl", name: "Isabella Cruz", tagline: "Passion incarnate", bio: LOREM_BIO, age: 27, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("isabella-cruz-gdl"), gallery: [photo("isabella-1"), photo("isabella-2"), photo("isabella-3"), photo("isabella-4")],
    rating: 4.8, reviewCount: 35, viewCount: 2340, bookingCount: 71, verified: true,
  },
  {
    id: "model-006", cityId: "city-gdl", name: "Daniela Soul", tagline: "Sensual massage", bio: LOREM_BIO, age: 23, type: ModelType.MASAJISTA,
    mainPhoto: photo("daniela-soul-gdl"), gallery: [photo("daniela-1"), photo("daniela-2"), photo("daniela-3"), photo("daniela-4")],
    rating: 4.6, reviewCount: 19, viewCount: 1450, bookingCount: 38, verified: false,
  },
  // Monterrey - 3 models
  {
    id: "model-007", cityId: "city-mty", name: "Victoria Fuentes", tagline: "Reina de la noche", bio: LOREM_BIO, age: 29, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("victoria-fuentes-mty"), gallery: [photo("victoria-1"), photo("victoria-2"), photo("victoria-3"),  photo("victoria-4")],
    rating: 5.0, reviewCount: 52, viewCount: 4120, bookingCount: 98, verified: true,
  },
  {
    id: "model-008", cityId: "city-mty", name: "Renata Lara", tagline: "Enchanting moments", bio: LOREM_BIO, age: 26, type: ModelType.TRAVESTI,
    mainPhoto: photo("renata-lara-mty"), gallery: [photo("renata-1"), photo("renata-2"), photo("renata-3"), photo("renata-4")],
    rating: 4.7, reviewCount: 26, viewCount: 1980, bookingCount: 52, verified: true,
  },
  {
    id: "model-009", cityId: "city-mty", name: "Miriam Wells", tagline: "Pure relaxation", bio: LOREM_BIO, age: 31, type: ModelType.MASAJISTA,
    mainPhoto: photo("miriam-wells-mty"), gallery: [photo("miriam-1"), photo("miriam-2"), photo("miriam-3"), photo("miriam-4")],
    rating: 4.5, reviewCount: 15, viewCount: 1230, bookingCount: 29, verified: false,
  },
  // Puebla - 3 models
  {
    id: "model-010", cityId: "city-pue", name: "Ximena Cervantes", tagline: "Angelical beauty", bio: LOREM_BIO, age: 24, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("ximena-cervantes-pue"), gallery: [photo("ximena-1"), photo("ximena-2"), photo("ximena-3"), photo("ximena-4")],
    rating: 4.8, reviewCount: 29, viewCount: 2010, bookingCount: 58, verified: true,
  },
  {
    id: "model-011", cityId: "city-pue", name: "Ariana Puente", tagline: "Fire and ice", bio: LOREM_BIO, age: 27, type: ModelType.TRAVESTI,
    mainPhoto: photo("ariana-puente-pue"), gallery: [photo("ariana-1"), photo("ariana-2"), photo("ariana-3"), photo("ariana-4")],
    rating: 4.6, reviewCount: 21, viewCount: 1650, bookingCount: 44, verified: false,
  },
  {
    id: "model-012", cityId: "city-pue", name: "Paloma Ruiz", tagline: "Touch of heaven", bio: LOREM_BIO, age: 30, type: ModelType.MASAJISTA,
    mainPhoto: photo("paloma-ruiz-pue"), gallery: [photo("paloma-1"), photo("paloma-2"), photo("paloma-3"), photo("paloma-4")],
    rating: 4.4, reviewCount: 12, viewCount: 980, bookingCount: 24, verified: false,
  },
  // Tijuana - 3 models
  {
    id: "model-013", cityId: "city-tij", name: "Marina Torres", tagline: "Border beauty", bio: LOREM_BIO, age: 25, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("marina-torres-tij"), gallery: [photo("marina-1"), photo("marina-2"), photo("marina-3"), photo("marina-4")],
    rating: 4.8, reviewCount: 33, viewCount: 2450, bookingCount: 65, verified: true,
  },
  {
    id: "model-014", cityId: "city-tij", name: "Luna Starr", tagline: "No limits", bio: LOREM_BIO, age: 23, type: ModelType.TRAVESTI,
    mainPhoto: photo("luna-starr-tij"), gallery: [photo("luna-starr-1"), photo("luna-starr-2"), photo("luna-starr-3"), photo("luna-starr-4")],
    rating: 4.7, reviewCount: 24, viewCount: 1780, bookingCount: 48, verified: true,
  },
  {
    id: "model-015", cityId: "city-tij", name: "Celia Mendez", tagline: "Serenity now", bio: LOREM_BIO, age: 28, type: ModelType.MASAJISTA,
    mainPhoto: photo("celia-mendez-tij"), gallery: [photo("celia-1"), photo("celia-2"), photo("celia-3"), photo("celia-4")],
    rating: 4.5, reviewCount: 16, viewCount: 1120, bookingCount: 32, verified: false,
  },
  // León - 3 models
  {
    id: "model-016", cityId: "city-leon", name: "Fernanda Peña", tagline: "Guanajuato fire", bio: LOREM_BIO, age: 26, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("fernanda-pena-leon"), gallery: [photo("fernanda-1"), photo("fernanda-2"), photo("fernanda-3"), photo("fernanda-4")],
    rating: 4.9, reviewCount: 38, viewCount: 2780, bookingCount: 72, verified: true,
  },
  {
    id: "model-017", cityId: "city-leon", name: "Scarlet Vega", tagline: "Red passion", bio: LOREM_BIO, age: 25, type: ModelType.TRAVESTI,
    mainPhoto: photo("scarlet-vega-leon"), gallery: [photo("scarlet-1"), photo("scarlet-2"), photo("scarlet-3"), photo("scarlet-4")],
    rating: 4.6, reviewCount: 22, viewCount: 1720, bookingCount: 45, verified: false,
  },
  {
    id: "model-018", cityId: "city-leon", name: "Elena Martinez", tagline: "Peaceful escape", bio: LOREM_BIO, age: 29, type: ModelType.MASAJISTA,
    mainPhoto: photo("elena-martinez-leon"), gallery: [photo("elena-1"), photo("elena-2"), photo("elena-3"), photo("elena-4")],
    rating: 4.4, reviewCount: 14, viewCount: 1050, bookingCount: 27, verified: false,
  },
  // Ciudad Juárez - 3 models
  {
    id: "model-019", cityId: "city-cjs", name: "AnaBel Torres", tagline: "Desert rose", bio: LOREM_BIO, age: 27, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("anabel-torres-cjs"), gallery: [photo("anabel-1"), photo("anabel-2"), photo("anabel-3"), photo("anabel-4")],
    rating: 4.8, reviewCount: 31, viewCount: 2290, bookingCount: 63, verified: true,
  },
  {
    id: "model-020", cityId: "city-cjs", name: "Jessica Lux", tagline: "Borderless allure", bio: LOREM_BIO, age: 24, type: ModelType.TRAVESTI,
    mainPhoto: photo("jessica-lux-cjs"), gallery: [photo("jessica-1"), photo("jessica-2"), photo("jessica-3"), photo("jessica-4")],
    rating: 4.7, reviewCount: 23, viewCount: 1690, bookingCount: 46, verified: true,
  },
  {
    id: "model-021", cityId: "city-cjs", name: "Rosa Medina", tagline: "Oasis calm", bio: LOREM_BIO, age: 32, type: ModelType.MASAJISTA,
    mainPhoto: photo("rosa-medina-cjs"), gallery: [photo("rosa-1"), photo("rosa-2"), photo("rosa-3"), photo("rosa-4")],
    rating: 4.3, reviewCount: 11, viewCount: 890, bookingCount: 21, verified: false,
  },
  // Zapopan - 3 models
  {
    id: "model-022", cityId: "city-zap", name: "Lucia Gtz", tagline: "Guadalajara gem", bio: LOREM_BIO, age: 26, type: ModelType.ACOMPANANTE,
    mainPhoto: photo("lucia-gtz-zap"), gallery: [photo("lucia-1"), photo("lucia-2"), photo("lucia-3"), photo("lucia-4")],
    rating: 4.9, reviewCount: 44, viewCount: 3150, bookingCount: 82, verified: true,
  },
  {
    id: "model-023", cityId: "city-zap", name: "Karla Moon", tagline: "Starlight magic", bio: LOREM_BIO, age: 25, type: ModelType.TRAVESTI,
    mainPhoto: photo("karla-moon-zap"), gallery: [photo("karla-1"), photo("karla-2"), photo("karla-3"), photo("karla-4")],
    rating: 4.8, reviewCount: 27, viewCount: 1950, bookingCount: 55, verified: true,
  },
  {
    id: "model-024", cityId: "city-zap", name: "Natalia Soto", tagline: "Healing hands", bio: LOREM_BIO, age: 28, type: ModelType.MASAJISTA,
    mainPhoto: photo("natalia-soto-zap"), gallery: [photo("natalia-1"), photo("natalia-2"), photo("natalia-3"), photo("natalia-4")],
    rating: 4.6, reviewCount: 18, viewCount: 1380, bookingCount: 36, verified: false,
  },
];

export const SEED_REVIEWS = [
  { id: "rev-001", modelId: "model-001", rating: 5, title: "Increíble experiencia", content: "Valentina es simplemente perfecta. Educada,guapa,y hace que cualquier momento sea especial. La recomiendo totalmente.", userName: "Carlos M." },
  { id: "rev-002", modelId: "model-001", rating: 5, title: "Noche inolvidable", content: "Pasamos una noche increíble. Valentina tiene una presencia magnética y es muy profesional.", userName: "Jorge R." },
  { id: "rev-003", modelId: "model-002", rating: 4, title: "Muy buena compañía", content: "Luna es encantadora. Muy buena conversación y muy guapa. Definitivamente repetiré.", userName: "Miguel A." },
  { id: "rev-004", modelId: "model-004", rating: 5, title: "La mejor de GDL", content: "Camila exceeds todas las expectativas. elegant, inteligente,y una compañía perfecta para cualquier evento.", userName: "Diego F." },
  { id: "rev-005", modelId: "model-007", rating: 5, title: "Absolutely Amazing", content: "Victoria is the definition of sophistication. Made my corporate event truly memorable.", userName: "Roberto K." },
  { id: "rev-006", modelId: "model-007", rating: 5, title: "Perfect night", content: "From the moment she arrived, Victoria commanded attention. A true professional.", userName: "Luis G." },
  { id: "rev-007", modelId: "model-010", rating: 4, title: " Gran experiencia", content: "Ximena es muy agradable y hace que te sientas cómodo inmediatamente. Muy recomendable.", userName: "Antonio B." },
  { id: "rev-008", modelId: "model-013", rating: 5, title: "Exceeded expectations", content: "Marina exceeded all expectations. Beautiful, charming, and incredibly professional.", userName: "Samuel L." },
  { id: "rev-009", modelId: "model-016", rating: 5, title: "Impresionante", content: "Fernanda tiene un aura special. Hizo que mi viaje a León fuera inolvidable.", userName: "Pablo S." },
  { id: "rev-010", modelId: "model-022", rating: 5, title: "Top tier service", content: "Lucia is in a league of her own. Impeccable grooming, great conversation, perfect company.", userName: "Oscar M." },
];

export const TESTIMONIALS = [
  { name: "Roberto K.", city: "Monterrey", text: "Experience with Victoria was absolutely magical. She is the perfect combination of beauty, intelligence, and charm. Made my corporate event truly memorable." },
  { name: "Carlos M.", city: "CDMX", text: "Velvet MX redefined what I thought companionship could be. Discreet, professional, and the models are genuinely fascinating people." },
  { name: "Miguel A.", city: "Guadalajara", text: "I've used several platforms, but Velvet MX is different. The verification process gives peace of mind, and the quality is exceptional." },
];
