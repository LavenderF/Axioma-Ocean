<script>
  import AxiomBuilder from './interfaces/forge/AxiomBuilder.svelte';
  import UniverseView from './interfaces/theoryverse/UniverseView.svelte';
  
  let activeTab = 'forge';
</script>

<main>
  <nav>
    <button class:active={activeTab === 'forge'} 
            on:click={() => activeTab = 'forge'}>
      公理熔炉
    </button>
    <button class:active={activeTab === 'universe'} 
            on:click={() => activeTab = 'universe'}>
      理论宇宙
    </button>
  </nav>
  
  {#if activeTab === 'forge'}
    <AxiomBuilder />
  {:else}
    <UniverseView />
  {/if}
</main>

<style>
  nav button.active {
    border-bottom: 2px solid var(--axiom-cyan);
  }
</style>
