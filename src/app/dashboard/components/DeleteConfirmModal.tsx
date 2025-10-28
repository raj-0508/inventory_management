"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DeleteConfirmModalProps = {
  show: boolean;
  productName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ show, productName, onCancel, onConfirm }: DeleteConfirmModalProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md border-border/60 p-6">
        <h3 className="mb-4 text-lg font-semibold text-destructive">Delete Product</h3>
        <p className="mb-6 text-muted-foreground">
          Are you sure you want to delete <strong>&quot;{productName}&quot;</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button 
            variant="ghost" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}


