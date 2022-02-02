<template>
  <form @submit.prevent="submitForm">
    <ion-card>
      <ion-card-header>
        <h3>{{ title || 'New' }}</h3>
      </ion-card-header>

      <div class="preview-container">
        <ion-thumbnail v-if="previewImage">
          <ion-img :src="previewImage"></ion-img>
        </ion-thumbnail>
        <ion-input
          type="file"
          accept="image/png, image/jpeg"
          @change="handleChange"
        ></ion-input>
      </div>

      <ion-card-content>
        <ion-item>
          <ion-label position="stacked">Title</ion-label>
          <ion-input
            v-model="title"
            placeholder="Title"
            type="text"
            required
          ></ion-input>
        </ion-item>

        <AddIngredient
          ref="childRef"
          :ingredients="recipe?.ingredients || []"
        />

        <ion-item>
          <ion-label position="stacked">Instructions</ion-label>
          <ion-textarea
            rows="6"
            v-model="instructions"
            placeholder="Instructions"
            required
          ></ion-textarea>
        </ion-item>

        <div class="button-container">
          <ion-button
            color="light"
            shape="round"
            size="medium"
            type="button"
            @click.prevent="$emit('cancelForm')"
            >Cancel</ion-button
          >

          <ion-button color="dark" shape="round" size="medium" type="submit"
            >Submit</ion-button
          >
        </div>
      </ion-card-content>
    </ion-card>
  </form>
</template>

<script lang="ts">
import { getUser } from '@/firebase-services/getUser';
import { useCollection } from '@/firebase-services/useCollection';
import { useDocument } from '@/firebase-services/useDocument';
import { useStorage } from '@/firebase-services/useStorage';
import {
  IonItem,
  IonLabel,
  IonCardContent,
  IonCardHeader,
  IonInput,
  IonCard,
  IonButton,
  IonTextarea,
  IonThumbnail,
  IonImg,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import AddIngredient from './AddIngredient.vue';

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonInput,
    IonButton,
    IonTextarea,
    IonThumbnail,
    IonImg,
    AddIngredient,
  },
  props: {
    recipe: Object,
  },
  setup(props) {
    const childRef = ref<InstanceType<typeof AddIngredient>>();
    const title = ref(props.recipe?.title);
    const instructions = ref(props.recipe?.instructions);
    const previewImage = ref(props.recipe?.imageUrl);
    const file = ref(null);
    const fileError = ref(null);
    const { addDocument } = useCollection('recipies');
    const { user } = getUser();
    const router = useRouter();
    const { filePath, url, uploadImage } = useStorage();

    const handleChange = (e) => {
      const selected = e.target.files;
      if (selected && selected[0]) {
        file.value = selected[0];
        fileError.value = null;
        const reader = new FileReader();
        reader.onload = (ev) => {
          previewImage.value = ev.target.result;
        };
        reader.readAsDataURL(file.value);
      } else {
        file.value = null;
        fileError.value = 'Please select an image file (png or jpg)';
      }
    };

    const submitForm = async () => {
      const ingredients = childRef.value?.ingredientsArray;
      if (file.value) {
        await uploadImage(file.value);
      }
      if (!props.recipe?.id) {
        await addDocument({
          title: title.value,
          instructions: instructions.value,
          userUid: user.value.uid,
          imageUrl: url.value,
          filePath: filePath.value,
          ingredients,
        }).then((_) => {
          router.replace('/');
        });
      } else {
        const { updateDocument } = useDocument('recipies', props.recipe.id);
        await updateDocument({
          title: title.value,
          instructions: instructions.value,
          imageUrl: file.value ? url.value : props.recipe?.imageUrl,
          filePath: file.value ? filePath.value : props.recipe?.filePath,
          ingredients,
        }).then((_) => {
          router.replace('/');
        });
      }
    };

    return {
      title,
      instructions,
      handleChange,
      submitForm,
      previewImage,
      childRef,
    };
  },
});
</script>

<style>
.button-container {
  display: flex;
  justify-content: space-between;
}

.preview-container {
  padding-left: 16px;
}

.preview-container ion-thumbnail {
  margin-left: 16px;
}

.preview-container ion-img {
  object-fit: contain;
}
</style>
