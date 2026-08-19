"use client";

import React, { useRef, useEffect, useCallback } from "react";

export interface ColorInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onInput" | "value"> {
  value?: string;
  onColorChange: (color: string) => void;
  onColorCommit?: (color: string) => void;
}

function normalizeHex(val: string | undefined | null): string {
  if (!val) return "#000000";
  const trimmed = val.trim();
  if (trimmed.startsWith("#")) {
    if (trimmed.length === 7) return trimmed;
    if (trimmed.length === 4) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
    }
    if (trimmed.length > 7) {
      return trimmed.slice(0, 7);
    }
  }
  if (trimmed.startsWith("rgb")) {
    const match = trimmed.match(/\d+/g);
    if (match && match.length >= 3) {
      const r = Math.min(255, parseInt(match[0], 10)).toString(16).padStart(2, "0");
      const g = Math.min(255, parseInt(match[1], 10)).toString(16).padStart(2, "0");
      const b = Math.min(255, parseInt(match[2], 10)).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`;
    }
  }
  return "#000000";
}

/**
 * Ultra-smooth, high-performance Color Input.
 * Prevents OS picker jitter and input interruption by isolating user drag operations
 * and scheduling render updates via requestAnimationFrame.
 */
export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  function ColorInput({ value = "#000000", onColorChange, onColorCommit, className, ...props }, ref) {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;
    const isInteractingRef = useRef(false);
    const pendingRafRef = useRef<number | null>(null);
    const lastEmittedColorRef = useRef<string>("");

    const normalizedValue = normalizeHex(value);

    // Keep input element in sync ONLY when the user is NOT actively dragging inside the picker
    useEffect(() => {
      if (inputRef.current && !isInteractingRef.current) {
        if (inputRef.current.value.toLowerCase() !== normalizedValue.toLowerCase()) {
          inputRef.current.value = normalizedValue;
        }
      }
    }, [normalizedValue, inputRef]);

    // Clean up RAF on unmount
    useEffect(() => {
      return () => {
        if (pendingRafRef.current !== null) {
          cancelAnimationFrame(pendingRafRef.current);
        }
      };
    }, []);

    const emitColor = useCallback(
      (color: string, isFinal = false) => {
        if (color.toLowerCase() === lastEmittedColorRef.current.toLowerCase() && !isFinal) return;
        lastEmittedColorRef.current = color;
        onColorChange(color);
        if (isFinal) {
          onColorCommit?.(color);
        }
      },
      [onColorChange, onColorCommit]
    );

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      isInteractingRef.current = true;
      const newColor = (e.target as HTMLInputElement).value;

      if (pendingRafRef.current !== null) {
        cancelAnimationFrame(pendingRafRef.current);
      }

      pendingRafRef.current = requestAnimationFrame(() => {
        emitColor(newColor, false);
        pendingRafRef.current = null;
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (pendingRafRef.current !== null) {
        cancelAnimationFrame(pendingRafRef.current);
        pendingRafRef.current = null;
      }
      isInteractingRef.current = false;
      const finalColor = e.target.value;
      emitColor(finalColor, true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (pendingRafRef.current !== null) {
        cancelAnimationFrame(pendingRafRef.current);
        pendingRafRef.current = null;
      }
      isInteractingRef.current = false;
      emitColor(e.target.value, true);
    };

    return (
      <input
        ref={inputRef}
        type="color"
        defaultValue={normalizedValue}
        onInput={handleInput}
        onChange={handleChange}
        onBlur={handleBlur}
        className={className}
        {...props}
      />
    );
  }
);

