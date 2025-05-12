<script lang="ts">
 let { children,sticky=false } = $props();
</script>
<header class:sticky>
    <div class="container">
        {@render children()}

    </div>
</header>
<style lang="scss">
    header {
        background-color: var(--pico-color-slate-950);
    }
    header.sticky {
        width:100% !important;
        z-index: 2;
        position: sticky;
        padding:1rem !important;
        top: 0;
        -webkit-backdrop-filter: blur(1rem);
        backdrop-filter: blur(1rem);
        transition: border-top-color .4s ease-in-out, box-shadow .4s ease-in-out;
    }
    
</style>


