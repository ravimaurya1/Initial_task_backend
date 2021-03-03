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
  res.question_ans = extract_ques(data);
  return res;
};

const similar_filter = (data) => {
  let res = [];
  for (let i = 0; i < data.searchResponse.hits.length; i++) {
    res.push({
      id: data.searchResponse.hits[i].id,
      condition: data.searchResponse.hits[i].condition,
      name: data.searchResponse.hits[i].name,
      price: data.searchResponse.hits[i].price,
      offerPrice: data.searchResponse.hits[i].offerPrice,
      imagelink: data.searchResponse.hits[i].imageLinks[0],
    });
  }
  return res;
};

const extract_ques = (data) => {
  for (let i = 0; i < data.componentList.length; i++) {
    if (data.componentList[i].componentName === "questionsAboutProduct") {
      return data.componentList[i].data.questionsAndAnswers;
    }
  }
};

module.exports = { info_filter, similar_filter };
