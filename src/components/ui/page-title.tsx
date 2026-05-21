import type { ReactNode } from "react";

type PageTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageTitle({ eyebrow, title, description, action }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-bold uppercase text-interagro-red">{eyebrow}</p> : null}
        <h1 className="mt-1 text-3xl font-bold text-interagro-text sm:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-base leading-7 text-interagro-muted">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0">{action}</div> : null}
    </div>
  );
}
