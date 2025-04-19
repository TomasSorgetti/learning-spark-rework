"use client";

import { useState, useRef } from "react";

const CodeVerification = ({ length = 6, onComplete, disabled }) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, event) => {
    const { value } = event.target;
    const newValues = [...values];

    if (value.length === 1 || value === "") {
      newValues[index] = value.toUpperCase(); // Convertir a mayúscula si es necesario
      setValues(newValues);
    }

    // Mover al siguiente input si hay un valor
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Llamar a onComplete cuando todos los campos estén llenos
    if (newValues.every((char) => char !== "") && onComplete) {
      onComplete(newValues.join(""));
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");
    const newValues = [...values];

    pasteData.forEach((char, i) => {
      newValues[i] = char.toUpperCase();
    });

    setValues(newValues);

    // Mover el foco al último campo con datos
    const nextIndex = pasteData.length < length ? pasteData.length : length - 1;
    inputsRef.current[nextIndex]?.focus();

    if (newValues.every((char) => char !== "") && onComplete) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          value={value}
          maxLength={1}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-12 h-12 text-center text-xl border border-gray-400 rounded focus:outline-none focus:border-blue-500"
        />
      ))}
    </div>
  );
};

export default CodeVerification;
