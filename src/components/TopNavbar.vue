<template>
  <ion-header :translucent="true" v-if="user">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button v-if="isDetails" default-href="/"></ion-back-button>
        <ion-button v-if="!isDetails" :routerLink="'/recipe/new'">
          <ion-icon slot="icon-only" :icon="addCircleOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title class="p-0">Recipies</ion-title>

      <ion-buttons slot="end">
        <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
        {{ displayName }}
        <ion-button @click="handleLogout">
          <ion-icon slot="icon-only" :icon="logOut"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { getUser } from '@/firebase-services/getUser';
import { logOut, personCircle, addCircleOutline } from 'ionicons/icons';

import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { defineComponent, watch } from 'vue';
import { useLogout } from '@/firebase-services/useLogout';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TopNavbar',
  components: {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonTitle,
  },
  props: {
    isDetails: Boolean,
  },
  setup() {
    const { user, displayName } = getUser();
    const { logout, error } = useLogout();

    const router = useRouter();

    const handleLogout = async () => {
      await logout();

      if (error.value) {
        console.log('error trying to logout', error);
      }
    };

    watch(user, () => {
      if (!user.value) {
        router.replace({ name: 'Auth' });
      }
    });

    return {
      logOut,
      personCircle,
      addCircleOutline,
      user,
      displayName,
      handleLogout,
    };
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

.p-0 {
  padding: 0;
}
</style>
