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
  res.headingAndDescription = extract_des(data);
  res.metaInfo = data.metaInfo;
  for(let i = 0; i < data.componentList.length; i++){
    if(data.componentList[i].componentName === 'orderedDetailInfo'){
      // console.log(data.componentList[i].data);
      for(let j =0; j < data.componentList[i].data.length ; j++){
        if(data.componentList[i].data[j].key === 'details'){
          // console.log(data.componentList[i].data[j]);
          res.details = {
            Dimension: data.componentList[i].data[j].data.info[0].data[0].value,
            Color: data.componentList[i].data[j].data.info[0].data[1].value,
            Material: data.componentList[i].data[j].data.info[0].data[3].value,
            Frame: data.componentList[i].data[j].data.info[0].data[4].value,
            Storage: data.componentList[i].data[j].data.info[0].data[5].value,
            SoftnessImage: data.componentList[i].data[j].data.infoWithGraphics[0].image,
            SoftnessText: data.componentList[i].data[j].data.infoWithGraphics[0].text,
            DimensionImage: data.componentList[i].data[j].data.dimensionData.data[0].link
          };
            // console.log(data.componentList[i].data[j].data.info[0].data[0].value);
            // console.log(data.componentList[i].data[j].data.info[0].data[1].value);
            // console.log(data.componentList[i].data[j].data.info[0].data[2].value);
            // console.log(data.componentList[i].data[j].data.info[0].data[3].value);
            // console.log(data.componentList[i].data[j].data.info[0].data[4].value);
            // console.log(data.componentList[i].data[j].data.info[0].data[5].value);
            // console.log("softnessImage",data.componentList[i].data[j].data.infoWithGraphics[0].image);
            // console.log("softnessText",data.componentList[i].data[j].data.infoWithGraphics[0].text);
            // console.log("DimensionImage",data.componentList[i].data[j].data.dimensionData.data[0].link);
        }
        if(data.componentList[i].data[j].key === 'quality'){
            res.quality = data.componentList[i].data[j].data[0].values;
        }
        if(data.componentList[i].data[j].key === 'delivery'){
          res.delivery = data.componentList[i].data[j].data[0].values;
        }
        if(data.componentList[i].data[j].key === 'returns'){
          res.return = data.componentList[i].data[j].data[0].values;
        }
        if(data.componentList[i].data[j].key === 'pricing'){
          res.pricing = data.componentList[i].data[j].data[0].values;
        }
      }
      break;
    }
  }
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

const extract_des = (data) => {
  for (let i = 0; i < data.componentList.length; i++) {
    if (data.componentList[i].componentName === "headingAndDescription") {
      return data.componentList[i].data;
    }
  }
};

const extract_ques = (data) => {
  for (let i = 0; i < data.componentList.length; i++) {
    if (data.componentList[i].componentName === "questionsAboutProduct") {
      return data.componentList[i].data.questionsAndAnswers;
    }
  }
};

const cart_filter = (data) => {
  let res = [];
  for (let i = 0; i < data.cart.products.length; i++) {
    res.push({
      id: data.cart.products[i].id,
      quantity: data.cart.products[i].quantity,
    });
  }
  return res;
};

module.exports = { info_filter, similar_filter, cart_filter };
