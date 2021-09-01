const endpoints = {
  fetchPartyLineItems: (partyId) =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        console.log(partyId);
        resolve({
          total: 12,
          data: [
            {
              id: 1,
              lineItemNum: 142,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 10,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 9.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 12,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 12,
                },
              ],
            },
            {
              id: 2,
              lineItemNum: 143,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 20,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 19.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 16,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 16,
                },
              ],
            },
            {
              id: 3,
              lineItemNum: 144,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 4,
              lineItemNum: 145,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 5,
              lineItemNum: 146,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 6,
              lineItemNum: 147,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 7,
              lineItemNum: 148,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 8,
              lineItemNum: 149,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 9,
              lineItemNum: 150,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 10,
              lineItemNum: 151,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 11,
              lineItemNum: 152,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
            {
              id: 12,
              lineItemNum: 153,
              htmlPath: "some_path",
              lineItemValues: [
                {
                  id: 1,
                  columnName: "gross kg",
                  value: 26.63,
                },
                {
                  id: 2,
                  columnName: "net kg",
                  value: 24.4,
                },
                {
                  id: 3,
                  columnName: "gross mt",
                  value: 11.64,
                },
                {
                  id: 4,
                  columnName: "net mt",
                  value: 11.64,
                },
              ],
            },
          ],
        });
      }, 1000);
    }),
};

export default endpoints;
