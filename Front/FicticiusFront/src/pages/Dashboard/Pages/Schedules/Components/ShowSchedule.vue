<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>today</md-icon>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <h4 class="title">Visualizar Evento</h4>
            </div>
            <div
              class="md-layout-item md-layout md-alignment-center-right"
            ></div>
          </div>
        </md-card-header>
        <md-card-content>
          <div>
            <h4>
              Titulo:
              <span>{{ schedule.title }}</span>
            </h4>
            <h4>
              Preço:
              <span>{{ schedule.price }}</span>
            </h4>
            <h4>
              Criado:
              <span>{{ formatCreated(schedule.createdDate) }}</span>
            </h4>
            <h4>
              Data:
              <span>{{ formatCreated(schedule.date) }}</span>
            </h4>
            <h4>
              Distancia até o evento:
              <span>{{ scheduleDistance(schedule.date) }}</span>
            </h4>
            <h4>
              Tipo de Agendamento:
              <span>{{ schedule.scheduleType.title }}</span>
            </h4>
            <h4>
              Cliente:
              <span>{{ schedule.customer.name }}</span>
            </h4>
            <h4>
              Endereço:
              <span>{{ schedule.address.name }}</span>
            </h4>
            <h4>
              Descrição:
              <span>{{ schedule.description }}</span>
            </h4>
            <h4>
              Imagens:
              <img
                v-for="(item, index) in schedule.images"
                :key="index"
                :src="item.link"
              />
            </h4>

            <md-button
              class="md-primary"
              @click="sendToEdit"
              style="float: right"
              >Editar</md-button
            >
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { formatDistance, format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
export default {
  data() {
    return {
      schedule: {},
    };
  },
  methods: {
    async fetchSchedule() {
      await this.$store.dispatch("schedule/show", this.$route.params.id);
      this.schedule = await this.$store.getters["schedule/show"];
    },
    sendToEdit() {
      this.$router.push({
        name: "Editar Evento",
        params: { id: this.$route.params.id },
      });
    },
    formatCreated(date) {
      return format(parseISO(date), "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
        locale: ptBR,
      });
    },
    scheduleDistance(date) {
      return formatDistance(new Date(date), new Date(), { locale: ptBR });
    },
  },
  created() {
    this.fetchSchedule();
  },
};
</script>

<style scoped>
.md-dialog /deep/.md-dialog-container {
  width: 800px;
}
h4 {
  font-weight: bold;
}
h4 > span {
  font-weight: normal;
  font-style: italic;
}
h4,
span {
  word-wrap: break-word;
  text-align: justify;
}
.title {
  font-size: 150%;
}
</style>