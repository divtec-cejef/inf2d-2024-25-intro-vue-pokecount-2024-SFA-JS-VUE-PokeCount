    /**
 * Intro à vue.js
 * @author Steve Fallet
 * @date 2024-09-17
 */
const { createApp, ref } = Vue;

const app = createApp({
    setup() {
        // Datas
        const message = "Bienvenue dans PokeCount!";
        const compteur = ref(0);
        const capturesTab = ref([]);
        // Fonctions
        function capturer() {
            compteur.value += 1;
        }
        function sauver() {
            if (compteur.value > 0) {
                capturesTab.value.push(compteur.value);
                compteur.value = 0;
            }
        }
        // Retourne les objets dans le HTML
        return {
            message,
            compteur,
            capturer,
            capturesTab,
            sauver
        };
    }
}).mount("#poke-app");
