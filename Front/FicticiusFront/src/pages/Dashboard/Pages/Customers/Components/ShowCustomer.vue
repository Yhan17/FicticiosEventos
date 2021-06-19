<template>
  <div>
    <md-button
      @click="showDialog = true"
      class="md-icon-button md-raised md-primary"
    >
      <md-icon>visibility</md-icon>
    </md-button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title class="title"
        >Cliente {{ customer.id }} | {{ customer.name }}</md-dialog-title
      >
      <md-dialog-content>
        <h4>
          Nome:
          <span>{{ customer.name }}</span>
        </h4>
        <h4>
          Email:
          <span>{{ customer.email }}</span>
        </h4>
        <h4>
          Telefone:
          <span>{{ customer.phone }}</span>
        </h4>
        <h4>
          Telefone Adicional:
          <span>{{ customer.phoneAdditional || "Não Possui" }}</span>
        </h4>
        <h4>
          Ativo:
          <span>{{ customer.active ? "Sim" : "Não" }}</span>
        </h4>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-secondary" @click="showDialog = false"
          >Fechar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
    };
  },
  props: {
    customer: {
      type: Object,
    },
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