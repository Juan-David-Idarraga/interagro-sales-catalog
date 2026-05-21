import { z } from "zod";

export const customerSchema = z.object({
  businessName: z.string().min(2, "Ingresa el nombre del negocio."),
  contactName: z.string().min(2, "Ingresa el nombre de contacto."),
  phone: z.string().min(8, "Ingresa un teléfono válido."),
  commune: z.string().min(2, "Ingresa la comuna."),
  address: z.string().min(5, "Ingresa la dirección."),
  desiredDate: z
    .string()
    .min(1, "Selecciona la fecha deseada.")
    .refine((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(`${value}T00:00:00`);
      return selectedDate >= today;
    }, "La fecha no puede ser anterior a hoy."),
  desiredTimeRange: z.string().min(1, "Selecciona un horario preferido."),
  rut: z.string().optional(),
  comment: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
