const simpleTranslateMock = () => {
  return [
    {
      toTranslate: "Traduza, este, campo, agora",
      notToTranslate: "mg, fs",
    },
    {
      nestedObject: {
        toTranslate: "Arroz, branco, tipo 1, cru",
        notToTranslate: "mg, fs",
      },
    },
    {
      superNestedObject: {
        toTranslate: {
          translateDeep:
          {
            translateDeeper: "Navegando em águas profundas"
          }
        },
      },
    },
  ];
};

module.exports = {
  simpleTranslateMock,
};
