const products = [

    // =========================
    // TOPLI NAPICI
    // =========================

    {
        name: "Espresso",
        description: "Espresso kafa",
        price: 190,
        category: "Topli napici",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Espresso sa mlekom",
        description: "Espresso sa mlekom",
        price: 210,
        category: "Topli napici",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Cappuccino",
        description: "Cappuccino kafa",
        price: 210,
        category: "Topli napici",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Nescafe",
        description: "Nescafe",
        price: 235,
        category: "Topli napici",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Latte",
        description: "Latte kafa",
        price: 245,
        category: "Topli napici",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Topla čokolada",
        description: "Topla čokolada",
        price: 255,
        category: "Topli napici",
        countInStock: 50,
        isAvailable: true,
    },

    // =========================
    // SOKOVI
    // =========================

    {
        name: "Coca Cola",
        description: "Coca Cola",
        price: 255,
        category: "Sokovi",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Fanta",
        description: "Fanta",
        price: 255,
        category: "Sokovi",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Sprite",
        description: "Sprite",
        price: 255,
        category: "Sokovi",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Cockta",
        description: "Cockta",
        price: 255,
        category: "Sokovi",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Next Breskva",
        description: "Next Breskva",
        price: 255,
        category: "Sokovi",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Schweppes Tonic",
        description: "Schweppes Tonic",
        price: 255,
        category: "Sokovi",
        countInStock: 50,
        isAvailable: true,
    },

    // =========================
    // PIVO
    // =========================

    {
        name: "Heineken 0.5",
        description: "Heineken 0.5l",
        price: 335,
        category: "Pivo",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Nektar 0.5",
        description: "Nektar 0.5l",
        price: 285,
        category: "Pivo",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Amstel 0.33",
        description: "Amstel 0.33l",
        price: 270,
        category: "Pivo",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Stella Artois",
        description: "Stella Artois",
        price: 395,
        category: "Pivo",
        countInStock: 50,
        isAvailable: true,
    },

    // =========================
    // GIN TONIC
    // =========================

    {
        name: "Gordons Pink",
        description: "Gordons Pink",
        price: 390,
        category: "Gin Tonic",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Classic Gin Tonic",
        description: "Classic Gin Tonic",
        price: 390,
        category: "Gin Tonic",
        countInStock: 50,
        isAvailable: true,
    },
    {
        name: "Tanqueray Premium",
        description: "Tanqueray Premium",
        price: 440,
        category: "Gin Tonic",
        countInStock: 50,
        isAvailable: true,
    },

    // =========================
    // VINO - PODRUM PETROVIĆ
    // =========================

    {
        name: "Sila 0.2l",
        description: "Vino - Podrum Petrović",
        price: 315,
        category: "Podrum Petrović",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Rose 0.2l",
        description: "Vino - Podrum Petrović",
        price: 315,
        category: "Podrum Petrović",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Merlot 0.2l",
        description: "Vino - Podrum Petrović",
        price: 315,
        category: "Podrum Petrović",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Probus 0.2l",
        description: "Vino - Podrum Petrović",
        price: 315,
        category: "Podrum Petrović",
        countInStock: 30,
        isAvailable: true,
    },

    // =========================
    // VINO - PLANTAŽE
    // =========================

    {
        name: "Chardonnay 0.187l",
        description: "Vino - Plantaže",
        price: 395,
        category: "Plantaže",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Rose 0.187l",
        description: "Vino - Plantaže",
        price: 395,
        category: "Plantaže",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Vranac 0.187l",
        description: "Vino - Plantaže",
        price: 395,
        category: "Plantaže",
        countInStock: 30,
        isAvailable: true,
    },

    // =========================
    // SOMERSBY
    // =========================

    {
        name: "Apple 0.33l",
        description: "Somersby Apple",
        price: 385,
        category: "Somersby",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Pear 0.33l",
        description: "Somersby Pear",
        price: 385,
        category: "Somersby",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Mango 0.33l",
        description: "Somersby Mango",
        price: 385,
        category: "Somersby",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Blueberry 0.33l",
        description: "Somersby Blueberry",
        price: 385,
        category: "Somersby",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Raspberry Lime 0.33l",
        description: "Somersby Raspberry Lime",
        price: 385,
        category: "Somersby",
        countInStock: 30,
        isAvailable: true,
    },

    // =========================
    // CEĐENI SOKOVI
    // =========================

    {
        name: "Ceđena narandža",
        description: "Sveže ceđena narandža",
        price: 335,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Ceđeni grejpfrut",
        description: "Sveže ceđeni grejpfrut",
        price: 375,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Ceđena jabuka",
        description: "Sveže ceđena jabuka",
        price: 315,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Ceđena šargarepa",
        description: "Sveže ceđena šargarepa",
        price: 305,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Ceđeni ananas",
        description: "Sveže ceđeni ananas",
        price: 445,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Limunada",
        description: "Sveža limunada",
        price: 235,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Limunada đumbir",
        description: "Limunada sa đumbirom",
        price: 285,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Limunada Monin",
        description: "Limunada sa Monin sirupom",
        price: 315,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Ice Tea Monin",
        description: "Ice Tea sa Monin sirupom",
        price: 325,
        category: "Ceđeni sokovi",
        countInStock: 30,
        isAvailable: true,
    },

    // =========================
    // CEĐENI MIKSEVI
    // =========================

    {
        name: "Vertigo",
        description: "(narandža, šargarepa, jabuka)",
        price: 385,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Vitaminski",
        description: "(narandža, grejpfrut, limun)",
        price: 385,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Rumenko",
        description: "(narandža, ananas, jagoda, višnja)",
        price: 415,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Special",
        description: "(narandža, malina, jabuka, limun)",
        price: 420,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Fitness",
        description: "(narandža, ananas, jabuka)",
        price: 415,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Elixir",
        description: "(narandža, malina, ananas, med)",
        price: 445,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Gvozdenko",
        description: "(narandža, šargarepa, jabuka, cvekla, đumbir)",
        price: 415,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Mix voća",
        description: "(ceđeno po vašoj želji)",
        price: 445,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Citrus koktel 1",
        description: "(narandža, limun)",
        price: 365,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Citrus koktel 2",
        description: "(narandža, grejpfrut)",
        price: 385,
        category: "Ceđeni miksevi",
        countInStock: 30,
        isAvailable: true,
    },

    // =========================
    // DOMAĆI SOKOVI
    // =========================

    {
        name: "Cvekla",
        description: "Domaći sok od cvekle",
        price: 190,
        category: "Domaći sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Višnja",
        description: "Domaći sok od višnje",
        price: 190,
        category: "Domaći sokovi",
        countInStock: 30,
        isAvailable: true,
    },
    {
        name: "Zova",
        description: "Domaći sok od zove",
        price: 190,
        category: "Domaći sokovi",
        countInStock: 30,
        isAvailable: true,
    },

    // =========================
    // DODACI
    // =========================

    {
        name: "Dodatak đumbir",
        description: "Dodatak đumbira",
        price: 85,
        category: "Dodaci",
        countInStock: 30,
        isAvailable: true,
    },
];

export default products;
