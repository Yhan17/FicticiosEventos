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
              <form @submit.prevent="submit">
                <div style="display: flex; width: 700px">
                  <div class="md-layout">
                    <div class="md-layout-item">
                      <md-field class="form-group md-invalid" slot="inputs">
                        <md-icon>badge</md-icon>
                        <label>Link do site do cliente</label>
                        <md-input
                          v-model="aux.link"
                          type="text"
                          required
                          @change="previewImages"
                          maxlength="60"
                        />
                        <validation-error :errors="apiValidationErrors.title" />
                      </md-field>
                    </div>
                    <div class="md-layout-item">
                      <md-field class="form-group md-invalid" slot="inputs">
                        <md-icon>badge</md-icon>
                        <label>Agendamento </label>
                        <md-select v-model="aux.scheduleId" required>
                          <md-option
                            v-for="(item, index) in schedules"
                            :value="item.id"
                            :key="index"
                            >{{ item.title + "-" + item.date }}</md-option
                          >

                          <validation-error
                            :errors="apiValidationErrors.scheduleId"
                          />
                        </md-select>
                        <validation-error :errors="apiValidationErrors.title" />
                      </md-field>
                    </div>
                  </div>
                  <md-button
                    class="md-primary"
                    style="float: right"
                    type="submit"
                    >Enviar</md-button
                  >
                </div>
              </form>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div v-if="images.length">
            <div v-for="(item, index) in images" :key="index">
              <img :src="item" />
              <md-button @click="removeImg(index)">Remover imagem</md-button>
            </div>
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
import cheerio from "cheerio";
import axios from "axios";
export default {
  mixins: [formMixin],
  data() {
    return {
      aux: {},
      images: [],
      schedules: [],
      selected: [],
      tableData: [],
      per_page: 0,
      total: 0,
      page: 1,
      modal: "",
    };
  },
  components: {},
  created() {
    this.fetchData();
  },
  methods: {
    async previewImages() {
      const { data } = await axios.get(this.aux.link, {
        transformRequest: (data, headers) => {
          delete headers.common["authorization"];
          return data;
        },
      });
      const $ = cheerio.load(data);
      const images = [];
      $("img").each((index, element) => {
        const src = $(element).attr("src");
        if (src.includes("http")) images.push(src);
      });
      console.log(images);
      this.images = images;
    },
    removeImg(index) {
      this.images.splice(index, 1);
    },
    async submit() {
      try {
        const self = this;

        const data = this.images.map((url) => ({
          link: url,
          scheduleId: self.aux.scheduleId,
        }));
        await this.$store.dispatch("publicService/storeImages", data);
        await this.$store.dispatch(
          "alerts/success",
          "Images added with sucess."
        );
        this.$router.push({
          name: "Agendamentos",
        });
      } catch (e) {
        console.log(e);
      }
    },
    async fetchData() {
      try {
        await this.$store.dispatch("schedule/index");
        this.schedules = await this.$store.getters["schedule/index"];
      } catch (error) {
        console.log(error);
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