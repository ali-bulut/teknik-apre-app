const endpoints = {
  fetchParties: () =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Black/White",
            net_weight_division_num: 1.75,
            gross_weight_addition_num: 0.6,
            template_img:
              "https://image.shutterstock.com/image-vector/barcode-meaning-this-template-stock-260nw-793867024.jpg",
          },
          {
            id: 2,
            name: "Yellow",
            net_weight_division_num: 1.43,
            gross_weight_addition_num: 0.8,
            template_img: "image_url",
          },
          {
            id: 3,
            name: "Red",
            net_weight_division_num: 1.87,
            gross_weight_addition_num: 0.4,
            template_img: "image_url",
          },
        ]);
      }, 1000);
    }),
};

export default endpoints;
