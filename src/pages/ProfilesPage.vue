<template>
  <q-page padding>
    <!-- content -->
    <div>
      <p class="text-h6">
        Profiles
      </p>
      <p>Manage your bullet profiles.</p>
      <q-btn
        icon="add"
        rounded
        class="q-mt-sm"
        color="primary"
        @click="newProfileDialog=true"
      >
        Add new profile
      </q-btn>
      <div class="row">
        <q-card
          class="col-sm q-mt-md"
          padding
          bordered
          style="max-width: 320px;"
        >
          <q-card-section>
            <div class="text-h6">
              AR15 16''
            </div>
            <div>
              Trijicon ACOG
            </div>
            <div>3.5 in height over bore</div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-icon
                    name="scale"
                    size="md"
                  />
                </q-item-section>
                <q-item-section class="text-bold">
                  55 gr
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-icon
                    name="speed"
                    size="md"
                  />
                </q-item-section>
                <q-item-section class="text-bold">
                  2735 FPS
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-icon
                    name="moving"
                    size="md"
                  />
                </q-item-section>
                <q-item-section class="text-bold">
                  0.321 G1
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog
      v-model="newProfileDialog"
      persistent
      medium-width
    >
      <q-card
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section
          class="row items-center q-pb-none"
        >
          <div class="text-h6">
            Add new profile
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          Enter your bullet and rifle data.
        </q-card-section>

        <q-card-section class="q-mt-sm">
          <q-form>
            <q-input
              label="Weapon"
              filled
              type="text"
              class="q-mb-md"
            />
            <q-input
              label="Optic"
              filled
              type="text"
            />
            <div class="row q-mt-md">
              <div class="col-xs-6 col-sm-9">
                <q-input
                  label="Optic height"
                  filled
                  type="number"
                  class=""
                />
              </div>
              <div class="col-xs-6 col-sm-3 flex items-center q-pl-sm">
                <q-btn-toggle
                  v-model="opticHeightUnit"
                  no-caps
                  :options="[
                    {label: 'inch', value: 'in'},
                    {label: 'cm', value: 'cm'}
                  ]"
                />
              </div>
            </div>

            <q-separator
              class="q-mt-md"
            />

            <div class="row q-mt-md">
              <div class="col-xs-6 col-sm-9">
                <q-input
                  label="Bullet weight"
                  filled
                  type="number"
                  class=""
                />
              </div>
              <div class="col-xs-6 col-sm-3 flex items-center q-pl-sm">
                <q-btn-toggle
                  v-model="bulletWeightUnit"
                  no-caps
                  :options="[
                    {label: 'grains', value: 'gr'},
                    {label: 'grams', value: 'g'}
                  ]"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-xs-6 col-sm-9">
                <q-input
                  label="Velocity"
                  filled
                  type="number"
                />
              </div>
              <div class="col-xs-6 col-sm-3 flex items-center q-pl-sm">
                <q-btn-toggle
                  v-model="velocityUnit"
                  no-caps
                  :options="[
                    {label: 'FPS', value: 'fps'},
                    {label: 'm/s', value: 'ms'}
                  ]"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-xs-6 col-sm-9">
                <q-input
                  label="Ballistic coefficient"
                  filled
                  type="number"
                />
              </div>
              <div class="col-xs-6 col-sm-3 flex items-center q-pl-sm">
                <q-btn-toggle
                  v-model="ballisticCoefficientProfile"
                  no-caps
                  :options="[
                    {label: 'G1', value: 'g1'},
                    {label: 'G7', value: 'g7'}
                  ]"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions
          align="right"
        >
          <q-btn
            v-close-popup
            flat
            label="Add"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  // name: 'PageName',
  data: function () {
    return {
      newProfileDialog: false,
      opticHeightUnit: 'in',
      bulletWeightUnit: 'gr',
      velocityUnit: 'fps',
      ballisticCoefficientProfile: 'g1'
    }
  }

}
</script>
