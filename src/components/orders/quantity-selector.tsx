"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type QuantitySelectorProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Button aria-label="Disminuir cantidad" variant="secondary" size="sm" className="h-11 w-11 p-0" onClick={onDecrease}>
        <Minus size={18} />
      </Button>
      <span className="min-w-8 text-center text-lg font-bold">{quantity}</span>
      <Button aria-label="Aumentar cantidad" variant="secondary" size="sm" className="h-11 w-11 p-0" onClick={onIncrease}>
        <Plus size={18} />
      </Button>
    </div>
  );
}
