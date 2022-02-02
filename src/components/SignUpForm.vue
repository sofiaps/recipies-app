<template>
  <form @submit.prevent="handleSignUp">
    <ion-card>
      <ion-card-header>
        <h3>Sign up</h3>
      </ion-card-header>

      <ion-card-content>
        <ion-item>
          <ion-label position="stacked">Display Name</ion-label>
          <ion-input
            v-model="displayName"
            placeholder="name"
            type="text"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input
            v-model="email"
            placeholder="email"
            type="email"
            required
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Password</ion-label>
          <ion-input
            type="password"
            v-model="password"
            placeholder="password"
            required
          ></ion-input>
        </ion-item>
        <ion-button color="dark" shape="round" expand="block" type="submit"
          >Signup</ion-button
        >
      </ion-card-content>
      <div v-if="error">{{ error }}</div>
    </ion-card>
  </form>
</template>

<script lang="ts">
import { useSignUp } from '@/firebase-services/useSignUp';
import {
  IonItem,
  IonLabel,
  IonCardContent,
  IonCardHeader,
  IonInput,
  IonCard,
  IonButton,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonInput,
    IonButton,
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const displayName = ref('');

    const { signup, error } = useSignUp();

    const router = useRouter();

    const handleSignUp = async () => {
      await signup(email.value, password.value, displayName.value).then(() => {
        router.replace('/');
      });
    };

    return { email, password, handleSignUp, error, displayName };
  },
});
</script>
