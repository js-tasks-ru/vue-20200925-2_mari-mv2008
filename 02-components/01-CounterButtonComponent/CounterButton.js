export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: '<button type="button" v-on:click="increment">{{count}}</button>',

  // Компонент должен иметь входной параметр
  // Компонент должен иметь модель
  model: {
    prop: 'count',
    event: 'increment'
  },
  props: {
    count: {
      name: 'Numeric',
      type: Number,
      required: false,
      default: 0
    } 
  },
  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    increment() {
        return this.$emit('increment', this.count + 1);
    }
  }
};
