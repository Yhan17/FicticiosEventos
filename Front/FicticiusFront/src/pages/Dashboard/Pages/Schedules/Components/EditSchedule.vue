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
              <h4 class="title">Edição de Eventos</h4>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div>
            <form @submit.prevent="submit">
              <div class="md-layout">
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>Titulo</label>
                    <md-input
                      v-model="schedule.title"
                      type="text"
                      required
                      maxlength="60"
                    />
                    <validation-error :errors="apiValidationErrors.title" />
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>Valor</label>
                    <span class="md-prefix">$</span>
                    <md-input
                      v-model="schedule.price"
                      type="number"
                      required
                      maxlength="60"
                    />
                    <validation-error :errors="apiValidationErrors.title" />
                  </md-field>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>Cliente</label>

                    <md-select v-model="schedule.customerId">
                      <md-option
                        v-for="(item, index) in customers"
                        :value="item.id"
                        :key="index"
                        :disabled="!item.active"
                        >{{ item.name }}</md-option
                      >

                      <validation-error
                        :errors="apiValidationErrors.customer"
                      />
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>Endereço</label>

                    <md-select v-model="schedule.addressId">
                      <md-option
                        v-for="(item, index) in address"
                        :value="item.id"
                        :key="index"
                        :title="item.description"
                        :disabled="!item.active"
                        >{{ item.name }}</md-option
                      >

                      <validation-error :errors="apiValidationErrors.address" />
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>Tipo de Agendamento</label>

                    <md-select v-model="schedule.scheduleTypeId">
                      <md-option
                        v-for="(item, index) in scheduletype"
                        :value="item.id"
                        :key="index"
                        :title="item.description"
                        :disabled="!item.active"
                        >{{ item.title }}</md-option
                      >

                      <validation-error
                        :errors="apiValidationErrors.scheduleType"
                      />
                    </md-select>
                  </md-field>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>hora</label>
                    <md-input
                      v-model="schedule.date"
                      type="datetime-local"
                      required
                    />
                    <validation-error :errors="apiValidationErrors.date" />
                  </md-field>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item">
                  <md-field>
                    <label>Description</label>
                    <md-textarea v-model="schedule.description"></md-textarea>
                    <md-icon>description</md-icon>
                  </md-field>
                </div>
              </div>
              <md-button class="md-primary" style="float: right" type="submit"
                >Enviar</md-button
              >
            </form>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { ValidationError } from "@/components";
import formMixin from "@/mixins/form-mixin";
export default {
  name: "form-schedule",
  components: {
    ValidationError,
  },
  props: {
    type: {
      type: String,
      default: "store",
    },
    id: {
      type: Number,
    },
  },
  mixins: [formMixin],
  data() {
    return {
      showDialog: false,
      schedule: {},
      customers: [],
      address: [],
      scheduletype: [],
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.getSchedule();
  },
  methods: {
    async openDialog() {
      // If in the parent component the type value is different the "Store", it will enter in update method
      if (this.type !== "store") {
        let loader = this.$loading.show({
          color: "#007BFF",
          height: 128,
          width: 128,
        });
        await this.$store.dispatch("schedule/show", this.id);
        let object = await this.$store.getters["schedule/show"];
        console.log("Object", object);
        console.log(this.schedule);
        Object.assign(this.schedule, object);
        loader.hide();
      }
      this.showDialog = !this.showDialog;
    },
    async fetchData() {
      let loader = this.$loading.show({
        color: "#007BFF",
        height: 128,
        width: 128,
      });
      try {
        await this.$store.dispatch("address/index");
        this.address = await this.$store.getters["address/index"];
        await this.$store.dispatch("customers/index");
        this.customers = await this.$store.getters["customers/index"];
        await this.$store.dispatch("scheduletype/index");
        this.scheduletype = await this.$store.getters["scheduletype/index"];
      } catch (e) {
        console.log(e.response);
      } finally {
        loader.hide();
      }
    },
    async getSchedule() {
      await this.$store.dispatch("schedule/show", this.$route.params.id);
      let object = await this.$store.getters["schedule/show"];
      Object.assign(this.schedule, object);
    },
    // Send form, verifying if the type is store or other (Update)
    async submit() {
      console.log(this.schedule);
      let loader = this.$loading.show({
        color: "#007BFF",
        height: 128,
        width: 128,
      });
      try {
        this.schedule.price = +this.schedule.price;

        await this.$store.dispatch("schedule/update", this.schedule, this.id);
        await this.$store.dispatch(
          "alerts/success",
          "Schedule updated with sucess."
        );
        this.$router.push({
          name: "Agendamentos",
        });
      } catch (e) {
        this.setApiValidation(e.response.data.data);
        for (const [key, value] of Object.entries(e.response.data.data)) {
          await this.$store.dispatch("alerts/error", value[0]);
        }
      } finally {
        loader.hide();
      }
    },
  },
};
</script>

<style scoped>
.md-dialog /deep/.md-dialog-container {
  width: 800px;
}
</style>