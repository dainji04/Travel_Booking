<script setup>
import { useTemplateRef, ref, onMounted } from 'vue';

const load = useTemplateRef('load');
const img = useTemplateRef('img');
const h1 = useTemplateRef('h1');
const loading = onMounted(() => {
    setTimeout(() => {
        h1.value.style.display = 'none';
        img.value.style.display = 'none';
        load.value.style.animation = 'hidden .5s linear';
    }, 3500);
});
</script>

<template>
    <div
        ref="load"
        class="loading-screen"
        style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: orange;
        "
    >
        <img
            ref="img"
            class="loading"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/42ff5df0-7aa1-4318-bf6c-4f20b67e522a/dgq5evx-6e743336-b1d7-4f31-b911-44a6de2c4d43.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQyZmY1ZGYwLTdhYTEtNDMxOC1iZjZjLTRmMjBiNjdlNTIyYVwvZGdxNWV2eC02ZTc0MzMzNi1iMWQ3LTRmMzEtYjkxMS00NGE2ZGUyYzRkNDMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YS_cCkXrcqjnfPOZDM6e-ngsKN8QHixiwQN2KEri98k"
            alt=""
        />
        <h1 ref="h1">loading...</h1>
    </div>
</template>

<style>
.loading-screen {
    opacity: 1;
}

.loading {
    animation: identifier 2s linear infinite;
    width: 100px;
    height: 100px;
}

@keyframes hidden {
    0% {
        height: 120%;
        opacity: 1;
    }
    100% {
        opacity: 0;
        height: 0;
    }
}

@keyframes identifier {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
