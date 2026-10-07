export interface MoneyChangerLocation {
  id: number;
  name: string;
  postalCode: string | null;
  building: string | null;
  address: string | null;
  businessType: string;
  registrationNumber: string;
  latitude: number;
  longitude: number;
  cluster?: string;
}

export const RAW_MONEY_CHANGERS_GEOJSON = [
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.87167001564892, 1.3387306540844819] },
    properties: {
      OBJECTID_1: 37847,
      NAME: "AL-AMIN TRADING",
      BUSINESS_POSTALCODE: "367803",
      BUSINESS_ADDRESS2: "THE WOODLEIGH MALL",
      BUSINESS_ADDRESS1: "11 BIDADARI PARK DRIVE #B1-21",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "51917300K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.58175180795413, 1.016264254820988] },
    properties: {
      OBJECTID_1: 37848,
      NAME: "CHANGI TRAVEL EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: null,
      BUSINESS_ADDRESS2: "CHANGI AIRPORT",
      BUSINESS_ADDRESS1: "Airport Boulevard Transit",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201933291N"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.86022022911888, 1.2825833648543656] },
    properties: {
      OBJECTID_1: 37849,
      NAME: "MARINA BAY SANDS PTE. LTD.",
      BUSINESS_POSTALCODE: "018971",
      BUSINESS_ADDRESS2: "Marina Bay Sands",
      BUSINESS_ADDRESS1: "10 Bayfront Avenue",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "200507292R"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84655599887638, 1.2888629165868584] },
    properties: {
      OBJECTID_1: 37850,
      NAME: "J L UNION GARMENT ENTERPRISE",
      BUSINESS_POSTALCODE: "59817",
      BUSINESS_ADDRESS2: "THE CENTRAL",
      BUSINESS_ADDRESS1: "6, EU TONG SEN STREET #01-73",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "40030000A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84570322038553, 1.2757356808088909] },
    properties: {
      OBJECTID_1: 37851,
      NAME: "JONG HAP SERVICES & TRADING AGENCY",
      BUSINESS_POSTALCODE: "79903",
      BUSINESS_ADDRESS2: "International Plaza",
      BUSINESS_ADDRESS1: "10 Anson Road #30-05",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52889076W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84757946862574, 1.3697679279911108] },
    properties: {
      OBJECTID_1: 37852,
      NAME: "KOVICS TRADING SPORE PTE LTD",
      BUSINESS_POSTALCODE: "560702",
      BUSINESS_ADDRESS2: "#01-2525 LOT B",
      BUSINESS_ADDRESS1: "702 ANG MO KIO AVENUE 8",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "198602426C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37853,
      NAME: "MAXI MONEY EXCHANGE",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY, THE ARCADE #02-23A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53401313M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37854,
      NAME: "MIJ MONEY CHANGER",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY #02-09",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "21269500B"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37855,
      NAME: "MOHAMED THAHIR EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 Collyer Quay #02-08",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201812997E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37856,
      NAME: "MONEY MATTERS FOREIGN EXCHANGE",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11, COLLYER QUAY #02-33",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53046930L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84570322038553, 1.2757356808088909] },
    properties: {
      OBJECTID_1: 37857,
      NAME: "MUSFIRAH TRADING",
      BUSINESS_POSTALCODE: "79903",
      BUSINESS_ADDRESS2: "International Plaza",
      BUSINESS_ADDRESS1: "10 ANSON ROAD #01-77",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52932058D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37858,
      NAME: "MYDEEN ENTERPRISE",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY #02-31B",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53112354E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84239316713204, 1.275154969377929] },
    properties: {
      OBJECTID_1: 37859,
      NAME: "PERFECT 1 EXCHANGE",
      BUSINESS_POSTALCODE: "82001",
      BUSINESS_ADDRESS2: "Tanjong Pagar Plaza",
      BUSINESS_ADDRESS1: "1 TANJONG PAGAR PLAZA #02-02",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53042571L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.86046297029483, 1.2661827412954823] },
    properties: {
      OBJECTID_1: 37860,
      NAME: "RAHIMAN TRADING",
      BUSINESS_POSTALCODE: "18947",
      BUSINESS_ADDRESS2: "Marina South Pier",
      BUSINESS_ADDRESS1: "61 MARINA COASTAL DRIVE #02-06",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52881641A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.8600472650484, 1.2907183025900528] },
    properties: {
      OBJECTID_1: 37861,
      NAME: "RCMS PROPERTIES PRIVATE LIMITED",
      BUSINESS_POSTALCODE: "39799",
      BUSINESS_ADDRESS2: "Marina Square",
      BUSINESS_ADDRESS1: "7 Raffles Avenue",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "199701864C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84385200272824, 1.2854952698022815] },
    properties: {
      OBJECTID_1: 37862,
      NAME: "RIGHT ANGEL EXCHANGE",
      BUSINESS_POSTALCODE: "58357",
      BUSINESS_ADDRESS2: "People's Park Centre",
      BUSINESS_ADDRESS1: "101 Upper Cross Street #01-36A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52990035A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.82158925490758, 1.263895802318296] },
    properties: {
      OBJECTID_1: 37863,
      NAME: "RISING MONEY EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "98585",
      BUSINESS_ADDRESS2: "VivoCity",
      BUSINESS_ADDRESS1: "1 HARBOURFRONT WALK #02-171",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201607936N"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85270960180071, 1.3049592395931202] },
    properties: {
      OBJECTID_1: 37864,
      NAME: "ROBINSON EXCHANGE",
      BUSINESS_POSTALCODE: "208418",
      BUSINESS_ADDRESS2: "Little India",
      BUSINESS_ADDRESS1: "23 MADRAS STREET",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52826166E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84965480002276, 1.2799219620623596] },
    properties: {
      OBJECTID_1: 37865,
      NAME: "PHOENIX 35 PTE. LTD.",
      BUSINESS_POSTALCODE: "68876",
      BUSINESS_ADDRESS2: "HOTEL TELEGRAPH",
      BUSINESS_ADDRESS1: "35 ROBINSON ROAD #01-01",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "200411355H"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85091447556259, 1.281363595437285] },
    properties: {
      OBJECTID_1: 37866,
      NAME: "SAIF MONEY CHANGER",
      BUSINESS_POSTALCODE: "48581",
      BUSINESS_ADDRESS2: "HONG LEONG BUILDING",
      BUSINESS_ADDRESS1: "16 RAFFLES QUAY #B1-05",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52809180L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37867,
      NAME: "SARMUS EXCHANGE & TRADING",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY, #03-09, THE ARCADE",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53258271C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37868,
      NAME: "SHARA EXCHANGE",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 Collyer Quay #02-30",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53343251X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.81945896047802, 1.2565734861059097] },
    properties: {
      OBJECTID_1: 37869,
      NAME: "SHEEN INTERNATIONAL EXCHANGE",
      BUSINESS_POSTALCODE: "98138",
      BUSINESS_ADDRESS2: "Resorts World Sentosa",
      BUSINESS_ADDRESS1: "26 Sentosa Gateway Unit No. B1-K54 (Inside Casino)",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52901525X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85700734100752, 1.2914552590652084] },
    properties: {
      OBJECTID_1: 37870,
      NAME: "SILVER RIVER MONEY CHANGER",
      BUSINESS_POSTALCODE: "39594",
      BUSINESS_ADDRESS2: "Marina Square",
      BUSINESS_ADDRESS1: "6 Raffles Boulevard #02-260",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "44341100W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84251997356273, 1.2841339715698454] },
    properties: {
      OBJECTID_1: 37871,
      NAME: "SIRAJUDIN MONEY CHANGER",
      BUSINESS_POSTALCODE: "59108",
      BUSINESS_ADDRESS2: "PEOPLE'S PARK COMPLEX",
      BUSINESS_ADDRESS1: "1 PARK ROAD #01-K96A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52929764K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37872,
      NAME: "TIME EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "THE ARCADE",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY #02-22",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201216826N"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84385200272824, 1.2854952698022815] },
    properties: {
      OBJECTID_1: 37873,
      NAME: "TODAY'S MONEY EXCHANGE",
      BUSINESS_POSTALCODE: "58357",
      BUSINESS_ADDRESS2: "People's Park Centre",
      BUSINESS_ADDRESS1: "101 Upper Cross Street #01-16A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52978725C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84239316713204, 1.275154969377929] },
    properties: {
      OBJECTID_1: 37874,
      NAME: "V.I.P. EXCHANGE",
      BUSINESS_POSTALCODE: "82001",
      BUSINESS_ADDRESS2: "Tanjong Pagar Plaza",
      BUSINESS_ADDRESS1: "1 Tanjong Pagar Plaza #01-01",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52925694X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84840863744311, 1.276980700075543] },
    properties: {
      OBJECTID_1: 37875,
      NAME: "VICTORIA GLORY PTE. LTD.",
      BUSINESS_POSTALCODE: "68809",
      BUSINESS_ADDRESS2: "OUE Downtown",
      BUSINESS_ADDRESS1: "6 Shenton Way #25-08",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201222857R"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37876,
      NAME: "VIVA GIFT SHOP",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "THE ARCADE",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY #02-23",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53029217C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37877,
      NAME: "VS EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 Collyer Quay 01-19A, The Arcade",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201215060G"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85244233643866, 1.2970998336093873] },
    properties: {
      OBJECTID_1: 37878,
      NAME: "ZELIFRASINAH MART",
      BUSINESS_POSTALCODE: "188017",
      BUSINESS_ADDRESS2: "Bugis",
      BUSINESS_ADDRESS1: "89 VICTORIA STREET #01-01",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52912420C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37879,
      NAME: "PACIFIC EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY #02-05",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "202005880H"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37880,
      NAME: "ISLAND MONEY EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY #02-30",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "202015089H"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85098235178121, 1.2843399348569515] },
    properties: {
      OBJECTID_1: 37881,
      NAME: "TRAVELEX HOLDINGS (S) PTE LTD",
      BUSINESS_POSTALCODE: "48616",
      BUSINESS_ADDRESS2: "One Raffles Place, Tower 1",
      BUSINESS_ADDRESS1: "1 Raffles Place #B1-41",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "197902968M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37882,
      NAME: "NIJAM EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 Collyer Quay #01-20 The Arcade",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "202014901N"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83366493962298, 1.30724674254066] },
    properties: {
      OBJECTID_1: 37884,
      NAME: "SHENTON 2000 EXCHANGE",
      BUSINESS_POSTALCODE: "228213",
      BUSINESS_ADDRESS2: "FAR EAST PLAZA",
      BUSINESS_ADDRESS1: "14 SCOTTS ROAD #02-42",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52912735X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.74697405732326, 1.3977813910743728] },
    properties: {
      OBJECTID_1: 37885,
      NAME: "SHENTON MONEY EXCHANGER PTE. LTD.",
      BUSINESS_POSTALCODE: "680624",
      BUSINESS_ADDRESS2: "YEW TEE SQUARE",
      BUSINESS_ADDRESS1: "624 CHOA CHU KANG STREET 62 #01-240",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201100898E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.8803681184683, 1.3125026850741959] },
    properties: {
      OBJECTID_1: 37886,
      NAME: "SIA EXCHANGE",
      BUSINESS_POSTALCODE: "389365",
      BUSINESS_ADDRESS2: "Geylang",
      BUSINESS_ADDRESS1: "340 GEYLANG ROAD, #01 - 08 LE REGAL",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53122029W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.7785604701992, 1.338656769130609] },
    properties: {
      OBJECTID_1: 37887,
      NAME: "SIGNORAA MONEY EXCHANGE",
      BUSINESS_POSTALCODE: "588996",
      BUSINESS_ADDRESS2: "BUKIT TIMAH PLAZA",
      BUSINESS_ADDRESS1: "1 JALAN ANAK BUKIT #B1-04",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53367374K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85287562482365, 1.3030229825803135] },
    properties: {
      OBJECTID_1: 37888,
      NAME: "SIMLIM EXCHANGE & TRADING",
      BUSINESS_POSTALCODE: "188504",
      BUSINESS_ADDRESS2: "Sim Lim Tower",
      BUSINESS_ADDRESS1: "1 Rochor Canal Road #01-32",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "09135500A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84365677090855, 1.320210999738189] },
    properties: {
      OBJECTID_1: 37889,
      NAME: "12 HRS MONEY EXCHANGER",
      BUSINESS_POSTALCODE: "307683",
      BUSINESS_ADDRESS2: "Novena Square",
      BUSINESS_ADDRESS1: "238 Thomson Road, #01-70A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52958363A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.92999592298462, 1.326359091509561] },
    properties: {
      OBJECTID_1: 37890,
      NAME: "GREEN POINT MONEY EXCHANGE",
      BUSINESS_POSTALCODE: "460204",
      BUSINESS_ADDRESS2: "Bedok North",
      BUSINESS_ADDRESS1: "204 Bedok North Street 1 #01-415",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "49077100M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85537045645289, 1.3095922959097883] },
    properties: {
      OBJECTID_1: 37891,
      NAME: "S ABDUL HAMID",
      BUSINESS_POSTALCODE: "207674",
      BUSINESS_ADDRESS2: "Mustafa / Syed Alwi",
      BUSINESS_ADDRESS1: "98 Syed Alwi Road",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "05905800E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85076323101212, 1.2989439179329079] },
    properties: {
      OBJECTID_1: 37892,
      NAME: "TOP XCHANGE",
      BUSINESS_POSTALCODE: "189627",
      BUSINESS_ADDRESS2: "V Hotel Bencoolen",
      BUSINESS_ADDRESS1: "48 Bencoolen Street #01-04",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53042893L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.89340032917578, 1.3149572963793417] },
    properties: {
      OBJECTID_1: 37893,
      NAME: "HUMAYUN'S MONEY CHANGER",
      BUSINESS_POSTALCODE: "409286",
      BUSINESS_ADDRESS2: "City Plaza",
      BUSINESS_ADDRESS1: "810 Geylang Road #01-59",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "38477100M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.93106883567769, 1.3246357260647132] },
    properties: {
      OBJECTID_1: 37894,
      NAME: "UNIQUE MONEY CHANGER",
      BUSINESS_POSTALCODE: "460209",
      BUSINESS_ADDRESS2: "Bedok Central",
      BUSINESS_ADDRESS1: "209 New Upper Changi Road #01-K1",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "45544700D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85406834772077, 1.2950974033827851] },
    properties: {
      OBJECTID_1: 37895,
      NAME: "BEACH ROAD HOTEL (1886) LTD.",
      BUSINESS_POSTALCODE: "189673",
      BUSINESS_ADDRESS2: "Raffles Hotel",
      BUSINESS_ADDRESS1: "1 Beach Road",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "198804129K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.7639618526176, 1.3805173281591359] },
    properties: {
      OBJECTID_1: 37896,
      NAME: "RIYAZ EXCHANGE TRADING",
      BUSINESS_POSTALCODE: "677743",
      BUSINESS_ADDRESS2: "Bukit Panjang Plaza",
      BUSINESS_ADDRESS1: "1 Jelebu Road #02-K4",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52896050D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.74413912177342, 1.385672711025132] },
    properties: {
      OBJECTID_1: 37897,
      NAME: "TRADEX 19",
      BUSINESS_POSTALCODE: "689810",
      BUSINESS_ADDRESS2: "Choa Chu Kang MRT Station",
      BUSINESS_ADDRESS1: "10 Choa Chu Kang Ave 4 #01-26",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53126953A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.86026674695145, 1.305713227038106] },
    properties: {
      OBJECTID_1: 37899,
      NAME: "REGENT MONEY CHANGER PTE LTD",
      BUSINESS_POSTALCODE: "199020",
      BUSINESS_ADDRESS2: "HOTEL BOSS",
      BUSINESS_ADDRESS1: "500 JALAN SULTAN HOTEL BOSS #01-12",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "199001641H"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.89837617533459, 1.3158590534343182] },
    properties: {
      OBJECTID_1: 37900,
      NAME: "RESHONG CORPORATION PRIVATE LIMITED",
      BUSINESS_POSTALCODE: "420001",
      BUSINESS_ADDRESS2: "Joo Chiat Complex",
      BUSINESS_ADDRESS1: "1 Joo Chiat Road, #01-1005",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "197400717W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.87170454944983, 1.3504381717743235] },
    properties: {
      OBJECTID_1: 37901,
      NAME: "THOMSON MONEY EXCHANGE",
      BUSINESS_POSTALCODE: "556083",
      BUSINESS_ADDRESS2: "NEX",
      BUSINESS_ADDRESS1: "23 Serangoon Central #03-34",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52834103X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84967772147336, 1.3325900008755498] },
    properties: {
      OBJECTID_1: 37902,
      NAME: "TOA PAYOH CENTRAL GOLD HALL",
      BUSINESS_POSTALCODE: "310184",
      BUSINESS_ADDRESS2: "Toa Payoh Central",
      BUSINESS_ADDRESS1: "184 Toa Payoh Central #01-350",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "37613300K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85104616912297, 1.3003476166746732] },
    properties: {
      OBJECTID_1: 37904,
      NAME: "SHAN GEMS",
      BUSINESS_POSTALCODE: "189652",
      BUSINESS_ADDRESS2: "SUNSHINE PLAZA",
      BUSINESS_ADDRESS1: "91 BENCOOLEN STREET #01-66",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "39584100C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37905,
      NAME: "FAJAR STORE",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "Lucky Plaza",
      BUSINESS_ADDRESS1: "304 ORCHARD ROAD #01-81",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "50643900C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85512825230944, 1.310893553988666] },
    properties: {
      OBJECTID_1: 37906,
      NAME: "CHANGI MONEY CHANGER (S) PTE. LTD.",
      BUSINESS_POSTALCODE: "218108",
      BUSINESS_ADDRESS2: "CENTRIUM SQUARE",
      BUSINESS_ADDRESS1: "320 SERANGOON ROAD #01-16",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201527726E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.82385280098454, 1.3048434322131555] },
    properties: {
      OBJECTID_1: 37907,
      NAME: "CLASSIC EXCHANGE",
      BUSINESS_POSTALCODE: "247933",
      BUSINESS_ADDRESS2: "Tanglin Mall",
      BUSINESS_ADDRESS1: "163 Tanglin Road #B1-109",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52822051M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85276833238656, 1.2937602787541802] },
    properties: {
      OBJECTID_1: 37908,
      NAME: "CLIFFORD GEMS & MONEY EXCHANGE",
      BUSINESS_POSTALCODE: "179103",
      BUSINESS_ADDRESS2: "RAFFLES CITY SHOPPING CENTRE",
      BUSINESS_ADDRESS1: "252, NORTH BRIDGE ROAD, #B2 -08",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "51927300A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.89498003255373, 1.3920941501822675] },
    properties: {
      OBJECTID_1: 37909,
      NAME: "COMPASS FOREIGN EXCHANGE",
      BUSINESS_POSTALCODE: "545078",
      BUSINESS_ADDRESS2: "Compass One",
      BUSINESS_ADDRESS1: "1 Sengkang Square #04-12",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52975690X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84072634287729, 1.3020026251274257] },
    properties: {
      OBJECTID_1: 37910,
      NAME: "CUPPAGE MONEY CHANGER",
      BUSINESS_POSTALCODE: "228796",
      BUSINESS_ADDRESS2: "CUPPAGE PLAZA",
      BUSINESS_ADDRESS1: "5 KOEK ROAD #01-06",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "41597500W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85766895477317, 1.3019281275159114] },
    properties: {
      OBJECTID_1: 37911,
      NAME: "CURRENCY EXCHANGE",
      BUSINESS_POSTALCODE: "188061",
      BUSINESS_ADDRESS2: "THE GOLDEN LANDMARK",
      BUSINESS_ADDRESS1: "390 VICTORIA STREET #03-51",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53339251M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83768435842345, 1.3013850949010322] },
    properties: {
      OBJECTID_1: 37912,
      NAME: "DEEN EXCHANGE",
      BUSINESS_POSTALCODE: "238895",
      BUSINESS_ADDRESS2: "313@Somerset",
      BUSINESS_ADDRESS1: "313 Orchard Road #01-31",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52886604D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.86141291924643, 1.3036243545275341] },
    properties: {
      OBJECTID_1: 37913,
      NAME: "DOULATH ENTERPRISE",
      BUSINESS_POSTALCODE: "199018",
      BUSINESS_ADDRESS2: "TEXTILE CENTRE",
      BUSINESS_ADDRESS1: "200 JALAN SULTAN #01-K1",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "22278100M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.8542771649708, 1.3045132394948789] },
    properties: {
      OBJECTID_1: 37914,
      NAME: "ELITE EXCHANGE PRIVATE LIMITED",
      BUSINESS_POSTALCODE: "209340",
      BUSINESS_ADDRESS2: "Little India",
      BUSINESS_ADDRESS1: "10 Dunlop Street",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201535418R"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85143882517806, 1.3051222174520205] },
    properties: {
      OBJECTID_1: 37916,
      NAME: "EVERBRIGHT MONEY CHANGER",
      BUSINESS_POSTALCODE: "218227",
      BUSINESS_ADDRESS2: "Tekka Place",
      BUSINESS_ADDRESS1: "2 Serangoon road #01-18",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52900448L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84944198141238, 1.3006510228753758] },
    properties: {
      OBJECTID_1: 37917,
      NAME: "R T NATHAN DRUG STORE",
      BUSINESS_POSTALCODE: "188307",
      BUSINESS_ADDRESS2: "PARKLANE SHOPPING MALL",
      BUSINESS_ADDRESS1: "35 SELEGIE ROAD, #01-15A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "30534700D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.89366161203019, 1.3723118564295858] },
    properties: {
      OBJECTID_1: 37918,
      NAME: "M.S. MONEY EXCHANGE",
      BUSINESS_POSTALCODE: "538766",
      BUSINESS_ADDRESS2: "HOUGANG MALL",
      BUSINESS_ADDRESS1: "90 HOUGANG AVENUE 10, #B1-17",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53409260L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.9535864932572, 1.3522623053046297] },
    properties: {
      OBJECTID_1: 37919,
      NAME: "HN MILLENNIUM FOREIGN EXCHANGE",
      BUSINESS_POSTALCODE: "524201",
      BUSINESS_ADDRESS2: "Tampines",
      BUSINESS_ADDRESS1: "Blk 201D, Tampines Street 21 #01-1111",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53465984E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.9449587042453, 1.353547423242533] },
    properties: {
      OBJECTID_1: 37920,
      NAME: "REGAL ENTERPRISE",
      BUSINESS_POSTALCODE: "529538",
      BUSINESS_ADDRESS2: "TAMPINES MRT STATION",
      BUSINESS_ADDRESS1: "20 TAMPINES CENTRAL 1 #01-21",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53465241K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85242120072131, 1.3058026134562022] },
    properties: {
      OBJECTID_1: 37921,
      NAME: "MONEY EXCHANGE HUB",
      BUSINESS_POSTALCODE: "209451",
      BUSINESS_ADDRESS2: "Little India",
      BUSINESS_ADDRESS1: "133 DUNLOP STREET",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53371065X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85208898319442, 1.3062290781955888] },
    properties: {
      OBJECTID_1: 37923,
      NAME: "SANGAM EXCHANGE",
      BUSINESS_POSTALCODE: "209458",
      BUSINESS_ADDRESS2: "Little India",
      BUSINESS_ADDRESS1: "140 Dunlop Street",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52984221A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.80112695004563, 1.2736765775460277] },
    properties: {
      OBJECTID_1: 37925,
      NAME: "ROHAIL EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "119963",
      BUSINESS_ADDRESS2: "mTower",
      BUSINESS_ADDRESS1: "460 ALEXANDRA ROAD #01-18A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201804311E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.7408911256337, 1.3319948684935523] },
    properties: {
      OBJECTID_1: 37926,
      NAME: "ROSEMIN STORE",
      BUSINESS_POSTALCODE: "608513",
      BUSINESS_ADDRESS2: "Jurong East Bus Interchange",
      BUSINESS_ADDRESS1: "17A JURONG GATEWAY ROAD #01-15",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "36318000A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85276833238656, 1.2937602787541802] },
    properties: {
      OBJECTID_1: 37927,
      NAME: "SAJ EXCHANGE",
      BUSINESS_POSTALCODE: "179103",
      BUSINESS_ADDRESS2: "RAFFLES CITY SHOPPING CENTRE",
      BUSINESS_ADDRESS1: "252 NORTH BRIDGE ROAD #B1-97",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "21146700J"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.89255060712385, 1.3186757503744997] },
    properties: {
      OBJECTID_1: 37928,
      NAME: "SALVA'S FOREIGN EXCHANGE",
      BUSINESS_POSTALCODE: "409051",
      BUSINESS_ADDRESS2: "Paya Lebar Square",
      BUSINESS_ADDRESS1: "Paya lebar square #B1-27",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52980268J"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37929,
      NAME: "SAPPHIRE EXCHANGE",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "Lucky Plaza",
      BUSINESS_ADDRESS1: "304 Orchard Road #B1-74",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52961961W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85334261159042, 1.3016323155403393] },
    properties: {
      OBJECTID_1: 37931,
      NAME: "SHAFEEK EXCHANGE",
      BUSINESS_POSTALCODE: "189646",
      BUSINESS_ADDRESS2: "THE BENCOOLEN",
      BUSINESS_ADDRESS1: "180 BENCOOLEN STREET #01-42",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52946335X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84115015224798, 1.3012572925097545] },
    properties: {
      OBJECTID_1: 37932,
      NAME: "SHAMIHA MONEY CHANGER",
      BUSINESS_POSTALCODE: "238841",
      BUSINESS_ADDRESS2: "ORCHARD PLAZA",
      BUSINESS_ADDRESS1: "150 ORCHARD ROAD #01-41",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52801623K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85766895477317, 1.3019281275159114] },
    properties: {
      OBJECTID_1: 37934,
      NAME: "PIONEER EXCHANGE",
      BUSINESS_POSTALCODE: "188061",
      BUSINESS_ADDRESS2: "Village Hotel Bugis",
      BUSINESS_ADDRESS1: "390 victoria street #01-64",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52855421B"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.94445809392462, 1.354801078466758] },
    properties: {
      OBJECTID_1: 37935,
      NAME: "YES! XCHANGE",
      BUSINESS_POSTALCODE: "520510",
      BUSINESS_ADDRESS2: "Tampines Central",
      BUSINESS_ADDRESS1: "510 TAMPINES CENTRAL 1 #01-250D",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53356026L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.76274117629025, 1.3783497126086577] },
    properties: {
      OBJECTID_1: 37936,
      NAME: "YUEN LAI MONEY CHANGER",
      BUSINESS_POSTALCODE: "678278",
      BUSINESS_ADDRESS2: "Hillion Mall",
      BUSINESS_ADDRESS1: "17 Petir Road #01-24",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "20438200M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83366493962298, 1.30724674254066] },
    properties: {
      OBJECTID_1: 37937,
      NAME: "YUNOS MONEY CHANGER & TRADING",
      BUSINESS_POSTALCODE: "228213",
      BUSINESS_ADDRESS2: "FAR EAST PLAZA",
      BUSINESS_ADDRESS1: "14 SCOTTS ROAD #03-110",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52853379K"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84796542521939, 1.3329756209903534] },
    properties: {
      OBJECTID_1: 37938,
      NAME: "ZEROEX PTE. LTD.",
      BUSINESS_POSTALCODE: "310190",
      BUSINESS_ADDRESS2: "Toa Payoh Central",
      BUSINESS_ADDRESS1: "190 TOA PAYOH LOR 6 #01-510",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201942326R"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37940,
      NAME: "RADS EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "Lucky Plaza",
      BUSINESS_ADDRESS1: "304 ORCHARD RD #B1-87",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "200600177Z"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.79535044546057, 1.3102554162884705] },
    properties: {
      OBJECTID_1: 37941,
      NAME: "RAHIM MONEY CHANGER",
      BUSINESS_POSTALCODE: "278967",
      BUSINESS_ADDRESS2: "Holland Road Shopping Centre",
      BUSINESS_ADDRESS1: "211 Holland Avenue #01-K4",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "35329400D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.94971570233616, 1.3724498161424086] },
    properties: {
      OBJECTID_1: 37942,
      NAME: "RAHIM TRADERS",
      BUSINESS_POSTALCODE: "518457",
      BUSINESS_ADDRESS2: "White Sands",
      BUSINESS_ADDRESS1: "1 Pasir Ris Central St 3 #04-20",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "41915000E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.7797468685052, 1.4335125289823105] },
    properties: {
      OBJECTID_1: 37944,
      NAME: "SINEO ENTERPRISES PTE LTD",
      BUSINESS_POSTALCODE: "738623",
      BUSINESS_ADDRESS2: "Marsiling Mall",
      BUSINESS_ADDRESS1: "4 Woodlands Street 12 #02-54",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "199608776M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.88753083747318, 1.333722104638767] },
    properties: {
      OBJECTID_1: 37945,
      NAME: "SINGA EXCHANGE PRIVATE LIMITED",
      BUSINESS_POSTALCODE: "368242",
      BUSINESS_ADDRESS2: "MacPherson",
      BUSINESS_ADDRESS1: "601 MACPHERSON ROAD #01-05",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "199607205D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85455042299266, 1.310415661041673] },
    properties: {
      OBJECTID_1: 37946,
      NAME: "SIRADJ EXCHANGE",
      BUSINESS_POSTALCODE: "218106",
      BUSINESS_ADDRESS2: "Little India",
      BUSINESS_ADDRESS1: "278 SERANGOON ROAD",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "46425600C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.74902198003052, 1.3501891598296667] },
    properties: {
      OBJECTID_1: 37947,
      NAME: "STRAITS FOREIGN EXCHANGE",
      BUSINESS_POSTALCODE: "658713",
      BUSINESS_ADDRESS2: "WEST MALL",
      BUSINESS_ADDRESS1: "1 BUKIT BATOK CENTRAL LINK #01-05",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53125956X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.82911575357532, 1.3069967065631414] },
    properties: {
      OBJECTID_1: 37948,
      NAME: "SULTAN ENTERPRISE",
      BUSINESS_POSTALCODE: "238875",
      BUSINESS_ADDRESS2: "ORCHARD TOWERS",
      BUSINESS_ADDRESS1: "400 ORCHARD ROAD , #01-23",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "24721600C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.74317043629249, 1.333200210383313] },
    properties: {
      OBJECTID_1: 37949,
      NAME: "SWIFT EXCHANGE",
      BUSINESS_POSTALCODE: "608549",
      BUSINESS_ADDRESS2: "JEM / Jurong Gateway",
      BUSINESS_ADDRESS1: "50 JURONG GATEWAY ROAD #B1-05A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53202561W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37950,
      NAME: "$&C XCHANGE CENTRE",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "Lucky Plaza",
      BUSINESS_ADDRESS1: "304 orchard road #01-51",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53367237J"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.70535100057792, 1.3393150339641708] },
    properties: {
      OBJECTID_1: 37951,
      NAME: "GREAT EXCHANGE & TRADING",
      BUSINESS_POSTALCODE: "648331",
      BUSINESS_ADDRESS2: "JURONG POINT",
      BUSINESS_ADDRESS1: "63 JURONG WEST CENTRAL 3 #03-70",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53379066B"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85061261364913, 1.29222075715172] },
    properties: {
      OBJECTID_1: 37952,
      NAME: "GREAT STAR EXCHANGE",
      BUSINESS_POSTALCODE: "179098",
      BUSINESS_ADDRESS2: "Peninsula Plaza",
      BUSINESS_ADDRESS1: "111 NORTH BRIDGE ROAD #02-51",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52985933E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37954,
      NAME: "JAMSERAH JAS MONEY CHANGER",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "LUCKY PLAZA",
      BUSINESS_ADDRESS1: "304 ORCHARD ROAD #01-34",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52885867W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37955,
      NAME: "K S S N FOREIGN EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "LUCKY PLAZA",
      BUSINESS_ADDRESS1: "304 Orchard Road #B1-53",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201129221R"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.77463656093701, 1.4299299122731672] },
    properties: {
      OBJECTID_1: 37956,
      NAME: "KOK WEE SIN TEXTILES & GARMENTS",
      BUSINESS_POSTALCODE: "730306",
      BUSINESS_ADDRESS2: "Woodlands",
      BUSINESS_ADDRESS1: "306 woodlands Street 31 #01-45B",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "20685700D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83366493962298, 1.30724674254066] },
    properties: {
      OBJECTID_1: 37958,
      NAME: "LION CITY STORE",
      BUSINESS_POSTALCODE: "228213",
      BUSINESS_ADDRESS2: "FAR EAST PLAZA",
      BUSINESS_ADDRESS1: "14 SCOTTS ROAD #03-68A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "06507200J"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.92918207824476, 1.3247936071073885] },
    properties: {
      OBJECTID_1: 37959,
      NAME: "M M ISMAIL AND CO",
      BUSINESS_POSTALCODE: "467360",
      BUSINESS_ADDRESS2: "BEDOK MALL",
      BUSINESS_ADDRESS1: "311 NEW UPPER CHANGI RD #02-01A",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "08801300J"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.87606765768867, 1.3913930581561316] },
    properties: {
      OBJECTID_1: 37960,
      NAME: "NALLUR STORE",
      BUSINESS_POSTALCODE: "797653",
      BUSINESS_ADDRESS2: "THE SELETAR MALL",
      BUSINESS_ADDRESS1: "33 SENGKANG WEST AVENUE #B1-12",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "23723200J"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37961,
      NAME: "AL NISAR TRADERS",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "LUCKY PLAZA",
      BUSINESS_ADDRESS1: "304 ORCHARD ROAD #B1-50",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53477443A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37963,
      NAME: "AZEEZ MONEY CHANGERS",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "Lucky Plaza",
      BUSINESS_ADDRESS1: "304 ORCHARD ROAD, #B1-09",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "44036300D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85168285318731, 1.306578201261106] },
    properties: {
      OBJECTID_1: 37964,
      NAME: "BABY MONEY CHANGERS",
      BUSINESS_POSTALCODE: "217984",
      BUSINESS_ADDRESS2: "Little India",
      BUSINESS_ADDRESS1: "79 SERANGOON ROAD",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53378514J"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.83394193781635, 1.3044857910326735] },
    properties: {
      OBJECTID_1: 37965,
      NAME: "NEWSCREST EXCHANGE",
      BUSINESS_POSTALCODE: "238863",
      BUSINESS_ADDRESS2: "Lucky Plaza",
      BUSINESS_ADDRESS1: "304 ORCHARD ROAD #B1-12",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53154526A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84389213140564, 1.3204296614524813] },
    properties: {
      OBJECTID_1: 37967,
      NAME: "ALIZIA GIFT HOUSE",
      BUSINESS_POSTALCODE: "307506",
      BUSINESS_ADDRESS2: "Square 2",
      BUSINESS_ADDRESS1: "10 Sinaran Drive, #01-131",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52849402C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84914301658542, 1.2900727917847692] },
    properties: {
      OBJECTID_1: 37970,
      NAME: "ANNESHAH TRADING",
      BUSINESS_POSTALCODE: "179094",
      BUSINESS_ADDRESS2: "High Street Centre",
      BUSINESS_ADDRESS1: "No 1. North Bridge Road, #01-53",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "34726000D"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84703025161552, 1.3322120451959552] },
    properties: {
      OBJECTID_1: 37972,
      NAME: "ASMART EXCHANGE",
      BUSINESS_POSTALCODE: "310530",
      BUSINESS_ADDRESS2: "HDB HUB",
      BUSINESS_ADDRESS1: "530 LORONG 6 TOA PAYOH #01-13",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53365512M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.76480997039414, 1.3136156728975943] },
    properties: {
      OBJECTID_1: 37973,
      NAME: "ATLAS EXCHANGE",
      BUSINESS_POSTALCODE: "120449",
      BUSINESS_ADDRESS2: "Clementi Town",
      BUSINESS_ADDRESS1: "BLK 449 CLEMENTI AVE 3 #01-265",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53313625C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.8187325655546, 1.262063364207044] },
    properties: {
      OBJECTID_1: 37975,
      NAME: "IAKABA EXCHANGE PTE. LTD.",
      BUSINESS_POSTALCODE: "99253",
      BUSINESS_ADDRESS2: "Harbourfront Centre",
      BUSINESS_ADDRESS1: "1 Maritime Square #01-36/37/38",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "201000296M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85284083760058, 1.2794463730560712] },
    properties: {
      OBJECTID_1: 37976,
      NAME: "ISHWARYA MONEY CHANGER",
      BUSINESS_POSTALCODE: "18969",
      BUSINESS_ADDRESS2: "Downtown MRT Station",
      BUSINESS_ADDRESS1: "15 Central Boulevard #B1-04",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52942211E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85061261364913, 1.29222075715172] },
    properties: {
      OBJECTID_1: 37979,
      NAME: "GLOBAL EXCHANGE",
      BUSINESS_POSTALCODE: "179098",
      BUSINESS_ADDRESS2: "PENINSULA PLAZA",
      BUSINESS_ADDRESS1: "111 NORTH BRIDGE ROAD #02-49",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52879834X"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84839922748421, 1.369248912820203] },
    properties: {
      OBJECTID_1: 37981,
      NAME: "HASSAN & SONS EXCHANGE",
      BUSINESS_POSTALCODE: "569933",
      BUSINESS_ADDRESS2: "AMK HUB",
      BUSINESS_ADDRESS1: "53 ANG MO KIO AVENUE 3 #02-51",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52881254L"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84839922748421, 1.369248912820203] },
    properties: {
      OBJECTID_1: 37985,
      NAME: "IBAN EXPRESS PTE. LTD.",
      BUSINESS_POSTALCODE: "569933",
      BUSINESS_ADDRESS2: "AMK HUB",
      BUSINESS_ADDRESS1: "53 ANG MO KIO AVE 3 #B2-10",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "200707776N"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.82693508428727, 1.286463453186875] },
    properties: {
      OBJECTID_1: 37986,
      NAME: "ILIYAS TRADING",
      BUSINESS_POSTALCODE: "168732",
      BUSINESS_ADDRESS2: "Tiong Bahru Plaza",
      BUSINESS_ADDRESS1: "302 Tiong Bahru Road #02-K2",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52821150A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85541118258217, 1.2991128709669995] },
    properties: {
      OBJECTID_1: 37990,
      NAME: "BUGIS MONEY CHANGER",
      BUSINESS_POSTALCODE: "188021",
      BUSINESS_ADDRESS2: "BUGIS JUNCTION",
      BUSINESS_ADDRESS1: "200 VICTORIA ST #01-113",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52832388A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.98516965326814, 1.3543707361736141] },
    properties: {
      OBJECTID_1: 37815,
      NAME: "PROSEGUR CHANGE SG PTE. LTD.",
      BUSINESS_POSTALCODE: "819663",
      BUSINESS_ADDRESS2: "CHANGI AIRPORT TERMINAL 3",
      BUSINESS_ADDRESS1: "65 AIRPORT BOULEVARD #03-37",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "202336329Z"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84251997356273, 1.2841339715698454] },
    properties: {
      OBJECTID_1: 37820,
      NAME: "AK MONEY CHANGER & DEPT STORE",
      BUSINESS_POSTALCODE: "59108",
      BUSINESS_ADDRESS2: "PEOPLE'S PARK COMPLEX",
      BUSINESS_ADDRESS1: "1 PARK ROAD #01-K95C",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52985725A"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84385200272824, 1.2854952698022815] },
    properties: {
      OBJECTID_1: 37821,
      NAME: "AL FAHAD TRADING",
      BUSINESS_POSTALCODE: "58357",
      BUSINESS_ADDRESS2: "PEOPLE'S PARK CENTRE",
      BUSINESS_ADDRESS1: "101 UPPER CROSS STREET #01-46",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53371670E"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37825,
      NAME: "ARCADE MONEY CHANGERS",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 COLLYER QUAY, #01-18",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "24399900C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.84251997356273, 1.2841339715698454] },
    properties: {
      OBJECTID_1: 37831,
      NAME: "CRANTE MONEY CHANGER",
      BUSINESS_POSTALCODE: "59108",
      BUSINESS_ADDRESS2: "PEOPLE'S PARK COMPLEX",
      BUSINESS_ADDRESS1: "1 Park Road #01-28",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "36399000C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85205887409556, 1.283619821195103] },
    properties: {
      OBJECTID_1: 37833,
      NAME: "ENG LOK MONEYCHANGER",
      BUSINESS_POSTALCODE: "49317",
      BUSINESS_ADDRESS2: "The Arcade",
      BUSINESS_ADDRESS1: "11 Collyer Quay #01-05B",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "44720100W"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.86022022911888, 1.2825833648543656] },
    properties: {
      OBJECTID_1: 37837,
      NAME: "FAR EAST EXCHANGE",
      BUSINESS_POSTALCODE: "18971",
      BUSINESS_ADDRESS2: "Marina Bay Sands",
      BUSINESS_ADDRESS1: "10 Bayfront Avenue, B1-03",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "52858553C"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.85767549794905, 1.2948790411732793] },
    properties: {
      OBJECTID_1: 37845,
      NAME: "HKI INTERNATIONAL EXCHANGE",
      BUSINESS_POSTALCODE: "38983",
      BUSINESS_ADDRESS2: "Suntec City Mall",
      BUSINESS_ADDRESS1: "3 Temasek Boulevard, #02-706",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53184281M"
    }
  },
  {
    type: "Feature",
    geometry: { type: "Point", coordinates: [103.93080808308564, 1.3259267520938547] },
    properties: {
      OBJECTID_1: 37846,
      NAME: "AL-AMAN EXCHANGE",
      BUSINESS_POSTALCODE: "460205",
      BUSINESS_ADDRESS2: "Bedok Central",
      BUSINESS_ADDRESS1: "BLK 205. BEDOK NORTH STREET 1 #01-377",
      BUSINESS_TYPE: "Money-changing Licensee",
      BUSINESS_REGISTRATION_NUMBER: "53351602A"
    }
  }
];

// Determine hub/cluster for helpful grouping
function inferCluster(building: string | null, address: string | null): string {
  const text = `${building || ''} ${address || ''}`.toLowerCase();
  if (text.includes('arcade') || text.includes('collyer') || text.includes('raffles place')) return 'The Arcade (CBD)';
  if (text.includes('lucky plaza') || text.includes('orchard') || text.includes('scotts') || text.includes('somerset') || text.includes('tanglin')) return 'Orchard / Lucky Plaza';
  if (text.includes('park complex') || text.includes('park centre') || text.includes('cross street') || text.includes('chinatown')) return 'Chinatown / People\'s Park';
  if (text.includes('dunlop') || text.includes('serangoon') || text.includes('mustafa') || text.includes('syed alwi') || text.includes('tekka')) return 'Little India / Mustafa';
  if (text.includes('bugis') || text.includes('victoria') || text.includes('bencoolen')) return 'Bugis / Bencoolen';
  if (text.includes('changi') || text.includes('airport')) return 'Changi Airport';
  if (text.includes('jurong') || text.includes('clementi') || text.includes('west mall')) return 'Jurong / West';
  if (text.includes('bedok') || text.includes('tampines') || text.includes('pasir ris')) return 'East / Bedok / Tampines';
  if (text.includes('woodlands') || text.includes('yishun') || text.includes('ang mo kio') || text.includes('toa payoh')) return 'North / Central Towns';
  return 'Singapore Town';
}

export const MONEY_CHANGERS: MoneyChangerLocation[] = RAW_MONEY_CHANGERS_GEOJSON.map((f) => ({
  id: f.properties.OBJECTID_1,
  name: f.properties.NAME,
  postalCode: f.properties.BUSINESS_POSTALCODE,
  building: f.properties.BUSINESS_ADDRESS2,
  address: f.properties.BUSINESS_ADDRESS1,
  businessType: f.properties.BUSINESS_TYPE,
  registrationNumber: f.properties.BUSINESS_REGISTRATION_NUMBER,
  longitude: f.geometry.coordinates[0],
  latitude: f.geometry.coordinates[1],
  cluster: inferCluster(f.properties.BUSINESS_ADDRESS2, f.properties.BUSINESS_ADDRESS1),
}));

/**
 * Great-circle distance between two coordinates in kilometers using Haversine formula
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export function estimateWalkingTime(distanceKm: number): string {
  // Average walking pace ~ 4.8 km/h (12.5 mins per km)
  const minutes = Math.round(distanceKm * 12.5);
  if (minutes < 1) return '< 1 min walk';
  if (minutes < 60) return `~${minutes} min walk`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return `~${hours}h ${rem}m walk`;
}

// Preset popular areas for travelers who want to check without enabling GPS
export interface AreaPreset {
  name: string;
  label: string;
  lat: number;
  lng: number;
}

export const SINGAPORE_AREA_PRESETS: AreaPreset[] = [
  { name: 'arcade', label: 'The Arcade (Raffles Place)', lat: 1.28362, lng: 103.85206 },
  { name: 'luckyplaza', label: 'Lucky Plaza (Orchard)', lat: 1.30448, lng: 103.83394 },
  { name: 'chinatown', label: 'People\'s Park (Chinatown)', lat: 1.28413, lng: 103.84252 },
  { name: 'littleindia', label: 'Little India / Mustafa', lat: 1.30959, lng: 103.85537 },
  { name: 'bugis', label: 'Bugis Junction / Street', lat: 1.29911, lng: 103.85541 },
  { name: 'changi', label: 'Changi Airport (Terminal 3)', lat: 1.35437, lng: 103.98517 },
  { name: 'jurongeast', label: 'Jurong East (JEM/Westgate)', lat: 1.33320, lng: 103.74317 },
  { name: 'bedok', label: 'Bedok Mall / Central', lat: 1.32479, lng: 103.92918 },
  { name: 'amk', label: 'Ang Mo Kio Hub', lat: 1.36925, lng: 103.84840 },
];
