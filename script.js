    /**
 * Intro à vue.js
 * @author Steve Fallet
 * @date 2024-09-17
 */
const { createApp, ref, computed, onMounted, watch, useTemplateRef } = Vue;

const app = createApp({
    setup() {
        // Datas
        let message = "Bienvenue dans PokeCount!";
        // Toujours utiliser const pour les variables réactives
        const compteur = ref(0);
        const capturesTab = ref([]);
        const ilFautSauvegarder = ref(false);

        // Objets HTML
        const inputCapture = useTemplateRef("inputCapture");

        // Fonctions
        function capturer() {
            // Si compteur n'est PAS un nombre
            if (isNaN(compteur.value)) {
                compteur.value = 1;
                return;
            }

            compteur.value += 1;
        }
        function sauver() {
            if (!isNaN(compteur.value) && compteur.value > 0) {
                capturesTab.value.push(compteur.value);
                localStorage.setItem('captures', JSON.stringify(capturesTab.value));
                compteur.value = 0;
                inputCapture.value.focus()
            }
        }
        function verifierAvantDeQuitter(event) {
            console.log(event.target.tagName)
                const confirmation = confirm("Avez-vous bien sauvegardé vos captures ?");
            if (confirmation) {
                window.location.href = event.target.href;
            }
        }

        // Propriété calculée qui - retourne le total de Pokémons capturés
        const totalPokemons = computed(() => {
            console.log("COUCOU")
            return capturesTab.value.reduce((total, capture) => total + capture, 0);
        });

        // Watcher - surveillance de données
        watch(compteur, (newVal) => {
            ilFautSauvegarder.value = newVal > 5;
        });

        // Cycle de vie du composant
        // A l'affichage
        onMounted(() => {
            const savedCaptures = JSON.parse(localStorage.getItem('captures'));
            if (savedCaptures) capturesTab.value = savedCaptures;
        });

        // Retourne les objets dans le HTML
        return {
            message,
            compteur,
            capturer,
            capturesTab,
            sauver,
            totalPokemons,
            ilFautSauvegarder,
            verifierAvantDeQuitter,
            inputCapture
        };
    }
}).mount("#poke-app");
