const { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } = require("node:fs");
const { basename, extname, join } = require("node:path");

type GeneratedProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  format: string;
  conservation: "Congelado" | "Refrigerado" | "Ambiente" | "Consultar";
  code: string;
  price: string;
  observation: string;
  imageUrl: string;
  status: "available" | "ask";
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

const sourceFolder = process.argv[2] || "C:\\Users\\juani\\Desktop\\INTERAGRO";
const projectRoot = process.cwd();
const outputImagesFolder = join(projectRoot, "public", "images", "productos");
const outputDataFile = join(projectRoot, "src", "lib", "generated-products.ts");
const outputSeedFile = join(projectRoot, "supabase", "generated-products-seed.sql");

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const nameFixes: Record<string, string> = {
  alitasdepollo: "alitas de pollo",
  arollados: "arrollado",
  avemarinada: "ave marinada",
  carnemolida: "carne molida",
  chickenfingers: "chicken fingers",
  choclo: "choclo desgranado",
  choclotrozado: "choclo trozado",
  filetedereina: "filete de reineta",
  frutillas: "frutillas",
  mangoentrozos: "mango en trozos",
  melontuna: "melon tuna",
  mixfrutosrojos: "mix frutos rojos",
  mixtropical1: "mix tropical 1",
  mixtropical2: "mix tropical 2",
  nuggetspollo: "nuggets pollo",
  papasfritas: "papas fritas",
  pulpadeframbuesa: "pulpa de frambuesa",
  pulpadefrutillaazucar: "pulpa de frutilla con azucar",
  pulpademangoazucar: "pulpa de mango con azucar",
  pulpadepina: "pulpa de pina",
  "pulpadepi\u00f1a": "pulpa de pina",
  pulpamaracuyasinazucar: "pulpa de maracuya sin azucar",
  sofrito: "sofrito",
  trutospollo: "trutos de pollo",
  "chicken fingersd": "chicken fingers",
  nugets: "nuggets",
};

const productPriceBySlug: Record<string, string> = {
  "choclo-trozado": "$700",
  sofrito: "$600",
  "filete-de-reineta": "$10.000",
  hamburguesa: "$900",
  jardinera: "$500",
  "choclo-desgranado": "$500",
  arvejitas: "$450",
  "carne-molida": "$1.200",
  pizza: "$3.800",
  arrollado: "$4.700",
  "ave-marinada": "$15.000",
  "mix-tropical-1": "$4.300",
  "mix-tropical-2": "Consultar",
  "melon-tuna": "$3.200",
  "pulpa-de-frutilla-con-azucar": "$3.000",
  "pulpa-de-maracuya-sin-azucar": "$7.000",
  "pulpa-de-frambuesa": "$5.300",
  "pulpa-de-mango-con-azucar": "$4.100",
  "nuggets-pollo": "$2.100",
  "papas-fritas": "$4.300",
  "mango-en-trozos": "$5.400",
  pina: "$5.500",
  arandanos: "$4.400",
  "mix-frutos-rojos": "$4.700",
  frutillas: "$3.100",
  "alitas-de-pollo": "$3.350",
  "pulpa-de-pina": "$3.900",
  "trutos-de-pollo": "$3.700",
};

const productFormatBySlug: Record<string, string> = {
  "papas-fritas": "Bolsa 2.5 kilos",
};

