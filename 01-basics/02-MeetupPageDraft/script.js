import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      rawMeetup: null,
      agendaItemIcons,
      agendaItemTitles
    }
  },

  mounted() {
    this.fetchMeetup() // Требуется получить данные митапа с API
  },

  computed: {
    meetup() {
      let meetup = this.rawMeetup;
      if (!meetup) return null;
      return {
        ...meetup,
        cover: meetup.imageId ? getMeetupCoverLink(meetup) : undefined,
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        ISODate: new Date(meetup.date).toISOString().substr(0, 10),
        agenda: meetup.agenda.map((agendaItem) => ({
          ...agendaItem,
          icon: agendaItem.type ? agendaItemIcons[agendaItem.type] : agendaItemIcons[other]
        }))
      }
    },
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом, а не писать прямо в mounted()
    async fetchMeetup() {
      let rawMeetup = await fetch(`${API_URL}/meetups/${MEETUP_ID}`);
      if (rawMeetup.ok) {
        let json = await rawMeetup.json();
        this.rawMeetup = json;
      } else {
        alert("Ошибка HTTP: " + rawMeetup.status);
      }
    },
  },
});
