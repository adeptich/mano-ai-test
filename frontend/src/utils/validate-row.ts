export const validateRow = async (row, schema) => {
  try {
    await schema.validate(row);

    const dateOrder = ["Service Date", "Received Date", "Entry Date", "Processed Date", "Paid Date"];
    for (let i = 0; i < dateOrder.length - 1; i++) {
      if (new Date(row[dateOrder[i]]) > new Date(row[dateOrder[i + 1]])) {
        throw new Error(`Incorrect date order: ${dateOrder[i]} > ${dateOrder[i + 1]}`);
      }
    }
    return null;
  } catch (err) {
    return err.message;
  }
};
