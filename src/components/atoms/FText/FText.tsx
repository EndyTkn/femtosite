import React from "react";

const types = ["p", "h1", "h2", "h3", "span"]

type FText = {
  className?: string,
  style?: {},
  children?: React.ReactNode,
  type: keyof typeof types;
}

export const FText = () => {
    return (
      <p>
        
      </p>
    )
}