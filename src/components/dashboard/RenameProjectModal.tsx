"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3 } from "lucide-react";

export interface RenameProjectModalProps {
  open: boolean;
  currentName: string;
  onClose: () => void;
  onRename: (newName: string) => void;
}

export function RenameProjectModal({
  open,
  currentName,
  onClose,
  onRename,
}: RenameProjectModalProps) {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && name.trim() !== currentName) {
      onRename(name.trim());
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md p-6 gap-5 bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>

            <div className="space-y-1 flex-1 pt-0.5">
              <DialogTitle className="text-base font-semibold text-foreground">
                Rename Project
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Enter a new descriptive name for your screenshot project.
              </DialogDescription>
            </div>
          </div>

          <div className="pt-1">
            <label className="text-xs font-medium text-foreground block mb-1.5">
              Project Name
            </label>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Finance App Pro - iOS 18"
              className="h-10 text-sm bg-secondary/40 border-border/60 rounded-xl"
            />
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-xl border-border/60 text-xs px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!name.trim()}
              className="rounded-xl text-xs px-5 shadow-sm shadow-primary/20"
            >
              Save Name
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
