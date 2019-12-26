export const config = {
  addGoalButtonText: 'Добавить цель',
  api: 'https://api-metrika.yandex.net/stat/v1/data/bytime?accuracy=full&group=year',
  clientId: 'c1b491bd74e84df4b313d39846f27907',
  getTokenText: 'Нет OAuth токена?',
  glossary: {
    'ym:s:avgVisitDurationSeconds': 'Время на сайте (минуты)',
    'ym:s:bounceRate': 'Отказы (%)',
    'ym:s:goal<goal_id>conversionRate': 'Конверсия (%)',
    'ym:s:goal<goal_id>reaches': 'Достижения цели',
    'ym:s:goal<goal_id>visits': 'Целевые визиты',
    'ym:s:pageDepth': 'Глубина просмотра (страницы)',
    'ym:s:pageviews': 'Просмотры',
    'ym:s:users': 'Посетители',
    'ym:s:visits': 'Визиты',
  },
  oauthFormTitle: 'OAuth Авторизация',
  oauthUrl: 'https://oauth.yandex.ru/authorize',
  parts: {
    goals: {
      name: 'Цели',
      /* !!! Цели имеют только одни subPart, что бы избежать вложеных циклов !!! */
      subParts: [
        {
          filters: '',
          metrics: [
            'ym:s:goal<goal_id>conversionRate',
            'ym:s:goal<goal_id>reaches',
            'ym:s:goal<goal_id>visits',
          ],
          name: 'Все пользователи',
        },
      ],
      timeout: 500,
    },
    popular: {
      name: 'Популярные страницы',
      subParts: [
        {
          dimensions: ['ym:pv:title', 'ym:pv:URLHash'],
          filters: '',
          metrics: ['ym:pv:pageviews'],
          name: 'Все пользователи',
        },
        {
          dimensions: ['ym:pv:title', 'ym:pv:URLHash'],
          filters: 'ym:s:visitDuration > 120 AND ym:s:pageViews > 3',
          metrics: ['ym:pv:pageviews'],
          name: 'Ядро',
        },
      ],
      timeout: 1000,
    },
    searchPhrases: {
      name: 'Поисковые запросы',
      subParts: [
        {
          filters: `ym:s:lastSearchEngineRoot =. ('Yandex','Google','Bing','Mail_ru')`,
          name: 'Все посетители',
          preset: 'sources_search_phrases',
        },
        {
          filters: `ym:s:visitDuration > 120 AND ym:s:pageViews > 3 AND ym:s:lastSearchEngineRoot =. ('Yandex','Google','Bing','Mail_ru')`,
          name: 'Ядро',
          preset: 'sources_search_phrases',
        },
      ],
      timeout: 2000,
    },
    technology: {
      name: 'Технологии',
      subParts: [
        {
          dimensions: 'ym:s:deviceCategory',
          filters: '',
          metrics: ['ym:s:users'],
          name: 'Устройства (Все посетители)',
        },
        {
          dimensions: 'ym:s:deviceCategory',
          filters: `ym:s:visitDuration > 120 AND ym:s:pageViews > 3`,
          metrics: ['ym:s:users'],
          name: 'Устройства (Ядро)',
        },
        {
          dimensions: 'ym:s:browser',
          filters: '',
          metrics: ['ym:s:users'],
          name: 'Браузеры (Все посетители)',
        },
        {
          dimensions: 'ym:s:browser',
          filters: `ym:s:visitDuration > 120 AND ym:s:pageViews > 3`,
          metrics: ['ym:s:users'],
          name: 'Браузеры (Ядро)',
        },
        {
          dimensions: 'ym:s:screenWidth',
          filters: '',
          metrics: ['ym:s:users'],
          name: 'Разрешение дисплея (Все посетители)',
        },
        {
          dimensions: 'ym:s:screenWidth',
          filters: `ym:s:visitDuration > 120 AND ym:s:pageViews > 3`,
          metrics: ['ym:s:users'],
          name: 'Разрешение дисплея (Ядро)',
        },
      ],
      timeout: 2500,
    },
    trafficSource: {
      name: 'Источник трафика',
      subParts: [
        {
          filters: '',
          metrics: ['ym:s:users'],
          name: 'Все пользователи',
        },
        {
          filters: 'ym:s:visitDuration > 120 AND ym:s:pageViews > 3',
          metrics: ['ym:s:users'],
          name: 'Ядро',
        },
      ],
      timeout: 1500,
    },
    users: {
      name: 'Пользователи',
    },
    visits: {
      name: 'Посещаемость',
      subParts: [
        {
          filters: '',
          metrics: [
            'ym:s:users',
            'ym:s:visits',
            'ym:s:pageviews',
            'ym:s:bounceRate',
            'ym:s:pageDepth',
            'ym:s:avgVisitDurationSeconds',
          ],
          name: 'Все посетители',
        },
        {
          filters: 'ym:s:visitDuration > 120 AND ym:s:pageViews > 3',
          metrics: [
            'ym:s:users',
            'ym:s:visits',
            'ym:s:pageviews',
            'ym:s:bounceRate',
            'ym:s:pageDepth',
            'ym:s:avgVisitDurationSeconds',
          ],
          name: 'Ядро',
        },
      ],
      timeout: 0,
    },
  },
  popularPageRows: 10,
  respType: 'token',
  saveButtonText: 'Получить отчет',
  searchPhrasesRows: 6,
  technologyRows: 5,
};
