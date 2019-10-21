export const config = {
  api: 'https://api-metrika.yandex.net/stat/v1/data/bytime',
  clientId: 'c1b491bd74e84df4b313d39846f27907',
  getTokenText: 'Нет OAuth токена?',
  glossary: {
    'ym:s:avgVisitDurationSeconds': 'Время на сайте (минуты)',
    'ym:s:bounceRate': 'Отказы (%)',
    'ym:s:pageDepth': 'Глубина просмотра (страницы)',
    'ym:s:pageviews': 'Просмотры',
    'ym:s:users': 'Посетители',
    'ym:s:visits': 'Визиты',
  },
  oauthFormTitle: 'OAuth Авторизация',
  oauthUrl: 'https://oauth.yandex.ru/authorize',
  parts: {
    content: {
      name: '2. Контент',
      subParts: [
        {
          metrics: [
            'ym:s:goal<goal_id>conversionRate',
            'ym:s:goal<goal_id>reaches',
            'ym:s:goal<goal_id>visits',
          ],
        },
      ],
    },
    technology: {
      name: '5. Технологии',
    },
    traffic: {
      name: '3. Трафик',
    },
    users: {
      name: '4. Пользователи',
    },
    visits: {
      name: '1. Посещаемость',
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
          name: '1.1 Все посетители',
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
          name: '1.2 Ядро',
        },
      ],
    },
  },
  respType: 'token',
  saveButtonText: 'OK',
};
