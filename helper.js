const info_filter = (data) => {
  const res = {};
  res.id = data.productData.id;
  res.title = data.metaInfo.title;
  res.description = data.metaInfo.description;
  res.condition = data.productData.condition;
  res.slugName = data.productData.slugName;
  res.price = data.productData.Price;
  res.offerPrice = data.productData.offerPrice;
  res.imageLinks = data.productData.imageLinks;
  res.categoryType = data.productData.categoryType;
  res.stockSize = data.productData.stockSize;
  res.availability = data.productData.availability;
  return res;
};

module.exports = info_filter;
