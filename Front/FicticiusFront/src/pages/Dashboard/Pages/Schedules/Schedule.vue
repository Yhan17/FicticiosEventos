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
              <h4 class="title">Agenda de Eventos</h4>
            </div>
            <div class="md-layout-item md-layout md-alignment-center-right">
              <md-button @click="redirectToCreate()">Criar Evento</md-button>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <FullCalendar ref="fullCalendar" :options="calendarOptions" />
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import formMixin from "@/mixins/form-mixin";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import $ from "jquery";
const url = process.env.VUE_APP_API_BASE_URL;
export default {
  mixins: [formMixin],
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    let self = this;
    return {
      loader: "",
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prevYear,prev,next,nextYear today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,timeGridDay",
        },
        allDaySlot: false,
        navLinks: true,
        droppable: false,
        timeZone: "local",
        editable: false,
        businessHours: false,
        events: function (fetchInfo, successCallback, failureCallback) {
          $.ajax({
            url: url + "/Schedules",
            method: "GET",
            data: {
              start: fetchInfo.startStr,
              end: fetchInfo.endStr,
            },
            headers: {
              Authorization:
                "Bearer " +
                localStorage.getItem("vue-authenticate.vueauth_access_token"),
            },
            success: function (response) {
              let events = [];
              $(response).each(function (index, value) {
                events.push({
                  id: value.id,
                  title: value.description,
                  start: value.dayTime,
                  end: value.dayTime,
                  extendedProps: {
                    description: value.description,
                    customer: value.customer,
                  },
                });
              });
              successCallback(events);
            },
          });
        },
        eventClick: function (element) {
          self.$refs.showCommitment.openDialog(element.event.id);
        },
        loading: function (isLoading) {
          self.loading(isLoading);
        },
        initialView: "dayGridMonth",
        locale: "pt-br",
      },
    };
  },
  methods: {
    loading(status) {
      if (!status) {
        this.loader.hide();
      } else {
        this.loader = this.$loading.show({
          color: "#007BFF",
          height: 128,
          width: 128,
        });
      }
    },
    reloadEvents() {
      this.$refs.fullCalendar.getApi().refetchEvents();
    },
    redirectToCreate() {
      this.$router.push({ name: "Criar Evento" });
    },
  },
};
</script>

<style scoped>
.table-transparent {
  background-color: transparent !important;
}
.mt-0 {
  margin-top: 0 !important;
}
.md-dialog /deep/.md-dialog-container {
  width: 500px;
}
.flex {
  display: flex;
}
.flex .action-item {
  margin-right: 8px;
}
.pagination-div {
  display: flex;
  justify-content: flex-end;
}
</style>