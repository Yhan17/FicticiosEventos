<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <i class="fab fa-twitter"></i>
          </div>
          <p class="category">Seguidores no Twitter</p>
          <h3 class="title">+245</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>update</md-icon>
            Just Updated
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="rose">
        <template slot="header">
          <div class="card-icon">
            <md-icon>equalizer</md-icon>
          </div>
          <p class="category">Visitas no site dos clientes</p>
          <h3 class="title">75.521</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>local_offer</md-icon>
            Tracked from Google Analytics
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>store</md-icon>
          </div>
          <p class="category">Arrecadação</p>
          <h3 class="title">$ 34.245</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>date_range</md-icon>
            Últimos Eventos Cadastrados
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>weekend</md-icon>
          </div>
          <p class="category">Horas Sem trabalhar</p>
          <h3 class="title">184</h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon class="text-danger">warning</md-icon>
            <a href="#pablo">Sem Tempo Irmão.</a>
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item">
      <chart-card
        :chart-data="dailySalesChart.data"
        :chart-options="dailySalesChart.options"
        chart-type="Line"
        chart-inside-header
        background-color="green"
      >
        <md-button class="md-simple md-info md-just-icon" slot="first-button">
          <md-icon>refresh</md-icon>
          <md-tooltip md-direction="bottom">Refresh</md-tooltip>
        </md-button>
        <md-button class="md-simple md-just-icon" slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Change Date</md-tooltip>
        </md-button>

        <template slot="content">
          <h4 class="title">Arrecadação com ultimos eventos</h4>
          <p class="category">
            <span class="text-success"
              ><i class="fas fa-long-arrow-alt-up"></i>
              N%
            </span>
            Já da pra comprar um corsa.
          </p>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>access_time</md-icon>
            updated 32/01/2021
          </div>
        </template>
      </chart-card>
    </div>
  </div>
</template>

<script>
import { StatsCard, ChartCard } from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
  },

  data() {
    return {
      product1: process.env.VUE_APP_BASE_URL + "/img/card-2.jpg",
      product2: process.env.VUE_APP_BASE_URL + "/img/card-3.jpg",
      product3: process.env.VUE_APP_BASE_URL + "/img/card-1.jpg",
      seq2: 0,

      selected: [],
      firstTabs: [
        {
          tab: 'Sign contract for "What are conference organizers afraid of?"',
        },
        {
          tab: "Lines From Great Russian Literature? Or E-mails From My Boss?",
        },
        {
          tab: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
        },
        { tab: "Create 4 Invisible User Experiences you Never Knew About" },
      ],
      secondTabs: [
        {
          tab: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
        },
        {
          tab: 'Sign contract for "What are conference organizers afraid of?"',
        },
      ],
      thirdTabs: [
        {
          tab: "Lines From Great Russian Literature? Or E-mails From My Boss?",
        },
        {
          tab: "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
        },
        {
          tab: 'Sign contract for "What are conference organizers afraid of?"',
        },
      ],

      users: [
        {
          id: 1,
          name: "Noelia O'Kon",
          salary: "13098.00",
          country: "Niger",
        },
        {
          id: 2,
          name: "Mr. Enid Von PhD",
          salary: "35978.00",
          country: "Curaçao",
        },
        {
          id: 3,
          name: "Colton Koch",
          salary: "26278.00",
          country: "Netherlands",
        },
        {
          id: 4,
          name: "Gregory Vandervort",
          salary: "25537.00",
          country: "South Korea",
        },
      ],
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },

  methods: {
    onSelect: function (items) {
      this.selected = items;
    },
  },
};
</script>
