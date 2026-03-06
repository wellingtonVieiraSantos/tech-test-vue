 <script setup lang="ts">

 </script>

 <template>
    <div class="bg-white rounded-lg shadow flex flex-col overflow-hidden">
        <header class="pb-2 w-full object-cover rounded-t-lg flex-auto" data-slot="card-header">
            <slot name="header" />
        </header>
        <section class="py-2 text-4xl font-bold text-center" data-slot="card-content">
            <slot name="content" />
        </section>
        <footer class="pt-2 w-full flex-1" data-slot="card-footer">
            <slot name="footer" />
        </footer>
    </div>
 </template>