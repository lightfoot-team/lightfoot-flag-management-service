export const variantsToArray = (variants) => {
  const formVariants = [];
  Object.entries(variants).map(variantArray => {
    const key = variantArray[0];
    const value = variantArray[1];
    formVariants.push({key, value});
  })
  return formVariants;
}