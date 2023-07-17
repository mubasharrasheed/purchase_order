exports.verifyProduct = (product) => {
  try {
    return (
      product["modelNumber"] &&
      Number.isInteger(+product["quantity"]) &&
      product["unitPrice"]
    );
  } catch (error) {
    return false;
  }
};
