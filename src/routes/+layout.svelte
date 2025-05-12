<!-- src/routes/+layout.svelte -->
<script lang="ts">
   import { pwaInfo } from 'virtual:pwa-info'; 
   import { pwaAssetsHead } from 'virtual:pwa-assets/head';
   import Header from '$lib/cmp/Header.svelte'
    let { children } = $props();
    //$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' 
    let pwaDerivedInfo = $derived(pwaInfo);
    let webManifestLink=$state('');
    let themeColor=$derived(pwaAssetsHead.themeColor);
    let links=$derived(pwaAssetsHead.links);

    $effect(() => {
      webManifestLink=pwaDerivedInfo ? pwaDerivedInfo.webManifest.linkTag : ''
    });

   </script> 
     
   <svelte:head>
    <title>test</title> 
    {@html webManifestLink}
    {#if themeColor}
    <meta name="theme-color" content={themeColor.content} />
    {/if}
    {#each links as link}
	    <link {...link} />
	  {/each}
     <link
     rel="stylesheet"
     href="app.css"
   >  
   <link rel="dns-prefetch" href="https://fonts.googleapis.com">
     <link rel="dns-prefetch" href="https://fonts.gstatic.com">
 
     <link rel="preconnect" crossorigin="anonymous" href="https://fonts.googleapis.com">
     <link rel="preconnect" crossorigin="anonymous" href="https://fonts.gstatic.com">
     <link rel="stylesheet" crossorigin="anonymous" href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" />
 
   </svelte:head>
   <Header sticky>
    <nav>
      <ul>
        <li><strong>Starter App</strong></li>
      </ul>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Products</a></li>
      </ul>
    </nav>
   </Header>
 <main>
     {@render children()}
 
 </main>
 {#await import('$lib/reloadPrompt.svelte') then { default: ReloadPrompt}}
  <ReloadPrompt />
{/await}
 