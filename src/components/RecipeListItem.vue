<template>
  <ion-item
    v-if="recipe"
    :routerLink="'/recipe/' + recipe.id"
    :detail="false"
    class="list-item"
  >
    <ion-thumbnail class="list-item__thumbnail">
      <ion-img v-if="recipe?.imageUrl" :src="recipe.imageUrl"></ion-img>
      <ion-icon v-else :icon="imageOutline"></ion-icon>
    </ion-thumbnail>
    <ion-label>{{ recipe.title }}</ion-label>
    <ion-button color="danger" @click.prevent="deleteRecipe">
      <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
    </ion-button>
  </ion-item>
</template>

<script lang="ts">
import {
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonIcon,
  IonImg,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { trashOutline, imageOutline } from 'ionicons/icons';
import { useDocument } from '@/firebase-services/useDocument';
import { useStorage } from '@/firebase-services/useStorage';

export default defineComponent({
  name: 'RecipeListItem',
  components: {
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonImg,
  },
  props: {
    recipe: Object,
  },
  setup(props) {
    const { deleteDocument } = useDocument('recipies', props.recipe.id);
    const { deleteImage } = useStorage();

    const deleteRecipe = async () => {
      await deleteDocument();
      if(props.recipe?.filePath) {
        await deleteImage(props.recipe.filePath);
      }
    };

    return { trashOutline, imageOutline, deleteRecipe };
  },
});
</script>

<style scoped>
.list-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  cursor: pointer;
}

.list-item ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

.list-item h2 {
  font-weight: 600;
  margin: 0;
}

.list-item p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
}

.list-item .date {
  float: right;
  align-items: center;
  display: flex;
}

.list-item ion-note {
  font-size: 15px;
  margin-right: 8px;
  font-weight: normal;
}

.list-item ion-note.md {
  margin-right: 14px;
}

.list-item .dot {
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  align-self: start;
  margin: 16px 10px 16px 16px;
}

.list-item .dot-unread {
  background: var(--ion-color-primary);
}

.list-item ion-img {
  object-fit: contain;
}

.list-item__thumbnail {
  position: relative;
  margin-right: 16px;
}

.list-item__thumbnail ion-icon {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
