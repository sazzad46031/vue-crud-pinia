<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
    <div class="navbar bg-blue-300">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">Navbar</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <RouterLink to="/">
                    <li>Home</li>
                </RouterLink>
            </ul>
        </div>
    </div>
</template>