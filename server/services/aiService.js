/** Punto de extensión para OpenAI/Claude. Mantiene el motor clínico desacoplado. */
export async function enrichRecommendation(context){ if(process.env.AI_PROVIDER==='none'||!process.env.AI_PROVIDER)return null; /* integrar proveedor aquí usando AI_API_KEY */ return null; }
