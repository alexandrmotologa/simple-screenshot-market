"use client";

import React, { useRef, useEffect } from "react";

export interface ColorInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onInput" | "value"> {
  value?: string;
  onColorChange: (color: string) => void;
  onColorCommit?: (color: string) => void;
}

/**
 * Ultra-fast, butter-smooth Color Input.
 *
 * Prevents React from clobbering the native browser color picker with controlled `.value` resets
 * during active dragging (which causes extreme mouse stutter/lag in Chromium/Windows).
 * Uses requestAnimationFrame throttling for buttery 60/120 FPS updates.
 */
export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  function ColorInput({ value = "#000000", onColorChange, onColorCommit, className, ...props }, ref) {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;
    const rafRef = useRef<number | null>(null);
    const isInteractingRef = useRef(false);

    // Sync input value only when external value changes and user is NOT actively dragging
    useEffect(() => {
      if (inputRef.current && !isInteractingRef.current) {
        inputRef.current.value = value || "#000000";
      }
    }, [value, inputRef]);

    // Clean up RAF on unmount
    useEffect(() => {
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      isInteractingRef.current = true;
      const newColor = (e.target as HTMLInputElement).value;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        onColorChange(newColor);
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const finalColor = e.target.value;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      onColorChange(finalColor);
      onColorCommit?.(finalColor);
      isInteractingRef.current = false;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      isInteractingRef.current = false;
      onColorCommit?.(e.target.value);
    };

    return (
      <input
        ref={inputRef}
        type="color"
        defaultValue={value || "#000000"}
        onInput={handleInput}
        onChange={handleChange}
        onBlur={handleBlur}
        className={className}
        {...props}
      />
    );
  }
);
