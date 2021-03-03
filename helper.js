const info_filter = (data) => {
  const res = {};
  res.id = data.productData.id;
  res.title = data.metaInfo.title;
  res.description = data.metaInfo.description;
  res.condition = data.productData.condition;
  res.slugName = data.productData.slugName;
  res.price = data.productData.price;
  res.offerPrice = data.productData.offerPrice;
  res.imageLinks = data.productData.imageLinks;
  res.categoryType = data.productData.categoryType;
  res.stockSize = data.productData.stockSize;
  res.availability = data.productData.availability;
  res.name = data.productData.name;
  return res;
};

const similar_filter = (data) => {
  let res = [];
  for (let i = 0; i < data.searchResponse.hits.length; i++) {
    res.push(data.searchResponse.hits[i].id);
  }
  console.log(res);
};

module.exports = { info_filter, similar_filter };
