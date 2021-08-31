const endpoints = {
  fetchParties: (data) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(data);
        resolve({
          total: 3,
          data: [
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
              template_img:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
            },
            {
              id: 3,
              name: "Red",
              net_weight_division_num: 1.87,
              gross_weight_addition_num: 0.4,
              template_img:
                "https://friendofthesea.org/wp-content/uploads/the-test-fun-for-friends-screenshot.png",
            },
          ],
        });
      }, 1000);
    }),
};

export default endpoints;