const displayNameFixes: Record<string, string> = {
  arandanos: "Arandanos",
  pina: "Pina",
  "pi\u00f1a": "Pina",
  "melon tuna": "Melon Tuna",
  "pulpa maracuya": "Pulpa Maracuya",
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanBaseName(fileName: string): string {
  const rawName = basename(fileName, extname(fileName))
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\d+\b/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return nameFixes[rawName] || rawName;
}

function titleCase(value: string): string {
  if (displayNameFixes[value]) return displayNameFixes[value];

  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferCategory(baseName: string): string {
  if (/(alitas|ave|pollo|trutos|chicken|nuggets)/i.test(baseName)) return "Pollos";
  if (/(arrollado)/i.test(baseName)) return "Cerdo";
  if (/(carne|filete|hamburguesa)/i.test(baseName)) return "Vacuno";
  if (/(arandanos|frutilla|mango|melon|tropical|pina|frambuesa|maracuya|frutos rojos|pulpa)/i.test(baseName)) {
    return "Congelados";
  }
  if (/(arvejitas|choclo|jardinera|papa|papas|sofrito)/i.test(baseName)) return "Papas y vegetales";
  if (/(pizza)/i.test(baseName)) return "Otros";
  return "Congelados";
}

function buildDescription(category: string): string {
  if (category === "Papas y vegetales") {
    return "Producto congelado para negocios, cocinerias y locales de comida. Confirmar disponibilidad directamente con Hugo.";
  }

  if (category === "Congelados") {
    return "Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.";
  }

  return "Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.";
}

function sqlString(value: string | undefined): string {
  if (!value) return "null";
  return `'${value.replace(/'/g, "''")}'`;
}

if (!existsSync(sourceFolder)) {
  throw new Error(`No se encontro la carpeta de productos: ${sourceFolder}`);
}

mkdirSync(outputImagesFolder, { recursive: true });
mkdirSync(join(projectRoot, "supabase"), { recursive: true });

const imageFiles = (readdirSync(sourceFolder) as string[])
  .filter((fileName: string) => imageExtensions.has(extname(fileName).toLowerCase()))
  .sort((a: string, b: string) => a.localeCompare(b, "es"));

const usedSlugs = new Map<string, number>();
const now = new Date().toISOString();

const products: GeneratedProduct[] = imageFiles.map((fileName: string, index: number) => {
  const cleanedBaseName = cleanBaseName(fileName);
  const baseSlug = slugify(cleanedBaseName);
  const duplicateCount = usedSlugs.get(baseSlug) || 0;
  usedSlugs.set(baseSlug, duplicateCount + 1);
  const slug = duplicateCount === 0 ? baseSlug : `${baseSlug}-${duplicateCount + 1}`;
  const extension = extname(fileName).toLowerCase();
  const outputFileName = `${slug}${extension}`;
  const category = inferCategory(cleanedBaseName);

  copyFileSync(join(sourceFolder, fileName), join(outputImagesFolder, outputFileName));

  return {
    id: slug,
    name: titleCase(cleanedBaseName),
    slug,
    description: buildDescription(category),
    category,
    format: productFormatBySlug[slug] || "Consultar presentacion",
    conservation: "Congelado",
    code: "Consultar codigo",
    price: productPriceBySlug[slug] || "Consultar",
    observation: "Ideal para restaurantes, minimarkets o distribuidores.",
    imageUrl: `/images/productos/${outputFileName}`,
    status: "available",
    isActive: true,
    featured: index < 6,
    createdAt: now,
    updatedAt: now,
  };
});

const dataFileContent = `import type { Product } from "./types";

export const generatedProducts: Product[] = ${JSON.stringify(products, null, 2)};
`;

const seedRows = products
  .map((product) => {
    return `(${sqlString(product.name)}, ${sqlString(product.slug)}, ${sqlString(product.description)}, ${sqlString(product.category)}, ${sqlString(product.format)}, ${sqlString(product.conservation)}, ${sqlString(product.code)}, ${sqlString(product.price)}, ${sqlString(product.observation)}, ${sqlString(product.imageUrl)}, ${sqlString(product.status)}, ${product.isActive}, ${product.featured})`;
  })
  .join(",\n");

const seedFileContent = `-- Generated by npm run import-products.
insert into products (
  name,
  slug,
  description,
  category,
  format,
  conservation,
  code,
  price,
  observation,
  image_url,
  status,
  is_active,
  featured
) values
${seedRows}
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  format = excluded.format,
  conservation = excluded.conservation,
  code = excluded.code,
  price = excluded.price,
  observation = excluded.observation,
  image_url = excluded.image_url,
  status = excluded.status,
  is_active = excluded.is_active,
  featured = excluded.featured,
  updated_at = now();
`;

writeFileSync(outputDataFile, dataFileContent, "utf8");
writeFileSync(outputSeedFile, seedFileContent, "utf8");

console.log(`Productos importados: ${products.length}`);
console.log(`Imagenes copiadas a: ${outputImagesFolder}`);
console.log(`Datos generados en: ${outputDataFile}`);
console.log(`Seed SQL generado en: ${outputSeedFile}`);
