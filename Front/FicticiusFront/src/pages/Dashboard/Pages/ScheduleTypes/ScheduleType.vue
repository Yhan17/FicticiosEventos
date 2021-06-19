<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>perm_contact_calendar</md-icon>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <h4 class="title">Tipo de Agendamentos</h4>
            </div>
            <div class="md-layout-item md-layout md-alignment-center-right">
              <form-schedule-type
                class="md-simple md-indigo md-lg"
                style="float: right"
                @updateList="getScheduleType"
              />
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div v-if="scheduletype != null">
            <md-table v-model="scheduletype" table-header-color="green">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                key="item.id"
              >
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Título">{{
                  item.title
                }}</md-table-cell>
                <md-table-cell md-label="Descrição">{{
                  item.description
                }}</md-table-cell>
                <md-table-cell md-label="Ação">
                  <div class="flex">
                    <show-schedule-type
                      class="action-item"
                      :scheduletype="item"
                    />

                    <form-schedule-type
                      class="md-simple md-indigo md-lg action-item"
                      :id="item.id"
                      :type="'update'"
                      @updateList="getScheduleType"
                    />
                  </div>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <div v-else>
            <span>Não Foram Encontrado Dados</span>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import formMixin from "@/mixins/form-mixin";
import FormScheduleType from "./Components/FormScheduleType.vue";
import ShowScheduleType from "./Components/ShowScheduleType.vue";
export default {
  mixins: [formMixin],
  data() {
    return {
      scheduletype: [],
      selected: [],
      tableData: [],
      per_page: 0,
      total: 0,
      page: 1,
      modal: "",
    };
  },
  components: {
    FormScheduleType,
    ShowScheduleType,
  },
  created() {
    this.getScheduleType();
  },
  methods: {
    async getScheduleType() {
      let loader = this.$loading.show({
        color: "#007BFF",
        height: 128,
        width: 128,
      });
      try {
        await this.$store.dispatch("scheduletype/index");
        this.scheduletype = await this.$store.getters["scheduletype/index"];
      } catch (e) {
        console.log(e.response);
      } finally {
        loader.hide();
      }
    },
    getClass: ({ id }) => ({
      "table-success": id === 1,
      "table-info": id === 3,
      "table-danger": id === 5,
      "table-warning": id === 7,
    }),
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