import React from 'react';

function AmountRemaining({ amountRemaining, maxSpending }) {
  // Calculate the percentage of amount spent
  const percentageSpent = ((maxSpending - amountRemaining) / maxSpending) * 100;

  // Determine the color based on the percentage spent
  let color;
  if (percentageSpent === 0) {
    color = 'rgba(0, 255, 0, 0.5)'; // Green for 0%
  } else if (percentageSpent <= 50) {
    const green = Math.floor((255 * percentageSpent) / 50); // Gradually transition to orange
    color = `rgba(${green}, 165, 0, 0.5)`; // Green to orange gradient
  } else {
    const red = Math.floor(255 - (255 * (percentageSpent - 50)) / 50); // Gradually transition to red
    color = `rgba(255, ${red}, 0, 0.5)`; // Orange to red gradient
  }
  

  // Style for the box
  const boxStyle = {
    backgroundColor: color,
    padding: '0.5rem',
    borderRadius: '0.5rem',
  };

  return (
    <div style={boxStyle}>
      Amount Remaining: {amountRemaining}
    </div>
  );
}

export default AmountRemaining;
