<template>
  <Page :actionBarHidden="false">
    <ActionBar backgroundColor="#049c88" android:flat="true">
      <Label
      textWrap="true"
        :text="
          identifiedContainer
            ? `${identifiedContainer.uploaderaccountname}: ${identifiedContainer.bic_code} - ${identifiedContainer.serial_number}-${identifiedContainer.check_digit}`
            : ''
        "
      ></Label>
    </ActionBar>
    <grid-layout>
      <TabView
        android:tabBackgroundColor="#049c88"
        android:tabTextColor="#c4ffdf"
        android:selectedTabTextColor="#ffffff"
        androidSelectedTabHighlightColor="#ffffff"
      >
        <TabViewItem title="Physical characteristics">
          <RadListView for="(item, index) in physical" :key="index">
            <v-template>
              <StackLayout class="card-layout">
                <Label class="h2" :text="item.title" />
                <RadListView for="(label, index) in item.labels" :key="index">
                  <v-template>
                    <Label class="body" textWrap="true" :text="`${label.name}${label.value || ''}`" />
                  </v-template>
                </RadListView>
              </StackLayout>
            </v-template>
          </RadListView>
        </TabViewItem>
        <TabViewItem title="Dimensions">
          <RadListView for="(item, index) in dimensions" :key="index">
            <v-template>
              <StackLayout class="card-layout">
                <Label class="h2" :text="item.title" />
                <RadListView for="(label, index) in item.labels" :key="index">
                  <v-template>
                    <Label class="body" textWrap="true" :text="`${label.name}${label.value || ''}`" />
                  </v-template>
                </RadListView>
              </StackLayout>
            </v-template>
          </RadListView>
        </TabViewItem>
        <TabViewItem title="Manufacturer Data">
          <RadListView for="(item, index) in manufacturers" :key="index">
            <v-template>
              <StackLayout class="card-layout">
                <Label class="h2" :text="item.title" />
                <RadListView for="(label, index) in item.labels" :key="index">
                  <v-template>
                    <Label class="body" textWrap="true" :text="`${label.name}${label.value || ''}`" />
                  </v-template>
                </RadListView>
              </StackLayout>
            </v-template>
          </RadListView>
        </TabViewItem>
        <TabViewItem title="One door off Operations">
          <RadListView for="(item, index) in operations" :key="index">
            <v-template>
              <StackLayout class="card-layout">
                <Label class="h2" :text="item.title" />
                <RadListView for="(label, index) in item.labels" :key="index">
                  <v-template>
                    <Label class="body" textWrap="true" :text="`${label.name}${label.value || ''}`" />
                  </v-template>
                </RadListView>
              </StackLayout>
            </v-template>
          </RadListView>
        </TabViewItem>
      </TabView>
    </grid-layout>
  </Page>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { TYPES } from '../store/types';

export default {
  data() {
    return {
      physical: [],
      dimensions: [],
      manufacturers: [],
      operations: [],
    };
  },
  computed: {
    ...mapGetters({
      identifiedContainer: `${TYPES.modules.CORE}/${TYPES.getters.GET_IDENTIFIED_CONTAINER}`,
    }),
  },
  mounted() {
    console.log('data: ', this.identifiedContainer);
    this.physical = [
      {
        title: 'Group ST',
        labels: [
          {
            name: '',
            value: this.identifiedContainer.group_st,
          },
        ],
      },
      {
        title: 'Detail ST',
        labels: [
          {
            name: '',
            value: this.identifiedContainer.detail_st,
          },
        ],
      },
      {
        title: 'Tare weight',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.tare_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.tare_lbs,
          },
        ],
      },
      {
        title: 'Max payload',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.max_payload_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.max_payload_lbs,
          },
        ],
      },
      {
        title: 'Stacking',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.stacking_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.stacking_lbs,
          },
        ],
      },
      {
        title: 'Cubic capacity',
        labels: [
          {
            name: 'm3: ',
            value: this.identifiedContainer.cubic_capacity_cbm,
          },
          {
            name: 'cu ft: ',
            value: this.identifiedContainer.cubic_capacity_cuft,
          },
        ],
      },
      {
        title: 'Max gross mass',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.max_gross_mass_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.max_gross_mass_lbs,
          },
        ],
      },
      {
        title: 'Racking',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.racking_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.racking_lbs,
          },
          {
            name: 'Newton: ',
            value: this.identifiedContainer.racking_n,
          },
        ],
      },
    ];
    this.dimensions = [
      {
        title: 'External length',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.external_length_mm,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.external_length_ft,
          },
        ],
      },
      {
        title: 'External width',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.external_width_mm,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.external_width_ft,
          },
        ],
      },
      {
        title: 'External height',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.external_height_mm,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.external_height_ft,
          },
        ],
      },
      {
        title: 'Door opening width',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.stacking_kg,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.door_opening_width_mm,
          },
        ],
      },
      {
        title: 'Internal length',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.internal_length_mm,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.internal_length_ft,
          },
        ],
      },
      {
        title: 'Internal width',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.internal_width_mm,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.internal_width_ft,
          },
        ],
      },
      {
        title: 'Internal height',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.internal_height_mm,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.internal_height_ft,
          },
        ],
      },
      {
        title: 'Door opening height',
        labels: [
          {
            name: 'mm: ',
            value: this.identifiedContainer.door_opening_height_mm,
          },
          {
            name: 'ft: ',
            value: this.identifiedContainer.door_opening_height_ft,
          },
        ],
      },
    ];
    this.manufacturers = [
      {
        title: 'Manufacturer data',
        labels: [
          {
            name: 'Manufacturer: ',
            value: this.identifiedContainer.manufacturer,
          },
          {
            name: 'Manufacturer Contact: ',
            value: this.identifiedContainer.manufacture_number,
          },
          {
            name: 'Manufacturing Date: ',
            value: this.identifiedContainer.manufacture_date,
          },
        ],
      },
      {
        title: 'CSC plate',
        labels: [
          {
            name: 'CSC approval: ',
            value: this.identifiedContainer.csc_approval,
          },
        ],
      },
      {
        title: 'Customs plate',
        labels: [
          {
            name: 'Customs approval: ',
            value: this.identifiedContainer.customs_approval,
          },
          {
            name: 'Customs approval type: ',
            value: this.identifiedContainer.customs_approval_type,
          },
        ],
      },
      {
        title: 'Timber treatment plate',
        labels: [
          {
            name: 'Timber certificate: ',
            value: this.identifiedContainer.timber_treatment_approval,
          },
        ],
      },
    ];
    this.operations = [
      {
        title: 'Stacking',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.one_door_off_stacking_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.one_door_off_stacking_lbs,
          },
        ],
      },
      {
        title: 'Racking',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.one_door_off_racking_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.one_door_off_racking_lbs,
          },
        ],
      },
      {
        title: 'End wall strength',
        labels: [
          {
            name: 'Kgs: ',
            value: this.identifiedContainer.one_door_off_end_wall_strength_kg,
          },
          {
            name: 'Lbs: ',
            value: this.identifiedContainer.one_door_off_end_wall_strength_lbs,
          },
        ],
      },
    ];
  },
  methods: {},
};
</script>

<style scoped>
.card {
  background-color: #fff;
  color: #4d4d4d;
  margin: 15 15 0;
  border: 2px solid;
  border-radius: 100%;
}
.card-layout {
  border: 2px solid;
  border-radius: 100%;
}
.card-layout .h1 {
  margin-bottom: 15;
}
ActionBar {
  background-color: #049c88;
  color: #ffffff;
}
.about-tab {
  text-align: center;
}
</style>
