<template>
  <ion-list>
    <ion-list-header class="pl-0"
      >Ingredients
      <ion-button color="dark" size="small" @click.prevent="addItem">
        <ion-icon slot="icon-only" :icon="addCircleOutline"></ion-icon>
      </ion-button>
    </ion-list-header>
    <ion-item-group
      v-for="ingredient in ingredientsArray"
      :key="ingredient.id"
      class="ingredient-group"
    >
      <ion-item>
        <ion-label position="floating">Qnt.</ion-label>
        <ion-input v-model="ingredient.qnt" placeholder="Quantity"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Name</ion-label>
        <ion-input v-model="ingredient.name" placeholder="Name"></ion-input>
      </ion-item>
      <ion-button
        @click.prevent="removeItem(ingredient.id)"
        color="danger"
        size="small"
      >
        <ion-icon slot="icon-only" :icon="removeCircleOutline"></ion-icon>
      </ion-button>
    </ion-item-group>
  </ion-list>
</template>

<script lang="ts">
import {
  IonItem,
  IonList,
  IonListHeader,
  IonLabel,
  IonItemGroup,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '@/Interfaces/IIngredient';

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonListHeader,
    IonLabel,
    IonItemGroup,
    IonInput,
    IonButton,
    IonIcon,
  },
  props: {
    ingredients: Array,
    getIngredients: Function,
  },
  setup(props) {
    const ingredientsArray = ref<IIngredient[]>(props.ingredients as IIngredient[]);
    const addItem = () => {
      const newItem: IIngredient = {
        id: uuidv4(),
        qnt: '',
        name: '',
      };

      ingredientsArray.value = [...ingredientsArray.value, newItem];
    };

    const removeItem = (id) => {
      ingredientsArray.value = ingredientsArray.value.filter((v) => v.id !== id);
    };
    return {
      removeCircleOutline,
      addCircleOutline,
      ingredientsArray,
      addItem,
      removeItem,
    };
  },
});
</script>

<style>
.ingredient-group {
  display: grid;
  grid-template-areas: 'quantity name btn';
  grid-gap: 1em;
  grid-template-columns: 1fr 2.5fr auto;
  align-items: center;
}

</style>
