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
              template_img: "https://i.hizliresim.com/itfc8ab.png",
            },
            {
              id: 2,
              name: "Yellow",
              net_weight_division_num: 1.43,
              gross_weight_addition_num: 0.8,
              template_img: "https://i.hizliresim.com/itfc8ab.png",
            },
            {
              id: 3,
              name: "Red",
              net_weight_division_num: 1.87,
              gross_weight_addition_num: 0.4,
              template_img: "https://i.hizliresim.com/itfc8ab.png",
            },
          ],
        });
      }, 1000);
    }),

  fetchParty: (id) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(id);
        resolve({
          id: 1,
          name: "Black/White",
          net_weight_division_num: 1.75,
          gross_weight_addition_num: 0.6,
          template_img: "https://i.hizliresim.com/itfc8ab.png",
          mainValues: [
            {
              id: 1, // id in PartyMainValues table
              columnName: "supp",
              value: "FIRATEKS TEKSTİL KONF. SAN.TİC.LTD.ŞTİ",
            },
            {
              id: 2,
              columnName: "order",
              value: "74355-D",
            },
            {
              id: 3,
              columnName: "ref ind",
              value: "V 2021 9698",
            },
            {
              id: 4,
              columnName: "destination",
              value: "105 - WOMAN C.S.",
            },
            {
              id: 5,
              columnName: "col",
              value: "400-BLUE",
            },
            {
              id: 6,
              columnName: "description",
              value: "40510 NEWC",
            },
            {
              id: 7,
              columnName: "comp",
              value: "%34 ACR %34 PES %16 CO %16 VI",
            },
            {
              id: 8,
              columnName: "width",
              value: "150CM",
            },
          ],
          enteredValues: [
            {
              id: 1, // id in TemplateValues table
              columnName: "net mt",
            },
          ],
        });
      }, 1000);
    }),

  updateParty: (data) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(data);
        resolve({
          message: "The party successfully updated!",
        });
      }, 1000);
    }),

  deleteParty: (id) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(id);
        resolve({
          message: "The party successfully deleted!",
        });
      }, 1000);
    }),

  createParty: (data) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(data);
        resolve({
          message: "The party successfully created!",
        });
      }, 1000);
    }),
};

export default endpoints;
