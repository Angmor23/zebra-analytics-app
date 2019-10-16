export const config = {
  api: 'https://api-metrika.yandex.net/stat/v1/data/bytime',
  clientId: 'c1b491bd74e84df4b313d39846f27907',
  getTokenText: 'Нет OAuth токена?',
  metrics: [
    'ym:s:users', // Посетители
    'ym:s:visits', // Визиты
    'ym:s:pageviews', // Просмотры
    'ym:s:bounceRate', // Отказы
    'ym:s:pageDepth', // Глубина просмотра
    'ym:s:avgVisitDurationSeconds', // Время на сайте (second)
    // 'ym:s:goal<goal_id>users'
  ],
  oauthFormTitle: 'OAuth Авторизация',
  oauthUrl: 'https://oauth.yandex.ru/authorize',
  respType: 'token',
  saveButtonText: 'OK',
};
