<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte'
	const {
		needRefresh,
		updateServiceWorker,
		offlineReady
	} = useRegisterSW({
		onRegistered(r) {
		// uncomment following code if you want check for updates
		r && setInterval(() => {
	        console.log('Checking for sw update',r)
            r.update()
		}, 20000 /* 20s for testing purposes */)
			console.log(`SW Registered: `,r);
            console.log($needRefresh);
            console.log($offlineReady);

		},
		onRegisterError(error) {
			console.log('SW registration error', error)
		},
	})
	const close = () => {
		offlineReady.set(false)
		needRefresh.set(false)
	}
    let toast=$state(false);
    $effect(()=>{
        if (typeof window !== 'undefined'){
            toast=$needRefresh;
        console.log(toast);
        console.log("hey",{refresh:$needRefresh});
        }
      
    })
   /// $inspect("hey",toast);

	//$: toast = $offlineReady || $needRefresh
</script>

{#if toast}
	<article class="pwa-toast" role="alert">
        <header>
            New Version Available.
        </header>
        <div class="message"> 
            <span>
            Click on reload button to update to new version.
            </span>
        </div>
		{#if $needRefresh}
			<button onclick={() => updateServiceWorker(true)}>
				Reload
			</button>
		{/if}
		<button onclick={close}>
			Close
		</button>
	</article>
{/if}

<style>
	.pwa-toast {
		position: fixed;
		right: 0;
		bottom: 0;
		margin: 16px;
		border: 1px solid #8885;
		border-radius: 4px;
		z-index: 2;
		text-align: left;
		box-shadow: 3px 4px 5px 0 #8885;
	}
    .pwa-toast header {
        padding:inherit !important;
    }
	.pwa-toast .message {
		margin-bottom: 8px;
	}
	.pwa-toast button {
		border: 1px solid #8885;
		outline: none;
		margin-right: 5px;
		border-radius: 2px;
		padding: 3px 10px;
	}
</style>