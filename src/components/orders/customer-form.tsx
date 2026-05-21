"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { customerSchema, type CustomerFormValues } from "@/lib/validations";
import { useOrderStore } from "@/store/use-order-store";
import { Button, LinkButton } from "@/components/ui/button";

const inputClass =
  "min-h-12 w-full rounded-xl border border-interagro-border bg-white px-4 py-3 outline-none focus:border-interagro-red";

export function CustomerForm() {
  const router = useRouter();
  const items = useOrderStore((state) => state.items);
  const createOrder = useOrderStore((state) => state.createOrder);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      phone: "",
      commune: "",
      address: "",
      desiredDate: "",
      desiredTimeRange: "Indiferente",
      rut: "",
      comment: "",
    },
  });

  const onSubmit = (values: CustomerFormValues) => {
    if (items.length === 0) {
      return;
    }

    createOrder(
      {
        businessName: values.businessName,
        contactName: values.contactName,
        phone: values.phone,
        commune: values.commune,
        address: values.address,
        rut: values.rut,
      },
      {
        desiredDate: values.desiredDate,
        desiredTimeRange: values.desiredTimeRange,
      },
      values.comment,
    );
    router.push("/solicitud/confirmacion");
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
        <div className="flex gap-3">
          <AlertCircle className="text-yellow-700" size={24} />
          <div>
            <h2 className="font-bold text-yellow-900">Agrega al menos un producto</h2>
            <p className="mt-1 text-sm text-yellow-800">Para enviar una solicitud primero debes seleccionar productos.</p>
            <LinkButton href="/catalogo" className="mt-4">
              Ver catálogo
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
      <Field label="Nombre del negocio" error={errors.businessName?.message}>
        <input {...register("businessName")} className={inputClass} placeholder="Ej: Minimarket Santa Rosa" />
      </Field>
      <Field label="Nombre de contacto" error={errors.contactName?.message}>
        <input {...register("contactName")} className={inputClass} placeholder="Ej: Carolina Perez" />
      </Field>
      <Field label="Teléfono" error={errors.phone?.message}>
        <input {...register("phone")} className={inputClass} placeholder="+56 9 1234 5678" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Comuna" error={errors.commune?.message}>
          <input {...register("commune")} className={inputClass} placeholder="Rancagua" />
        </Field>
        <Field label="RUT (opcional)" error={errors.rut?.message}>
          <input {...register("rut")} className={inputClass} placeholder="76.123.456-7" />
        </Field>
      </div>
      <Field label="Dirección" error={errors.address?.message}>
        <input {...register("address")} className={inputClass} placeholder="Calle y número" />
      </Field>
      <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
        <h2 className="text-lg font-bold text-green-900">Fecha del pedido</h2>
        <p className="mt-1 text-sm text-green-800">Esto ayuda a Hugo a ordenar su cronograma de entregas y confirmaciones.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="¿Para qué fecha necesitas el pedido?" error={errors.desiredDate?.message}>
            <input
              {...register("desiredDate")}
              min={new Date().toISOString().split("T")[0]}
              type="date"
              className={inputClass}
            />
          </Field>
          <Field label="Horario preferido" error={errors.desiredTimeRange?.message}>
            <select {...register("desiredTimeRange")} className={inputClass}>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Indiferente">Indiferente</option>
              <option value="Otro">Otro</option>
            </select>
          </Field>
        </div>
      </div>
      <Field label="Comentario adicional (opcional)" error={errors.comment?.message}>
        <textarea {...register("comment")} className={`${inputClass} min-h-28`} placeholder="Ej: horario ideal de contacto o entrega" />
      </Field>
      <div className="rounded-xl bg-green-50 p-4 text-sm text-green-800">
        Tu solicitud quedará pendiente de confirmación. Hugo revisará disponibilidad y responderá por WhatsApp.
      </div>
      <Button disabled={isSubmitting} type="submit" size="lg" className="w-full">
        Generar solicitud
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-interagro-text">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}
