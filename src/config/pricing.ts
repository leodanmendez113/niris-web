// TARIFAS PROVISIONALES (valores de referencia, NO son los precios reales de Niris).
// Leo: para ajustar el cotizador solo hay que cambiar los números de este archivo.
// Todos los montos están en dólares.

export const pricing = {
  /** El estimado se muestra como rango: total × low  …  total × high */
  range: { low: 0.9, high: 1.15 },

  airbnb: {
    /** Precio por limpieza entre huéspedes según habitaciones (0 = estudio) */
    byBedrooms: [80, 90, 115, 145, 180, 215],
    extraBathroom: 20,
    /** Descuento según limpiezas al mes */
    volume: [
      { id: "1-4", minPerMonth: 2, discount: 0 },
      { id: "5-10", minPerMonth: 7, discount: 0.05 },
      { id: "11+", minPerMonth: 12, discount: 0.1 },
    ],
    extras: { linen: 25, restock: 15, sameDay: 30 },
  },

  home: {
    byBedrooms: [95, 115, 145, 180, 220, 265],
    extraBathroom: 25,
    type: { standard: 1, deep: 1.5, move: 1.8 },
    frequency: [
      { id: "once", perMonth: 1, discount: 0 },
      { id: "monthly", perMonth: 1, discount: 0.05 },
      { id: "biweekly", perMonth: 2, discount: 0.1 },
      { id: "weekly", perMonth: 4, discount: 0.15 },
    ],
    extras: { oven: 30, fridge: 30, windows: 45 },
  },

  office: {
    perSqft: 0.1,
    minimumVisit: 95,
    /** Visitas por semana */
    frequency: [
      { id: "1", perWeek: 1, discount: 0 },
      { id: "2", perWeek: 2, discount: 0.05 },
      { id: "3", perWeek: 3, discount: 0.08 },
      { id: "5", perWeek: 5, discount: 0.12 },
    ],
    extras: { restrooms: 35, kitchen: 25, trash: 15 },
  },

  hotel: {
    perRoom: 22,
    /** Días de servicio por semana */
    frequency: [
      { id: "3", perWeek: 3, discount: 0 },
      { id: "5", perWeek: 5, discount: 0.04 },
      { id: "7", perWeek: 7, discount: 0.08 },
    ],
    extras: { common: 120, laundry: 90, restaurant: 150 },
  },
} as const;

export type QuoteService = "airbnb" | "home" | "office" | "hotel";
