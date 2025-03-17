// ... existing code ...

const generateSlots = () => {
    const slots = [];
    const startTime = 10; // 10 AM
    const endTime = 17;   // 5 PM
  
    for (let hour = startTime; hour <= endTime; hour++) {
      if (hour === 13) continue; // Skip lunch break (1 PM - 2 PM)
      
      const hour12 = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format
      const period = hour >= 12 ? 'PM' : 'AM';
  
      // Add :00 slot
      slots.push(`${hour12}:00 ${period}`);
      
      // Add :30 slot if not the last hour (5 PM)
      if (hour < endTime) {
        slots.push(`${hour12}:30 ${period}`);
      }
    }
    return slots;
  };

export default generateSlots;
