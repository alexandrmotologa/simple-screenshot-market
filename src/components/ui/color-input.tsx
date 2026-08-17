"use client";

import React, { useRef, useEffect } from "react";

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
 * Fast, responsive Color Input.
 * Synchronizes `.value` with incoming props when changed externally while preserving native picker fluidity.
 */
export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  function ColorInput({ value = "#000000", onColorChange, onColorCommit, className, ...props }, ref) {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    const normalizedValue = normalizeHex(value);

    // Keep input element in sync when external prop changes
    useEffect(() => {
      if (inputRef.current) {
        if (inputRef.current.value.toLowerCase() !== normalizedValue.toLowerCase()) {
          inputRef.current.value = normalizedValue;
        }
      }
    }, [normalizedValue, inputRef]);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const newColor = (e.target as HTMLInputElement).value;
      onColorChange(newColor);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const finalColor = e.target.value;
      onColorChange(finalColor);
      onColorCommit?.(finalColor);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onColorCommit?.(e.target.value);
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

