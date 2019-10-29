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
      timeout: 1000,
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
      timeout: 2000,
    },
    technology: {
      name: 'Технологии',
    },
    traffic: {
      name: 'Трафик',
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
  saveButtonText: 'OK',
};
