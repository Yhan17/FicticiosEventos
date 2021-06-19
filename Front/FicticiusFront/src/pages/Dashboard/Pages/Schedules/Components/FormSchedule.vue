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
              <h4 class="title">Criação de Eventos</h4>
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
                      type="text"
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

                    <md-select v-model="schedule.customer">
                      <md-option value="1">Seu joão cara de pão</md-option>
                      <md-option value="2">Godfather</md-option>
                      <md-option value="3">Godfather II</md-option>
                      <md-option value="4">Godfather III</md-option>
                      <md-option value="5">Godfellas</md-option>
                      <md-option value="6">Pulp Fiction</md-option>
                      <md-option value="7">Scarface</md-option>
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

                    <md-select v-model="schedule.address">
                      <md-option value="1">Seu joão cara de pão</md-option>
                      <md-option value="2">Godfather</md-option>

                      <validation-error :errors="apiValidationErrors.address" />
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>Tipo de Agendamento</label>

                    <md-select v-model="schedule.scheduleType">
                      <md-option value="1">Seu joão cara de pão</md-option>
                      <md-option value="2">Godfather</md-option>

                      <validation-error
                        :errors="apiValidationErrors.scheduleType"
                      />
                    </md-select>
                  </md-field>
                </div>
              </div>
              <div class="md-layout">
                <div class="md-layout-item">
                  <md-datepicker v-model="schedule.dayTime" md-immediately />
                </div>
                <div class="md-layout-item">
                  <md-field class="form-group md-invalid" slot="inputs">
                    <md-icon>badge</md-icon>
                    <label>hora</label>
                    <md-input v-model="schedule.time" type="time" required />
                    <validation-error :errors="apiValidationErrors.time" />
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
    };
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
    // Send form, verifying if the type is store or other (Update)
    async submit() {
      console.log(this.schedule);
      // let loader = this.$loading.show({
      //   color: "#007BFF",
      //   height: 128,
      //   width: 128,
      // });
      // try {
      //   if (this.type === "store") {
      //     const test = await this.$store.dispatch(
      //       "schedule/store",
      //       this.schedule
      //     );
      //     console.log(test);
      //     await this.$store.dispatch(
      //       "alerts/success",
      //       "Customer added with sucess."
      //     );
      //     this.schedule = {};
      //   } else {
      //     await this.$store.dispatch("schedule/update", this.schedule, this.id);
      //     await this.$store.dispatch(
      //       "alerts/success",
      //       "Customer updated with sucess."
      //     );
      //   }
      //   this.showDialog = false;
      //   this.$emit("updateList");
      // } catch (e) {
      //   this.setApiValidation(e.response.data.data);
      //   for (const [key, value] of Object.entries(e.response.data.data)) {
      //     await this.$store.dispatch("alerts/error", value[0]);
      //   }
      // } finally {
      //   loader.hide();
      // }
    },
  },
};
</script>

<style scoped>
.md-dialog /deep/.md-dialog-container {
  width: 800px;
}
</style>