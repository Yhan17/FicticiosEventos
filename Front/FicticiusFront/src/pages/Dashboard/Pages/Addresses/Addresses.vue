<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>perm_contact_calendar</md-icon>
          </div>
          <div class="md-layout">
            <div class="md-layout-item"><h4 class="title">Endereços</h4></div>
            <div class="md-layout-item md-layout md-alignment-center-right">
              <form-address
                class="md-simple md-indigo md-lg"
                style="float: right"
                @updateList="getAddress"
              />
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div v-if="address.length != 0">
            <md-table v-model="address" table-header-color="green">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                key="item.id"
              >
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Bairro">{{
                  item.district
                }}</md-table-cell>
                <md-table-cell md-label="Ativo">{{
                  item.active ? "Sim" : "Não"
                }}</md-table-cell>
                <md-table-cell md-label="Ação">
                  <div class="flex">
                    <show-address class="action-item" :address="item" />

                    <form-address
                      class="md-simple md-indigo md-lg action-item"
                      :id="item.id"
                      :type="'update'"
                      @updateList="getAddress"
                    />
                    <md-button
                      @click="inactive(item)"
                      class="md-icon-button md-raised md-primary"
                    >
                      <md-icon>lock</md-icon>
                    </md-button>
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
import FormAddress from "./Components/FormAddress.vue";
import ShowAddress from "./Components/ShowAddress.vue";
export default {
  mixins: [formMixin],
  data() {
    return {
      address: [],
      selected: [],
      tableData: [],
      per_page: 0,
      total: 0,
      page: 1,
      modal: "",
    };
  },
  components: {
    FormAddress,
    ShowAddress,
  },
  created() {
    this.getAddress();
  },
  methods: {
    async getAddress() {
      let loader = this.$loading.show({
        color: "#007BFF",
        height: 128,
        width: 128,
      });
      try {
        await this.$store.dispatch("address/index");
        this.address = await this.$store.getters["address/index"];
      } catch (e) {
        console.log(e.response);
      } finally {
        loader.hide();
      }
    },
    async inactive(item) {
      let loader = this.$loading.show({
        color: "#007BFF",
        height: 128,
        width: 128,
      });
      try {
        item.active = !item.active;
        await this.$store.dispatch("address/update", { ...item });
      } catch (e) {
        console.log(e.response);
      } finally {
        loader.hide();
        this.getAddress();
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