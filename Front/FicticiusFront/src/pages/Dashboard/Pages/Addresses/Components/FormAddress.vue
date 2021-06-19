<template>
  <div>
    <md-button
      v-if="type == 'store'"
      @click="openDialog"
      class="md-raised md-primary"
      >Adicionar Novo</md-button
    >
    <md-button
      v-else
      @click="openDialog"
      class="md-icon-button md-raised md-primary"
    >
      <md-icon>mode</md-icon>
    </md-button>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title
        >Adicionar Local de Realização de Eventos</md-dialog-title
      >
      <form @submit.prevent="submit">
        <md-dialog-content>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field class="form-group md-invalid" slot="inputs">
                <md-icon>badge</md-icon>
                <label>Nome do local</label>
                <md-input
                  v-model="address.name"
                  type="text"
                  required
                  maxlength="60"
                />
                <validation-error :errors="apiValidationErrors.name" />
              </md-field>
              <md-field class="form-group md-invalid" slot="inputs">
                <md-icon>badge</md-icon>
                <label>Bairro</label>
                <md-input
                  v-model="address.district"
                  type="text"
                  required
                  maxlength="60"
                />
                <validation-error :errors="apiValidationErrors.district" />
              </md-field>
            </div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">
              <md-field class="form-group md-invalid" slot="inputs">
                <md-icon>badge</md-icon>
                <label>Endereço completo</label>
                <md-textarea
                  v-model="address.fullAddress"
                  type="text"
                  required
                  maxlength="60"
                />
                <validation-error :errors="apiValidationErrors.fullAddress" />
              </md-field>
            </div>
          </div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-secondary" @click="showDialog = false"
            >Fechar</md-button
          >
          <md-button class="md-primary" type="submit">Enviar</md-button>
        </md-dialog-actions>
      </form>
    </md-dialog>
  </div>
</template>

<script>
import { ValidationError } from "@/components";
import formMixin from "@/mixins/form-mixin";
export default {
  name: "form-address",
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
      address: {
        name: "",
        district: "",
        fullAddress: "",
        active: true,
      },
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
        await this.$store.dispatch("address/show", this.id);
        let object = await this.$store.getters["address/show"];
        console.log("Object", object);
        console.log(this.address);
        Object.assign(this.address, object);
        loader.hide();
      }
      this.showDialog = !this.showDialog;
    },
    // Send form, verifying if the type is store or other (Update)
    async submit() {
      let loader = this.$loading.show({
        color: "#007BFF",
        height: 128,
        width: 128,
      });
      try {
        if (this.type === "store") {
          const test = await this.$store.dispatch(
            "address/store",
            this.address
          );
          console.log(test);
          await this.$store.dispatch(
            "alerts/success",
            "Customer added with sucess."
          );
          this.address = {};
        } else {
          await this.$store.dispatch("address/update", this.address, this.id);
          await this.$store.dispatch(
            "alerts/success",
            "Customer updated with sucess."
          );
        }
        this.showDialog = false;
        this.$emit("updateList");
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