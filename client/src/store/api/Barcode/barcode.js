const endpoints = {
  fetchBarcodes: () =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Black/White",
            createdTime: "2021-09-04T16:58:18.353Z",
            netWeightDivisionNum: 1.75,
            grossWeightAdditionNum: 0.6,
            templateImage: "https://i.hizliresim.com/itfc8ab.png",
          },
          {
            id: 2,
            name: "Yellow",
            createdTime: "2021-09-04T16:58:18.353Z",
            netWeightDivisionNum: 1.43,
            grossWeightAdditionNum: 0.8,
            templateImage: "https://i.hizliresim.com/itfc8ab.png",
          },
          {
            id: 3,
            name: "Red",
            createdTime: "2021-09-04T16:58:18.353Z",
            netWeightDivisionNum: 1.87,
            grossWeightAdditionNum: 0.4,
            templateImage: "https://i.hizliresim.com/itfc8ab.png",
          },
        ]);
      }, 1000);
    }),

  fetchBarcode: (id) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(id);
        resolve({
          id: 1,
          name: "Black/White",
          netWeightDivisionNum: 1.75,
          grossWeightAdditionNum: 0.6,
          templateImage: "https://i.hizliresim.com/itfc8ab.png",
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

  updateBarcode: (data) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(data);
        resolve({
          message: "The party successfully updated!",
        });
      }, 1000);
    }),

  deleteBarcode: (id) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(id);
        resolve({
          message: "The party successfully deleted!",
        });
      }, 1000);
    }),

  createBarcode: (data) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(data);
        resolve({
          message: "The party successfully created!",
        });
      }, 1000);
    }),

  fetchBarcodeParties: (barcodeId) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            partyNum: "2985",
            createdTime: "2021-09-04T14:23:34.353Z",
          },
          {
            id: 2,
            partyNum: "2984",
            createdTime: "2021-08-04T07:35:42.353Z",
          },
          {
            id: 3,
            partyNum: "2983",
            createdTime: "2021-07-04T13:51:15.353Z",
          },
        ]);
      }, 1000);
    }),
};

export default endpoints;
