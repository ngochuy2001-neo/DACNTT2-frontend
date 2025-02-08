const getCategoryName = (categoryId: "LT" | "CP") => {
  const categories = {
    LT: "laptop",
    CP: "cellphone",
  };
  return categories[categoryId] || "Unknown category";
};

export default getCategoryName;
