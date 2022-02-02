<template>
  <ion-page>
    <TopNavbar :isDetails="true" />
    <ion-content :fullscreen="true">
      <DetailsForm  @cancelForm="cancelClicked" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import TopNavbar from '@/components/TopNavbar.vue';
import DetailsForm from '@/components/DetailsForm.vue';

export default defineComponent({
  setup() {
    const router = useRouter();

    const cancelClicked = () => {
        router.push({ name: 'Recipies' });
    }

    return { cancelClicked };
  },
  components: {
    IonPage,
    TopNavbar,
    IonContent,
    DetailsForm,
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
