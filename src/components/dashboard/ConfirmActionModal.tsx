"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Copy } from "lucide-react";

export interface ConfirmActionModalProps {
  open: boolean;
  type: "delete" | "duplicate";
  projectName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmActionModal({
  open,
  type,
  projectName,
  onClose,
  onConfirm,
}: ConfirmActionModalProps) {
  const isDelete = type === "delete";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md p-6 gap-5 bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl rounded-2xl">
        <div className="flex items-start gap-4">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              isDelete
                ? "bg-destructive/10 text-destructive border border-destructive/20"
                : "bg-primary/10 text-primary border border-primary/20"
            }`}
          >
            {isDelete ? (
              <Trash2 className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </div>

          <div className="space-y-1.5 flex-1 pt-0.5">
            <DialogTitle className="text-base font-semibold text-foreground">
              {isDelete ? "Delete Project" : "Duplicate Project"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              {isDelete ? (
                <>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-foreground">
                    &quot;{projectName}&quot;
                  </span>
                  ? This action cannot be undone and all screens will be permanently removed.
                </>
              ) : (
                <>
                  Are you sure you want to duplicate{" "}
                  <span className="font-semibold text-foreground">
                    &quot;{projectName}&quot;
                  </span>
                  ? A new copy with all its screens and settings will be created.
                </>
              )}
            </DialogDescription>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2 -mx-6 -mb-6 p-4 rounded-b-2xl border-t border-border/50 bg-secondary/30">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={isDelete ? "destructive" : "default"}
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="text-xs font-semibold gap-1.5 shadow-sm"
          >
            {isDelete ? (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                Delete Project
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Duplicate Project
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
