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
              <div style="display: flex; width: 700px">
                <md-field @change="previewFiles">
                  <label>Envie aqui os Novos Clientes (csv,xlsx,xls)</label>
                  <md-file v-model="metaDataFile" @change="previewFiles" />
                </md-field>
                <md-button
                  class="md-primary"
                  :disabled="customers.length == 0"
                  style="float: right"
                  type="submit"
                  @click="submit"
                  >Enviar Novos Clientes</md-button
                >
              </div>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div v-if="customers.length">
            <md-table v-model="customers" table-header-color="green">
              <md-table-row
                slot="md-table-row"
                slot-scope="{ item }"
                key="item.id"
              >
                <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Telefone">{{
                  item.phone
                }}</md-table-cell>
                <md-table-cell md-label="Telefone Adicional">{{
                  item.phoneAdditional
                }}</md-table-cell>
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Ativo">{{
                  item.active ? "Sim" : "Não"
                }}</md-table-cell>
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
import XLSX from "xlsx";
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
  components: {},
  created() {},
  methods: {
    previewFiles(e) {
      let files = e.target.files,
        f = files[0];
      let reader = new FileReader();
      const self = this;
      reader.onload = function (e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        /* DO SOMETHING WITH workbook HERE */
        console.log(workbook);
        let worksheet = workbook.Sheets[sheetName];
        const excell = XLSX.utils.sheet_to_json(worksheet);
        self.customers = excell.map((o) => ({
          ...o,
          active: JSON.parse(o.active),
        }));
      };
      reader.readAsArrayBuffer(f);
    },
    async submit() {
      try {
        await this.$store.dispatch("publicService/store", this.customers);
        await this.$store.dispatch(
          "alerts/success",
          "Customers added with sucess."
        );
        this.customer = [];
        this.$router.push({
          name: "Customers",
        });
      } catch (e) {
        console.log(e);
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