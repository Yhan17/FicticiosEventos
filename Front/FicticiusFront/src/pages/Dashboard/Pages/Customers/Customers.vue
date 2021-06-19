<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>perm_contact_calendar</md-icon>
          </div>
          <div class="md-layout">
            <div class="md-layout-item"><h4 class="title">Customers</h4></div>
            <div class="md-layout-item md-layout md-alignment-center-right">
              <form-customer
                class="md-simple md-indigo md-lg"
                style="float: right"
                @updateList="getCustomers"
              />
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div v-if="customers != null">
            <md-table v-model="customers" table-header-color="green">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                key="item.id"
              >
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Telefone">{{
                  item.phone
                }}</md-table-cell>
                <md-table-cell md-label="Telefone Adicional">{{
                  item.phoneAdditional
                }}</md-table-cell>
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Ação">
                  <div class="flex">
                    <show-customer class="action-item" :customer="item" />

                    <form-customer
                      class="md-simple md-indigo md-lg action-item"
                      :id="item.id"
                      :type="'update'"
                      @updateList="getCustomers"
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
import FormCustomer from "./Components/FormCustomer.vue";
import ShowCustomer from "./Components/ShowCustomer.vue";
export default {
  mixins: [formMixin],
  data() {
    return {
      customers: [],
      selected: [],
      tableData: [],
      per_page: 0,
      total: 0,
      page: 1,
      modal: "",
    };
  },
  components: {
    FormCustomer,
    ShowCustomer,
  },
  created() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      let loader = this.$loading.show({
        color: "#007BFF",
        height: 128,
        width: 128,
      });
      try {
        await this.$store.dispatch("customers/index");
        this.customers = await this.$store.getters["customers/index"];
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