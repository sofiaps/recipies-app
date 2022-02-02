<template>
  <ion-page>
    <TopNavbar :isDetails="true" />
    <ion-content :fullscreen="true">
      <ion-item-group v-if="inEditMode">
        <DetailsForm :recipe="recipe" @cancelForm="cancelClicked" />
      </ion-item-group>
      <ion-item-group v-else>
        <DetailsView
          :recipe="recipe"
          @changeEditMode="inEditMode = !inEditMode"
        />
      </ion-item-group>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { IonContent, IonItemGroup, IonPage } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import TopNavbar from '@/components/TopNavbar.vue';
import DetailsForm from '@/components/DetailsForm.vue';
import DetailsView from '@/components/DetailsView.vue';
import { getDocument } from '@/firebase-services/getDocument';

export default defineComponent({
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const inEditMode = ref(false);
    const { error, document: recipe } = getDocument('recipies', id);
    const cancelClicked = () => {
      inEditMode.value = false;
    };

    return { inEditMode, recipe, cancelClicked };
  },
  components: {
    IonPage,
    TopNavbar,
    IonItemGroup,
    IonContent,
    DetailsForm,
    DetailsView,
  },
});
</script>

<style scoped>
ion-item {
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

ion-item h2 {
  font-weight: 600;
}

ion-item .date {
  float: right;
  align-items: center;
  display: flex;
}

ion-item ion-icon {
  font-size: 42px;
  margin-right: 8px;
}

ion-item ion-note {
  font-size: 15px;
  margin-right: 12px;
  font-weight: normal;
}

h1 {
  margin: 0;
  font-weight: bold;
  font-size: 22px;
}

p {
  line-height: 22px;
}
</style>
