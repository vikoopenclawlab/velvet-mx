export const CITIES = [
  { name: "Ciudad de México", state: "CDMX", zones: ["Polanco", "Roma", "Condesa", "Santa Fe", "Centro Historico"] },
  { name: "Guadalajara", state: "Jalisco", zones: ["Andares", "Chapultepec", "Centro", "Tonalá"] },
  { name: "Monterrey", state: "Nuevo León", zones: ["San Agustín", "C眉Rem", "Centro", "Obispado"] },
  { name: "Puebla", state: "Puebla", zones: ["Centro", "Atlixcayotl", "Angelópolis"] },
  { name: "Tijuana", state: "Baja California", zones: ["Zona Río", "Centro", "Playas"] },
  { name: "León", state: "Guanajuato", zones: ["Centro", "Plaza Mayor", "Galerías"] },
  { name: "Ciudad Juárez", state: "Chihuahua", zones: ["Zona Pronaf", "Centro", "Terracos"] },
  { name: "Zapopan", state: "Jalisco", zones: ["Andares", "paseo", "Centro", "La Noël"] },
  { name: "Mérida", state: "Yucatán", zones: ["Centro", "Altabrisa", "Montejo"] },
  { name: "Querétaro", state: "Querétaro", zones: ["Centro", "Jurica", "Milagro"] },
] as const;

export const ModelType = ["ACOMPANANTE", "TRAVESTI", "MASAJISTA"] as const;

export const SERVICES = [
  { name: "Citas companionship", description: "Acompañamiento elegante para eventos y reuniones", price: 1500, duration: 120 },
  { name: "Encuentros íntimos", description: "Encuentros privados consentimiento mutuo", price: 2000, duration: 60 },
  { name: "旅途acompanamiento", description: "Viajes con nuestra compañía", price: 5000, duration: 1440 },
  { name: "Masaje sensi", description: "Masaje relajante con técnicas sensuales", price: 1200, duration: 60 },
  { name: "Noche especial", description: "Noche completa de compañía", price: 8000, duration: 480 },
  { name: "Brindis escort", description: "Acompañamiento para cenas y eventos", price: 2500, duration: 180 },
] as const;

export const APP_CONSTANTS = {
  name: "Velvet MX",
  tagline: "Experiencias que seducen",
  description: "Plataforma premium de acompañantespara México. Conexiones auténticas, experiencias inolvidables.",
  contactEmail: "contacto@velvetmx.com",
  minAge: 18,
} as const;
