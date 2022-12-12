const teams = [
  {
      "_id": "629c9c6b5749c4077500eaa8",
      "name_en": "Iran",
      "name_fa": "ایران",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/125px-Flag_of_Iran.svg.png",
      "fifa_code": "IRN",
      "iso2": "IR",
      "groups": "B",
      "id": "6"
  },
  {
      "_id": "629c9c6b5749c4077500eaa9",
      "name_en": "England",
      "name_fa": "انگلستان",
      "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png",
      "fifa_code": "ENG",
      "iso2": "ENG",
      "groups": "B",
      "id": "5"
  },
  {
      "_id": "629c9c6b5749c4077500eaaa",
      "name_en": "United States",
      "name_fa": "آمریکا",
      "flag": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png",
      "fifa_code": "USA",
      "iso2": "US",
      "groups": "B",
      "id": "7"
  },
  {
      "_id": "629c9c6b5749c4077500eaab",
      "name_en": "Qatar",
      "name_fa": "قطر",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/125px-Flag_of_Qatar.svg.png",
      "fifa_code": "QAT",
      "iso2": "QA",
      "groups": "A",
      "id": "1"
  },
  {
      "_id": "629c9c6b5749c4077500eaac",
      "name_en": "Ecuador",
      "name_fa": "اکوادور",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/125px-Flag_of_Ecuador.svg.png",
      "fifa_code": "ECU",
      "iso2": "Ec",
      "groups": "A",
      "id": "2"
  },
  {
      "_id": "629c9c6b5749c4077500eaad",
      "name_en": "Senegal",
      "name_fa": "سنگال",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png",
      "fifa_code": "SN",
      "iso2": "SEN",
      "groups": "A",
      "id": "3"
  },
  {
      "_id": "629c9c6b5749c4077500eaae",
      "name_en": "Netherlands",
      "name_fa": "هلند",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png",
      "fifa_code": "NL",
      "iso2": "NED",
      "groups": "A",
      "id": "4"
  },
  {
      "_id": "629c9c6b5749c4077500eab0",
      "name_en": "Argentina",
      "name_fa": "آرژانتین",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png",
      "fifa_code": "ARG",
      "iso2": "AR",
      "groups": "C",
      "id": "9"
  },
  {
      "_id": "629c9c6b5749c4077500eab1",
      "name_en": "Saudi Arabia",
      "name_fa": "عربستان",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/125px-Flag_of_Saudi_Arabia.svg.png",
      "fifa_code": "KSA",
      "iso2": "SA",
      "groups": "C",
      "id": "10"
  },
  {
      "_id": "629c9c6b5749c4077500eab2",
      "name_en": "Mexico",
      "name_fa": "مکزیک",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/125px-Flag_of_Mexico.svg.png",
      "fifa_code": "MEX",
      "iso2": "MX",
      "groups": "C",
      "id": "13"
  },
  {
      "_id": "629c9c6b5749c4077500eab3",
      "name_en": "Poland",
      "name_fa": "لهستان",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/125px-Flag_of_Poland.svg.png",
      "fifa_code": "POL",
      "iso2": "PL",
      "groups": "C",
      "id": "14"
  },
  {
      "_id": "629c9c6b5749c4077500eab4",
      "name_en": "France",
      "name_fa": "فرانسه",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/125px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png",
      "fifa_code": "FRA",
      "iso2": "FR",
      "groups": "D",
      "id": "15"
  },
  {
      "_id": "629c9c6b5749c4077500eab5",
      "name_en": "Australia",
      "name_fa": "استرالیا",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/125px-Flag_of_Australia_%28converted%29.svg.png",
      "fifa_code": "AUS",
      "iso2": "AU",
      "groups": "D",
      "id": "16"
  },
  {
      "_id": "629c9c6b5749c4077500eab6",
      "name_en": "Denmark",
      "name_fa": "دانمارک",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/125px-Flag_of_Denmark.svg.png",
      "fifa_code": "DEN",
      "iso2": "DK",
      "groups": "D",
      "id": "11"
  },
  {
      "_id": "629c9c6b5749c4077500eab7",
      "name_en": "Tunisia",
      "name_fa": "تونس",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/125px-Flag_of_Tunisia.svg.png",
      "fifa_code": "TUN",
      "iso2": "TN",
      "groups": "D",
      "id": "12"
  },
  {
      "_id": "629c9c6b5749c4077500eab8",
      "name_en": "Spain",
      "name_fa": "اسپانیا",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/125px-Flag_of_Spain.svg.png",
      "fifa_code": "ESP",
      "iso2": "ES",
      "groups": "E",
      "id": "21"
  },
  {
      "_id": "629c9c6b5749c4077500eab9",
      "name_en": "Costa Rica",
      "name_fa": "کاستاریکا",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Costa_Rica_%28state%29.svg/125px-Flag_of_Costa_Rica_%28state%29.svg.png",
      "fifa_code": "CRC",
      "iso2": "CR",
      "groups": "E",
      "id": "22"
  },
  {
      "_id": "629c9c6b5749c4077500eaba",
      "name_en": "Germany",
      "name_fa": "آلمان",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/125px-Flag_of_Germany.svg.png",
      "fifa_code": "GER",
      "iso2": "DE",
      "groups": "E",
      "id": "19"
  },
  {
      "_id": "629c9c6b5749c4077500eabb",
      "name_en": "Japan",
      "name_fa": "ژاپن",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png",
      "fifa_code": "JPN",
      "iso2": "JP",
      "groups": "E",
      "id": "20"
  },
  {
      "_id": "629c9c6b5749c4077500eabc",
      "name_en": "Belgium",
      "name_fa": "بلژیک",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/125px-Flag_of_Belgium.svg.png",
      "fifa_code": "BEL",
      "iso2": "BE",
      "groups": "F",
      "id": "23"
  },
  {
      "_id": "629c9c6b5749c4077500eabd",
      "name_en": "Canada",
      "name_fa": "کانادا",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png",
      "fifa_code": "CAN",
      "iso2": "CA",
      "groups": "F",
      "id": "24"
  },
  {
      "_id": "629c9c6b5749c4077500eabe",
      "name_en": "Morocco",
      "name_fa": "مراکش",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/125px-Flag_of_Morocco.svg.png",
      "fifa_code": "MAR",
      "iso2": "MA",
      "groups": "F",
      "id": "17"
  },
  {
      "_id": "629c9c6b5749c4077500eabf",
      "name_en": "Croatia",
      "name_fa": "کرواسی",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/125px-Flag_of_Croatia.svg.png",
      "fifa_code": "CRO",
      "iso2": "HR",
      "groups": "F",
      "id": "18"
  },
  {
      "_id": "629c9c6b5749c4077500eac0",
      "name_en": "Brazil",
      "name_fa": "برزیل",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png",
      "fifa_code": "BRA",
      "iso2": "BR",
      "groups": "G",
      "id": "25"
  },
  {
      "_id": "629c9c6b5749c4077500eac1",
      "name_en": "Serbia",
      "name_fa": "صربستان",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/125px-Flag_of_Serbia.svg.png",
      "fifa_code": "SRB",
      "iso2": "RS",
      "groups": "G",
      "id": "26"
  },
  {
      "_id": "629c9c6b5749c4077500eac2",
      "name_en": "Switzerland",
      "name_fa": "سوئیس",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/100px-Flag_of_Switzerland.svg.png",
      "fifa_code": "SUI",
      "iso2": "CH",
      "groups": "G",
      "id": "31"
  },
  {
      "_id": "629c9c6b5749c4077500eac3",
      "name_en": "Cameroon",
      "name_fa": "کامرون",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/125px-Flag_of_Cameroon.svg.png",
      "fifa_code": "CMR",
      "iso2": "CM",
      "groups": "G",
      "id": "32"
  },
  {
      "_id": "629c9c6b5749c4077500eac4",
      "name_en": "Portugal",
      "name_fa": "پرتغال",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/125px-Flag_of_Portugal.svg.png",
      "fifa_code": "POR",
      "iso2": "PT",
      "groups": "H",
      "id": "27"
  },
  {
      "_id": "629c9c6b5749c4077500eac5",
      "name_en": "Ghana",
      "name_fa": "غنا",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/125px-Flag_of_Ghana.svg.png",
      "fifa_code": "GHA",
      "iso2": "GH",
      "groups": "H",
      "id": "28"
  },
  {
      "_id": "629c9c6b5749c4077500eac6",
      "name_en": "Uruguay",
      "name_fa": "اروگوئه",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/125px-Flag_of_Uruguay.svg.png",
      "fifa_code": "URU",
      "iso2": "UY",
      "groups": "H",
      "id": "29"
  },
  {
      "_id": "629c9c6b5749c4077500eac7",
      "name_en": "South Korea",
      "name_fa": "کره جنوبی",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/125px-Flag_of_South_Korea.svg.png",
      "fifa_code": "KOR",
      "iso2": "KR",
      "groups": "H",
      "id": "30"
  },
  {
      "_id": "631064dab140f1214a8afc83",
      "name_en": "Wales",
      "name_fa": "ولز",
      "flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Wales_%281959%29.svg/125px-Flag_of_Wales_%281959%29.svg.png",
      "fifa_code": "WAL",
      "iso2": "WLS",
      "groups": "B",
      "id": "8"
  },
  {
      "_id": "6389b83b7bf608deb10c8267",
      "name_en": "--",
      "name_fa": "--",
      "flag": "",
      "fifa_code": "--",
      "iso2": "--",
      "groups": "--",
      "id": "0"
  }
]

