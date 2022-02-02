<template>
  <ion-card class="details-view">
    <ion-card-header>
      <div>
        <ion-icon :icon="pencil" @click="$emit('changeEditMode')"></ion-icon>
      </div>
      <ion-thumbnail v-if="recipe?.imageUrl">
        <ion-img :src="recipe.imageUrl"></ion-img>
      </ion-thumbnail>
      <ion-card-title>{{ recipe?.title || 'New' }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <ion-list v-if="recipe?.ingredients?.length">
        <ion-list-header class="pl-0">Ingredients</ion-list-header>

        <ion-item v-for="ingredient in recipe.ingredients" :key="ingredient.id">
          <ion-label
            ><b>{{ ingredient.qnt }}</b> {{ ingredient.name }}</ion-label
          >
        </ion-item>
      </ion-list>

      <h2><b>Instructions</b></h2>
      <p>{{ recipe?.instructions }}</p>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonIcon,
  IonCardTitle,
  IonThumbnail,
  IonImg,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { pencil } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonIcon,
    IonCardTitle,
    IonThumbnail,
    IonImg,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
  },
  props: {
    recipe: Object,
  },
  setup() {
    return { pencil };
  },
});
</script>

<style>
.details-view ion-card-header div {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.details-view ion-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.details-view ion-thumbnail {
  width: 100%;
  height: 150px;
}

.details-view ion-img {
  object-fit: contain;
}

</style>
