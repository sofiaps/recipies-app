<template>
  <ion-page>
    <TopNavbar />
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <RecipeListItem
          v-for="recipe in recipies"
          :key="recipe.id"
          :recipe="recipe"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';
import RecipeListItem from '@/components/RecipeListItem.vue';
import { defineComponent } from 'vue';
import { getCollection } from '@/firebase-services/getCollection';
import TopNavbar from '@/components/TopNavbar.vue';

export default defineComponent({
  setup() {
    const { documents: recipies } = getCollection('recipies');
    return { recipies };
  },
  components: {
    IonContent,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    RecipeListItem,
    TopNavbar,
  },
});
</script>

<style>
ion-list {
  padding-right: 0.5rem !important;
  padding-left: 0.5rem !important;
}
</style>