export default {
  matchInfoDescriptor:[
    {
      datafield: 'home_team_id',
      text: 'Хозяева',
      input: 'select',
      valuekey: 'id',
      labelkey: 'fifa_code',
      values: teams,
      onSelect (option, payload) {
        payload.home_team_en = option.name_en
        payload.home_team_fa = option.name_fa,
        payload.home_flag = option.flag
      }
    },
    {
      datafield: 'away_team_id',
      text: 'Гости',
      input: 'select',
      valuekey: 'id',
      labelkey: 'fifa_code',
      values: teams,
      onSelect(option, payload) {
        payload.away_team_en = option.name_en
        payload.away_team_fa = option.name_fa
        payload.away_flag = option.flag
      }
    },
    {
      datafield: 'local_date',
      text: 'Время матча',
      input: 'date'
    }
  ],
  matchInfo: {
    "_id":"629c9c8a5749c4077500ead4",
    "away_score":2,
    "away_scorers":["Cody Gakpo,Davy Klaassen\n"],
    "away_team_id":"4",
    "finished":"TRUE",
    "group":"A",
    "home_score":0,
    "home_scorers":["null"],
    "home_team_id":"3",
    "id":"1",
    "local_date":"11/21/2022 19:00",
    "matchday":"2",
    "persian_date":"1400-08-30 19:30",
    "stadium_id":"1",
    "time_elapsed":"finished",
    "type":"group",
    "home_team_fa":"سنگال",
    "away_team_fa":"هلند",
    "home_team_en":"Senegal",
    "away_team_en":"Nederlands",
    "home_flag":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png",
    "away_flag":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png"
  },
  schedule: [
    {
        "_id": "629c9c8a5749c4077500ead4",
        "away_score": 2,
        "away_scorers": [
            "Cody Gakpo,Davy Klaassen\n"
        ],
        "away_team_id": "4",
        "finished": "TRUE",
        "group": "A",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "3",
        "id": "1",
        "local_date": "11/21/2022 19:00",
        "matchday": "2",
        "persian_date": "1400-08-30 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "سنگال",
        "away_team_fa": "هلند",
        "home_team_en": "Senegal",
        "away_team_en": "Netherlands",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500ead5",
        "away_score": 2,
        "away_scorers": [
            "Mehdi Taremi,Mehdi Taremi"
        ],
        "away_team_id": "6",
        "finished": "TRUE",
        "group": "B",
        "home_score": 6,
        "home_scorers": [
            "Jude Bellingham,Bukayo Saka,Raheem Sterling,Bukayo Saka,Marcus Rashford,Jack Grealish"
        ],
        "home_team_id": "5",
        "id": "2",
        "local_date": "11/21/2022 16:00",
        "matchday": "2",
        "persian_date": "1400-08-01 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "انگلستان",
        "away_team_fa": "ایران",
        "home_team_en": "England",
        "away_team_en": "Iran",
        "home_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/125px-Flag_of_Iran.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500ead6",
        "away_score": 2,
        "away_scorers": [
            "Enner Valencia,Enner Valencia"
        ],
        "away_team_id": "2",
        "finished": "TRUE",
        "group": "A",
        "home_score": 0,
        "home_scorers": [
            ""
        ],
        "home_team_id": "1",
        "id": "3",
        "local_date": "11/20/2022 19:00",
        "matchday": "1",
        "persian_date": "1400-08-29 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "قطر",
        "away_team_fa": "اکوادور",
        "home_team_en": "Qatar",
        "away_team_en": "Ecuador",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/125px-Flag_of_Qatar.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/125px-Flag_of_Ecuador.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500ead7",
        "away_score": 1,
        "away_scorers": [
            "Gareth Bale"
        ],
        "away_team_id": "8",
        "finished": "TRUE",
        "group": "B",
        "home_score": 1,
        "home_scorers": [
            "Timothy Weah"
        ],
        "home_team_id": "7",
        "id": "4",
        "local_date": "11/21/2022 22:00",
        "matchday": "2",
        "persian_date": "1400-08-30 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "آمریکا",
        "away_team_fa": "ولز",
        "home_team_en": "United States",
        "away_team_en": "Wales",
        "home_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Wales_%281959%29.svg/125px-Flag_of_Wales_%281959%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500ead8",
        "away_score": 2,
        "away_scorers": [
            "Saleh Al Shehri, Salem Al Dawsari"
        ],
        "away_team_id": "10",
        "finished": "TRUE",
        "group": "C",
        "home_score": 1,
        "home_scorers": [
            "Lionel Messi"
        ],
        "home_team_id": "9",
        "id": "5",
        "local_date": "11/22/2022 13:00",
        "matchday": "3",
        "persian_date": "1400-09-01 13:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "آرژانتین",
        "away_team_fa": "عربستان",
        "home_team_en": "Argentina",
        "away_team_en": "Saudi Arabia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/125px-Flag_of_Saudi_Arabia.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500ead9",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "12",
        "finished": "TRUE",
        "group": "D",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "11",
        "id": "6",
        "local_date": "11/22/2022 16:00",
        "matchday": "3",
        "persian_date": "1400-09-01 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "دانمارک",
        "away_team_fa": "تونس",
        "home_team_en": "Denmark",
        "away_team_en": "Tunisia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/125px-Flag_of_Denmark.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/125px-Flag_of_Tunisia.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eada",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "14",
        "finished": "TRUE",
        "group": "C",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "13",
        "id": "7",
        "local_date": "11/22/2022 19:00",
        "matchday": "3",
        "persian_date": "1400-09-01 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "مکزیک",
        "away_team_fa": "لهستان",
        "home_team_en": "Mexico",
        "away_team_en": "Poland",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/125px-Flag_of_Mexico.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/125px-Flag_of_Poland.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eadb",
        "away_score": 1,
        "away_scorers": [
            "Craig Goodwin"
        ],
        "away_team_id": "16",
        "finished": "TRUE",
        "group": "D",
        "home_score": 4,
        "home_scorers": [
            "Adrien Rabiot,Olivier Giroud,Kylian Mbappé"
        ],
        "home_team_id": "15",
        "id": "8",
        "local_date": "11/22/2022 22:00",
        "matchday": "3",
        "persian_date": "1400-09-01 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "فرانسه",
        "away_team_fa": "استرالیا",
        "home_team_en": "France",
        "away_team_en": "Australia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/125px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/125px-Flag_of_Australia_%28converted%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eadc",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "18",
        "finished": "TRUE",
        "group": "F",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "17",
        "id": "9",
        "local_date": "11/23/2022 13:00",
        "matchday": "4",
        "persian_date": "1400-09-02 13:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "مراکش",
        "away_team_fa": "کرواسی",
        "home_team_en": "Morocco",
        "away_team_en": "Croatia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/125px-Flag_of_Morocco.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/125px-Flag_of_Croatia.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eadd",
        "away_score": 2,
        "away_scorers": [
            "Ritsu Doan,Takuma Asano"
        ],
        "away_team_id": "20",
        "finished": "TRUE",
        "group": "E",
        "home_score": 1,
        "home_scorers": [
            "İlkay Gündoğan"
        ],
        "home_team_id": "19",
        "id": "10",
        "local_date": "11/23/2022 16:00",
        "matchday": "4",
        "persian_date": "1400-09-02 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "آلمان",
        "away_team_fa": "ژاپن",
        "home_team_en": "Germany",
        "away_team_en": "Japan",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/125px-Flag_of_Germany.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eade",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "22",
        "finished": "TRUE",
        "group": "E",
        "home_score": 7,
        "home_scorers": [
            "Dani Olmo,Marco Asensio,Ferran Torres,Ferran Torres,Gavi,Carlos Soler,Álvaro Morata"
        ],
        "home_team_id": "21",
        "id": "11",
        "local_date": "11/23/2022 19:00",
        "matchday": "4",
        "persian_date": "1400-09-02 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "اسپانیا",
        "away_team_fa": "کاستاریکا",
        "home_team_en": "Spain",
        "away_team_en": "Costa Rica",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/125px-Flag_of_Spain.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Costa_Rica_%28state%29.svg/125px-Flag_of_Costa_Rica_%28state%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eadf",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "24",
        "finished": "TRUE",
        "group": "F",
        "home_score": 1,
        "home_scorers": [
            "Michy Batshuayi"
        ],
        "home_team_id": "23",
        "id": "12",
        "local_date": "11/23/2022 22:00",
        "matchday": "4",
        "persian_date": "1400-09-02 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "بلژیک",
        "away_team_fa": "کانادا",
        "home_team_en": "Belgium",
        "away_team_en": "Canada",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/125px-Flag_of_Belgium.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae0",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "26",
        "finished": "TRUE",
        "group": "G",
        "home_score": 2,
        "home_scorers": [
            "Richarlison,Richarlison"
        ],
        "home_team_id": "25",
        "id": "13",
        "local_date": "11/24/2022 22:00",
        "matchday": "5",
        "persian_date": "1400-09-03 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "برزیل",
        "away_team_fa": "صربستان",
        "home_team_en": "Brazil",
        "away_team_en": "Serbia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/125px-Flag_of_Serbia.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae1",
        "away_score": 2,
        "away_scorers": [
            "André Ayew,Osman Bukari"
        ],
        "away_team_id": "28",
        "finished": "TRUE",
        "group": "H",
        "home_score": 3,
        "home_scorers": [
            "Cristiano Ronaldo,João Félix,Rafael Leão"
        ],
        "home_team_id": "27",
        "id": "14",
        "local_date": "11/24/2022 19:00",
        "matchday": "5",
        "persian_date": "1400-09-03 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "پرتغال",
        "away_team_fa": "غنا",
        "home_team_en": "Portugal",
        "away_team_en": "Ghana",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/125px-Flag_of_Portugal.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/125px-Flag_of_Ghana.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae2",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "30",
        "finished": "TRUE",
        "group": "H",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "29",
        "id": "15",
        "local_date": "11/24/2022 16:00",
        "matchday": "5",
        "persian_date": "1400-09-03 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "اروگوئه",
        "away_team_fa": "کره جنوبی",
        "home_team_en": "Uruguay",
        "away_team_en": "South Korea",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/125px-Flag_of_Uruguay.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/125px-Flag_of_South_Korea.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae3",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "32",
        "finished": "TRUE",
        "group": "G",
        "home_score": 1,
        "home_scorers": [
            "Breel Embolo"
        ],
        "home_team_id": "31",
        "id": "16",
        "local_date": "11/24/2022 13:00",
        "matchday": "5",
        "persian_date": "1400-09-03 13:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "سوئیس",
        "away_team_fa": "کامرون",
        "home_team_en": "Switzerland",
        "away_team_en": "Cameroon",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/100px-Flag_of_Switzerland.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/125px-Flag_of_Cameroon.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae4",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "8",
        "finished": "TRUE",
        "group": "B",
        "home_score": 2,
        "home_scorers": [
            "Rouzbeh Cheshmi,Ramin Rezaeian"
        ],
        "home_team_id": "6",
        "id": "17",
        "local_date": "11/25/2022 13:00",
        "matchday": "6",
        "persian_date": "1400-09-04 13:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "ایران",
        "away_team_fa": "ولز",
        "home_team_en": "Iran",
        "away_team_en": "Wales",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/125px-Flag_of_Iran.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Wales_%281959%29.svg/125px-Flag_of_Wales_%281959%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae5",
        "away_score": 3,
        "away_scorers": [
            "Boulaye Dia,Famara Diedhiou,Bamba Dieng"
        ],
        "away_team_id": "3",
        "finished": "TRUE",
        "group": "A",
        "home_score": 1,
        "home_scorers": [
            "Mohammed Muntari"
        ],
        "home_team_id": "1",
        "id": "18",
        "local_date": "11/25/2022 16:00",
        "matchday": "6",
        "persian_date": "1400-09-04 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "قطر",
        "away_team_fa": "سنگال",
        "home_team_en": "Qatar",
        "away_team_en": "Senegal",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/125px-Flag_of_Qatar.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae6",
        "away_score": 1,
        "away_scorers": [
            "Enner Valencia"
        ],
        "away_team_id": "2",
        "finished": "TRUE",
        "group": "A",
        "home_score": 1,
        "home_scorers": [
            "Cody Gakpo"
        ],
        "home_team_id": "4",
        "id": "19",
        "local_date": "11/25/2022 19:00",
        "matchday": "6",
        "persian_date": "1400-09-04 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "هلند",
        "away_team_fa": "اکوادور",
        "home_team_en": "Netherlands",
        "away_team_en": "Ecuador",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/125px-Flag_of_Ecuador.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae7",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "7",
        "finished": "TRUE",
        "group": "B",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "5",
        "id": "20",
        "local_date": "11/25/2022 22:00",
        "matchday": "6",
        "persian_date": "1400-09-04 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "انگلستان",
        "away_team_fa": "آمریکا",
        "home_team_en": "England",
        "away_team_en": "United States",
        "home_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae8",
        "away_score": 1,
        "away_scorers": [
            "Mitchell Duke"
        ],
        "away_team_id": "16",
        "finished": "TRUE",
        "group": "D",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "12",
        "id": "21",
        "local_date": "11/26/2022 13:00",
        "matchday": "7",
        "persian_date": "1400-09-05 13:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "تونس",
        "away_team_fa": "استرالیا",
        "home_team_en": "Tunisia",
        "away_team_en": "Australia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/125px-Flag_of_Tunisia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/125px-Flag_of_Australia_%28converted%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eae9",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "10",
        "finished": "TRUE",
        "group": "C",
        "home_score": 2,
        "home_scorers": [
            "Piotr Zieliński,Robert Lewandowski"
        ],
        "home_team_id": "14",
        "id": "22",
        "local_date": "11/26/2022 16:00",
        "matchday": "7",
        "persian_date": "1400-09-05 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "لهستان",
        "away_team_fa": "عربستان",
        "home_team_en": "Poland",
        "away_team_en": "Saudi Arabia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/125px-Flag_of_Poland.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/125px-Flag_of_Saudi_Arabia.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaea",
        "away_score": 1,
        "away_scorers": [
            "Andreas Christensen"
        ],
        "away_team_id": "11",
        "finished": "TRUE",
        "group": "D",
        "home_score": 2,
        "home_scorers": [
            "Kylian Mbappé(2)"
        ],
        "home_team_id": "15",
        "id": "23",
        "local_date": "11/26/2022 19:00",
        "matchday": "7",
        "persian_date": "1400-09-05 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "فرانسه",
        "away_team_fa": "دانمارک",
        "home_team_en": "France",
        "away_team_en": "Denmark",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/125px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/125px-Flag_of_Denmark.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaeb",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "13",
        "finished": "TRUE",
        "group": "C",
        "home_score": 2,
        "home_scorers": [
            "Lionel Messi,Enzo Fernández"
        ],
        "home_team_id": "9",
        "id": "24",
        "local_date": "11/26/2022 22:00",
        "matchday": "7",
        "persian_date": "1400-09-05 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "آرژانتین",
        "away_team_fa": "مکزیک",
        "home_team_en": "Argentina",
        "away_team_en": "Mexico",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/125px-Flag_of_Mexico.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaec",
        "away_score": 1,
        "away_scorers": [
            "Keysher Fuller"
        ],
        "away_team_id": "22",
        "finished": "TRUE",
        "group": "E",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "20",
        "id": "25",
        "local_date": "11/27/2022 13:00",
        "matchday": "8",
        "persian_date": "1400-09-06 13:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "ژاپن",
        "away_team_fa": "کاستاریکا",
        "home_team_en": "Japan",
        "away_team_en": "Costa Rica",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Costa_Rica_%28state%29.svg/125px-Flag_of_Costa_Rica_%28state%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaed",
        "away_score": 2,
        "away_scorers": [
            "Abdelhamid Sabiri,Zakaria Aboukhlal"
        ],
        "away_team_id": "17",
        "finished": "TRUE",
        "group": "F",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "23",
        "id": "26",
        "local_date": "11/27/2022 16:00",
        "matchday": "8",
        "persian_date": "1400-09-06 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "بلژیک",
        "away_team_fa": "مراکش",
        "home_team_en": "Belgium",
        "away_team_en": "Morocco",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/125px-Flag_of_Belgium.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/125px-Flag_of_Morocco.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaee",
        "away_score": 1,
        "away_scorers": [
            "Alphonso Davies"
        ],
        "away_team_id": "24",
        "finished": "TRUE",
        "group": "F",
        "home_score": 4,
        "home_scorers": [
            "Andrej Kramarić(2) ,Marko Livaja,Lovro Majer"
        ],
        "home_team_id": "18",
        "id": "27",
        "local_date": "11/27/2022 19:00",
        "matchday": "8",
        "persian_date": "1400-09-06 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "کرواسی",
        "away_team_fa": "کانادا",
        "home_team_en": "Croatia",
        "away_team_en": "Canada",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/125px-Flag_of_Croatia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaef",
        "away_score": 1,
        "away_scorers": [
            "Niclas Füllkrug"
        ],
        "away_team_id": "19",
        "finished": "TRUE",
        "group": "E",
        "home_score": 1,
        "home_scorers": [
            "Álvaro Morata"
        ],
        "home_team_id": "21",
        "id": "28",
        "local_date": "11/27/2022 22:00",
        "matchday": "8",
        "persian_date": "1400-09-06 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "اسپانیا",
        "away_team_fa": "آلمان",
        "home_team_en": "Spain",
        "away_team_en": "Germany",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/125px-Flag_of_Spain.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/125px-Flag_of_Germany.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf0",
        "away_score": 3,
        "away_scorers": [
            "Jean-Charles Castelletto,Vincent Aboubakar,Eric Maxim Choupo-Moting"
        ],
        "away_team_id": "32",
        "finished": "TRUE",
        "group": "G",
        "home_score": 3,
        "home_scorers": [
            "Strahinja Pavlović,Sergej Milinković-Savić,Aleksandar Mitrović"
        ],
        "home_team_id": "26",
        "id": "29",
        "local_date": "11/28/2022 13:00",
        "matchday": "9",
        "persian_date": "1400-09-07 13:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "صربستان",
        "away_team_fa": "کامرون",
        "home_team_en": "Serbia",
        "away_team_en": "Cameroon",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/125px-Flag_of_Serbia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/125px-Flag_of_Cameroon.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf1",
        "away_score": 3,
        "away_scorers": [
            "Mohammed Salisu,Mohammed Kudus(2)"
        ],
        "away_team_id": "28",
        "finished": "TRUE",
        "group": "H",
        "home_score": 2,
        "home_scorers": [
            "Cho Gue-sung(2)"
        ],
        "home_team_id": "30",
        "id": "30",
        "local_date": "11/28/2022 16:00",
        "matchday": "9",
        "persian_date": "1400-09-07 16:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "کره جنوبی",
        "away_team_fa": "غنا",
        "home_team_en": "South Korea",
        "away_team_en": "Ghana",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/125px-Flag_of_South_Korea.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/125px-Flag_of_Ghana.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf2",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "31",
        "finished": "TRUE",
        "group": "G",
        "home_score": 1,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "25",
        "id": "31",
        "local_date": "11/28/2022 19:00",
        "matchday": "9",
        "persian_date": "1400-09-07 19:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "برزیل",
        "away_team_fa": "سوئیس",
        "home_team_en": "Brazil",
        "away_team_en": "Switzerland",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/100px-Flag_of_Switzerland.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf3",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "29",
        "finished": "TRUE",
        "group": "H",
        "home_score": 2,
        "home_scorers": [
            "Bruno Fernandes(2)"
        ],
        "home_team_id": "27",
        "id": "32",
        "local_date": "11/28/2022 22:00",
        "matchday": "9",
        "persian_date": "1400-09-07 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "پرتغال",
        "away_team_fa": "اروگوئه",
        "home_team_en": "Portugal",
        "away_team_en": "Uruguay",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/125px-Flag_of_Portugal.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/125px-Flag_of_Uruguay.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf4",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "8",
        "finished": "TRUE",
        "group": "B",
        "home_score": 3,
        "home_scorers": [
            "Marcus Rashford(2),Phil Foden"
        ],
        "home_team_id": "5",
        "id": "33",
        "local_date": "11/29/2022 22:00",
        "matchday": "10",
        "persian_date": "1400-09-08 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "انگلستان",
        "away_team_fa": "ولز",
        "home_team_en": "England",
        "away_team_en": "Wales",
        "home_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Wales_%281959%29.svg/125px-Flag_of_Wales_%281959%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf5",
        "away_score": 1,
        "away_scorers": [
            "Christian Pulisic"
        ],
        "away_team_id": "7",
        "finished": "TRUE",
        "group": "B",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "6",
        "id": "34",
        "local_date": "11/29/2022 22:00",
        "matchday": "10",
        "persian_date": "1400-09-08 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "ایران",
        "away_team_fa": "آمریکا",
        "home_team_en": "Iran",
        "away_team_en": "United States",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/125px-Flag_of_Iran.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf6",
        "away_score": 2,
        "away_scorers": [
            "Ismaïla Sarr,Kalidou Koulibaly"
        ],
        "away_team_id": "3",
        "finished": "TRUE",
        "group": "A",
        "home_score": 1,
        "home_scorers": [
            "Moisés Caicedo"
        ],
        "home_team_id": "2",
        "id": "35",
        "local_date": "11/29/2022 18:00",
        "matchday": "10",
        "persian_date": "1400-09-08 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "اکوادور",
        "away_team_fa": "سنگال",
        "home_team_en": "Ecuador",
        "away_team_en": "Senegal",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/125px-Flag_of_Ecuador.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf7",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "1",
        "finished": "TRUE",
        "group": "A",
        "home_score": 2,
        "home_scorers": [
            "Cody Gakpo,Frenkie de Jong"
        ],
        "home_team_id": "4",
        "id": "36",
        "local_date": "11/29/2022 18:00",
        "matchday": "10",
        "persian_date": "1400-09-08 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "هلند",
        "away_team_fa": "قطر",
        "home_team_en": "Netherlands",
        "away_team_en": "Qatar",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/125px-Flag_of_Qatar.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf8",
        "away_score": 1,
        "away_scorers": [
            "Mathew Leckie"
        ],
        "away_team_id": "16",
        "finished": "TRUE",
        "group": "D",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "11",
        "id": "37",
        "local_date": "11/30/2022 18:00",
        "matchday": "11",
        "persian_date": "1400-09-09 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "دانمارک",
        "away_team_fa": "استرالیا",
        "home_team_en": "Denmark",
        "away_team_en": "Australia",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/125px-Flag_of_Denmark.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/125px-Flag_of_Australia_%28converted%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaf9",
        "away_score": 0,
        "away_scorers": [
            ""
        ],
        "away_team_id": "15",
        "finished": "TRUE",
        "group": "D",
        "home_score": 1,
        "home_scorers": [
            "Wahbi Khazri"
        ],
        "home_team_id": "12",
        "id": "38",
        "local_date": "11/30/2022 18:00",
        "matchday": "11",
        "persian_date": "1400-09-09 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "تونس",
        "away_team_fa": "فرانسه",
        "home_team_en": "Tunisia",
        "away_team_en": "France",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/125px-Flag_of_Tunisia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/125px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eafa",
        "away_score": 2,
        "away_scorers": [
            "Alexis Mac Allisvter,Julián Álvarez"
        ],
        "away_team_id": "9",
        "finished": "TRUE",
        "group": "C",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "14",
        "id": "39",
        "local_date": "11/30/2022 22:00",
        "matchday": "11",
        "persian_date": "1400-09-09 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "لهستان",
        "away_team_fa": "آرژانتین",
        "home_team_en": "Poland",
        "away_team_en": "Argentina",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/125px-Flag_of_Poland.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eafb",
        "away_score": 2,
        "away_scorers": [
            "Henry Martín,Luis Chávez"
        ],
        "away_team_id": "13",
        "finished": "TRUE",
        "group": "C",
        "home_score": 1,
        "home_scorers": [
            "Salem Aldawsari"
        ],
        "home_team_id": "10",
        "id": "40",
        "local_date": "11/30/2022 22:00",
        "matchday": "11",
        "persian_date": "1400-09-09 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "عربستان",
        "away_team_fa": "مکزیک",
        "home_team_en": "Saudi Arabia",
        "away_team_en": "Mexico",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/125px-Flag_of_Saudi_Arabia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/125px-Flag_of_Mexico.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eafc",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "23",
        "finished": "TRUE",
        "group": "F",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "18",
        "id": "41",
        "local_date": "12/1/2022 18:00",
        "matchday": "12",
        "persian_date": "1400-09-10 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "کرواسی",
        "away_team_fa": "بلژیک",
        "home_team_en": "Croatia",
        "away_team_en": "Belgium",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/125px-Flag_of_Croatia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/125px-Flag_of_Belgium.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eafd",
        "away_score": 2,
        "away_scorers": [
            "Hakim Ziyech,Youssef En-Nesyri"
        ],
        "away_team_id": "17",
        "finished": "TRUE",
        "group": "F",
        "home_score": 1,
        "home_scorers": [
            "Nayef Aguerd"
        ],
        "home_team_id": "24",
        "id": "42",
        "local_date": "12/1/2022 18:00",
        "matchday": "12",
        "persian_date": "1400-09-10 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "کانادا",
        "away_team_fa": "مراکش",
        "home_team_en": "Canada",
        "away_team_en": "Morocco",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/125px-Flag_of_Morocco.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eafe",
        "away_score": 1,
        "away_scorers": [
            "Álvaro Morata"
        ],
        "away_team_id": "21",
        "finished": "TRUE",
        "group": "E",
        "home_score": 2,
        "home_scorers": [
            "Ritsu Doan,Ao Tanaka"
        ],
        "home_team_id": "20",
        "id": "43",
        "local_date": "12/1/2022 22:00",
        "matchday": "12",
        "persian_date": "1400-09-10 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "ژاپن",
        "away_team_fa": "اسپانیا",
        "home_team_en": "Japan",
        "away_team_en": "Spain",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/125px-Flag_of_Spain.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eaff",
        "away_score": 4,
        "away_scorers": [
            "Serge Gnabry,Kai Havertz(2),Niclas Füllkrug"
        ],
        "away_team_id": "19",
        "finished": "TRUE",
        "group": "E",
        "home_score": 2,
        "home_scorers": [
            "Yeltsin Tejeda,Manuel Neuer"
        ],
        "home_team_id": "22",
        "id": "44",
        "local_date": "12/1/2022 22:00",
        "matchday": "12",
        "persian_date": "1400-09-10 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "کاستاریکا",
        "away_team_fa": "آلمان",
        "home_team_en": "Costa Rica",
        "away_team_en": "Germany",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Costa_Rica_%28state%29.svg/125px-Flag_of_Costa_Rica_%28state%29.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/125px-Flag_of_Germany.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eb00",
        "away_score": 2,
        "away_scorers": [
            "Giorgian de Arrascaeta(2)"
        ],
        "away_team_id": "29",
        "finished": "TRUE",
        "group": "H",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "28",
        "id": "45",
        "local_date": "12/2/2022 18:00",
        "matchday": "13",
        "persian_date": "1400-09-11 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "غنا",
        "away_team_fa": "اروگوئه",
        "home_team_en": "Ghana",
        "away_team_en": "Uruguay",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/125px-Flag_of_Ghana.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/125px-Flag_of_Uruguay.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eb01",
        "away_score": 1,
        "away_scorers": [
            "Ricardo Horta"
        ],
        "away_team_id": "27",
        "finished": "TRUE",
        "group": "H",
        "home_score": 2,
        "home_scorers": [
            "Kim Young-gwon,Hwang Hee-chan"
        ],
        "home_team_id": "30",
        "id": "46",
        "local_date": "12/2/2022 18:00",
        "matchday": "13",
        "persian_date": "1400-09-11 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "کره جنوبی",
        "away_team_fa": "پرتغال",
        "home_team_en": "South Korea",
        "away_team_en": "Portugal",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/125px-Flag_of_South_Korea.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/125px-Flag_of_Portugal.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eb02",
        "away_score": 3,
        "away_scorers": [
            "Xherdan Shaqiri,Breel Embolo,Remo Freuler"
        ],
        "away_team_id": "31",
        "finished": "TRUE",
        "group": "G",
        "home_score": 2,
        "home_scorers": [
            "Aleksandar Mitrović,Dušan Vlahović"
        ],
        "home_team_id": "26",
        "id": "47",
        "local_date": "12/2/2022 22:00",
        "matchday": "13",
        "persian_date": "1400-09-11 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "صربستان",
        "away_team_fa": "سوئیس",
        "home_team_en": "Serbia",
        "away_team_en": "Switzerland",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/125px-Flag_of_Serbia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/100px-Flag_of_Switzerland.svg.png"
    },
    {
        "_id": "629c9c8a5749c4077500eb03",
        "away_score": 1,
        "away_scorers": [
            "Vincent Aboubakar"
        ],
        "away_team_id": "32",
        "finished": "TRUE",
        "group": "G",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "25",
        "id": "48",
        "local_date": "12/2/2022 22:00",
        "matchday": "13",
        "persian_date": "1400-09-11 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "group",
        "home_team_fa": "برزیل",
        "away_team_fa": "کامرون",
        "home_team_en": "Brazil",
        "away_team_en": "Cameroon",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/125px-Flag_of_Cameroon.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af31",
        "away_score": 3,
        "away_scorers": [
            "Memphis Depay,Daley Blind,Denzel Dumfries"
        ],
        "away_team_id": "4",
        "finished": "TRUE",
        "group": "R16",
        "home_score": 1,
        "home_scorers": [
            "Haji Wright"
        ],
        "home_team_id": "7",
        "id": "49",
        "local_date": "12/3/2022 18:00",
        "matchday": "14",
        "persian_date": "1400-09-12 18:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "R16",
        "home_team_fa": "آمریکا",
        "away_team_fa": "هلند",
        "home_team_en": "United States",
        "away_team_en": "Netherlands",
        "home_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/125px-Flag_of_the_United_States.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af32",
        "away_score": 2,
        "away_scorers": [
            "Lionel Messi,Julián Álvarez"
        ],
        "away_team_id": "9",
        "finished": "TRUE",
        "group": "R16",
        "home_score": 1,
        "home_scorers": [
            "Enzo Fernández"
        ],
        "home_team_id": "16",
        "id": "50",
        "local_date": "12/3/2022 22:00",
        "matchday": "14",
        "persian_date": "1400-09-12 22:30",
        "stadium_id": "1",
        "time_elapsed": "finished",
        "type": "R16",
        "home_team_fa": "استرالیا",
        "away_team_fa": "آرژانتین",
        "home_team_en": "Australia",
        "away_team_en": "Argentina",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/125px-Flag_of_Australia_%28converted%29.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af33",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "15",
        "finished": "FALSE",
        "group": "R16",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "14",
        "id": "51",
        "local_date": "12/4/2022 18:00",
        "matchday": "15",
        "persian_date": "1400-09-13 18:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "R16",
        "home_team_fa": "لهستان",
        "away_team_fa": "فرانسه",
        "home_team_en": "Poland",
        "away_team_en": "France",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/125px-Flag_of_Poland.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/125px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af34",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "5",
        "finished": "FALSE",
        "group": "R16",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "3",
        "id": "64",
        "local_date": "12/4/2022 22:00",
        "matchday": "15",
        "persian_date": "1400-09-13 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "R16",
        "home_team_fa": "سنگال",
        "away_team_fa": "انگلستان",
        "home_team_en": "Senegal",
        "away_team_en": "England",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/125px-Flag_of_Senegal.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af35",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "20",
        "finished": "FALSE",
        "group": "R16",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "18",
        "id": "52",
        "local_date": "12/5/2022 18:00",
        "matchday": "16",
        "persian_date": "1400-09-14 18:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "R16",
        "home_team_fa": "کرواسی",
        "away_team_fa": "ژاپن",
        "home_team_en": "Croatia",
        "away_team_en": "Japan",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/125px-Flag_of_Croatia.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af36",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "25",
        "finished": "FALSE",
        "group": "R16",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "30",
        "id": "53",
        "local_date": "12/5/2022 22:00",
        "matchday": "16",
        "persian_date": "1400-09-14 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "R16",
        "home_team_fa": "کره جنوبی",
        "away_team_fa": "برزیل",
        "home_team_en": "South Korea",
        "away_team_en": "Brazil",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/125px-Flag_of_South_Korea.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af37",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "17",
        "finished": "FALSE",
        "group": "R16",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "21",
        "id": "54",
        "local_date": "12/6/2022 18:00",
        "matchday": "17",
        "persian_date": "1400-09-15 18:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "R16",
        "home_team_fa": "اسپانیا",
        "away_team_fa": "مراکش",
        "home_team_en": "Spain",
        "away_team_en": "Morocco",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/125px-Flag_of_Spain.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/125px-Flag_of_Morocco.svg.png"
    },
    {
        "_id": "638923be0eab2168b945af38",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "27",
        "finished": "FALSE",
        "group": "R16",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "31",
        "id": "55",
        "local_date": "12/6/2022 22:00",
        "matchday": "17",
        "persian_date": "1400-09-15 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "R16",
        "home_team_fa": "سوئیس",
        "away_team_fa": "پرتغال",
        "home_team_en": "Switzerland",
        "away_team_en": "Portugal",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/100px-Flag_of_Switzerland.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/125px-Flag_of_Portugal.svg.png"
    },
    {
        "_id": "6389265e0eab2168b945af3a",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "0",
        "finished": "FALSE",
        "group": "QR",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "0",
        "id": "56",
        "local_date": "12/9/2022 18:00",
        "matchday": "18",
        "persian_date": "1400-09-18 18:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "QR",
        "home_team_fa": "--",
        "away_team_fa": "--",
        "home_team_en": "--",
        "away_team_en": "--",
        "home_flag": "",
        "away_flag": ""
    },
    {
        "_id": "6389265e0eab2168b945af3b",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "9",
        "finished": "FALSE",
        "group": "QR",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "4",
        "id": "57",
        "local_date": "12/9/2022 22:00",
        "matchday": "18",
        "persian_date": "1400-09-18 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "QR",
        "home_team_fa": "هلند",
        "away_team_fa": "آرژانتین",
        "home_team_en": "Netherlands",
        "away_team_en": "Argentina",
        "home_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/125px-Flag_of_the_Netherlands.svg.png",
        "away_flag": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/125px-Flag_of_Argentina.svg.png"
    },
    {
        "_id": "6389265e0eab2168b945af3c",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "0",
        "finished": "FALSE",
        "group": "QR",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "0",
        "id": "58",
        "local_date": "12/10/2022 18:00",
        "matchday": "19",
        "persian_date": "1400-09-19 18:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "QR",
        "home_team_fa": "--",
        "away_team_fa": "--",
        "home_team_en": "--",
        "away_team_en": "--",
        "home_flag": "",
        "away_flag": ""
    },
    {
        "_id": "6389265e0eab2168b945af3d",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "0",
        "finished": "FALSE",
        "group": "QR",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "0",
        "id": "59",
        "local_date": "12/10/2022 22:00",
        "matchday": "19",
        "persian_date": "1400-09-19 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "QR",
        "home_team_fa": "--",
        "away_team_fa": "--",
        "home_team_en": "--",
        "away_team_en": "--",
        "home_flag": "",
        "away_flag": ""
    },
    {
        "_id": "6389265e0eab2168b945af3e",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "0",
        "finished": "FALSE",
        "group": "semi",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "0",
        "id": "60",
        "local_date": "12/13/2022 22:00",
        "matchday": "20",
        "persian_date": "1400-09-22 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "semi",
        "home_team_fa": "--",
        "away_team_fa": "--",
        "home_team_en": "--",
        "away_team_en": "--",
        "home_flag": "",
        "away_flag": ""
    },
    {
        "_id": "6389265e0eab2168b945af3f",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "0",
        "finished": "FALSE",
        "group": "semi",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "0",
        "id": "61",
        "local_date": "12/14/2022 22:00",
        "matchday": "21",
        "persian_date": "1400-09-23 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "semi",
        "home_team_fa": "--",
        "away_team_fa": "--",
        "home_team_en": "--",
        "away_team_en": "--",
        "home_flag": "",
        "away_flag": ""
    },
    {
        "_id": "6389265e0eab2168b945af40",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "0",
        "finished": "FALSE",
        "group": "3RD",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "0",
        "id": "62",
        "local_date": "12/17/2022 22:00",
        "matchday": "22",
        "persian_date": "1400-09-26 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "3RD",
        "home_team_fa": "--",
        "away_team_fa": "--",
        "home_team_en": "--",
        "away_team_en": "--",
        "home_flag": "",
        "away_flag": ""
    },
    {
        "_id": "6389265e0eab2168b945af41",
        "away_score": 0,
        "away_scorers": [
            "null"
        ],
        "away_team_id": "0",
        "finished": "FALSE",
        "group": "FIN",
        "home_score": 0,
        "home_scorers": [
            "null"
        ],
        "home_team_id": "0",
        "id": "63",
        "local_date": "12/18/2022 22:00",
        "matchday": "23",
        "persian_date": "1400-09-27 22:30",
        "stadium_id": "1",
        "time_elapsed": "notstarted",
        "type": "FIN",
        "home_team_fa": "--",
        "away_team_fa": "--",
        "home_team_en": "--",
        "away_team_en": "--",
        "home_flag": "",
        "away_flag": ""
    }
],
  teams
}