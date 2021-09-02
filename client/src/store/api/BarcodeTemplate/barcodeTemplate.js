const endpoints = {
  fetchTemplatesData: () =>
    new Promise(async function (resolve, reject) {
      setTimeout(() => {
        resolve([
          {
            templateId: 1,
            templateName: "Şablon-1",
            templateDesc: "Varsayılan şablon",
            templateImage: "https://i.hizliresim.com/itfc8ab.png",
            staticTemplateValues: [
              {
                templateValuesId: 1,
                columnName: "supp",
              },
              {
                templateValuesId: 2,
                columnName: "order",
              },
              {
                templateValuesId: 3,
                columnName: "ref ind",
              },
              {
                templateValuesId: 4,
                columnName: "destination",
              },
              {
                templateValuesId: 5,
                columnName: "col",
              },
              {
                templateValuesId: 6,
                columnName: "description",
              },
              {
                templateValuesId: 7,
                columnName: "comp",
              },
              {
                templateValuesId: 8,
                columnName: "width",
              },
            ],
          },
          {
            templateId: 2,
            templateName: "Şablon-2",
            templateDesc: "El ile en girilebilen şablon",
            templateImage: "https://i.hizliresim.com/qxbvncs.png",
            staticTemplateValues: [
              {
                templateValuesId: 21,
                columnName: "tedarikci",
              },
              {
                templateValuesId: 22,
                columnName: "malzeme kodu",
              },
              {
                templateValuesId: 23,
                columnName: "model",
              },
              {
                templateValuesId: 24,
                columnName: "grm",
              },
              {
                templateValuesId: 25,
                columnName: "taha sip. no",
              },
            ],
          },
        ]);
      }, 1000);
    }),
};

export default endpoints;
