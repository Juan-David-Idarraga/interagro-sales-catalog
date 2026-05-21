"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, MessageCircle, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { InteragroLogo } from "@/components/layout/interagro-logo";
import { Button, LinkButton } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { buildShareCatalogMessage, createWhatsAppLink, HUGO_PHONE } from "@/lib/whatsapp";
import { LogoutButton } from "@/components/auth/logout-button";

export default function ShareCatalogPage() {
  const [catalogUrl, setCatalogUrl] = useState("http://localhost:3000/catalogo");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCatalogUrl(`${window.location.origin}/catalogo`);
  }, []);

  const shareLink = useMemo(() => createWhatsAppLink(HUGO_PHONE, buildShareCatalogMessage(catalogUrl)), [catalogUrl]);

  async function copyLink() {
    await navigator.clipboard.writeText(catalogUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <PageTitle
        eyebrow="Compartir"
        title="Compartir catalogo"
        description="Usa este link o QR cuando visites negocios presencialmente."
        action={
          <div className="flex flex-wrap gap-2">
            <BackButton href="/hugo" label="Volver al panel" />
            <LogoutButton />
          </div>
        }
      />
      <section className="rounded-3xl border border-interagro-border bg-white p-5 text-center shadow-soft">
        <InteragroLogo className="mx-auto w-44" />
        <div className="mx-auto mt-5 flex h-64 w-64 items-center justify-center rounded-3xl border border-interagro-border bg-white p-5">
          <QRCodeSVG value={catalogUrl} size={210} level="M" includeMargin />
        </div>
        <div className="mt-4 rounded-2xl bg-interagro-bg p-4 text-left">
          <p className="flex items-center gap-2 text-sm font-bold text-interagro-muted">
            <QrCode size={18} />
            Link del catalogo
          </p>
          <p className="mt-2 break-all text-sm font-semibold text-interagro-text">{catalogUrl}</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button size="lg" onClick={copyLink}>
            <Copy size={22} />
            {copied ? "Link copiado" : "Copiar link"}
          </Button>
          <LinkButton href={shareLink} target="_blank" variant="secondary" size="lg">
            <MessageCircle size={22} />
            Compartir por WhatsApp
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
