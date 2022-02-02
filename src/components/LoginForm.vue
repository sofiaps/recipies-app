<template>
  <form @submit.prevent="handleLogin">
    <ion-card>
      <ion-card-header>
        <h3>Login</h3>
      </ion-card-header>

      <ion-card-content>
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
          >Login</ion-button
        >
      </ion-card-content>

      <div v-if="error">{{ error }}</div>
    </ion-card>
  </form>
</template>

<script lang="ts">
import { useLogin } from '@/firebase-services/useLogin';
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

    const { login, error } = useLogin();

    const router = useRouter();

    const handleLogin = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.replace('/');
      }
    };

    return { email, password, handleLogin, error };
  },
});
</script>
