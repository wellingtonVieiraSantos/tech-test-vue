 <script setup lang="ts">

 </script>

 <template>
    <div class="bg-white rounded-lg shadow-md flex flex-col">
        <header class="pb-2 w-full h-4/5 object-cover rounded-t-lg " data-slot="card-header">
            <slot name="header" />
        </header>
        <section class="py-2 border-t border-gray-200 text-4xl font-bold text-center" data-slot="card-content">
            <slot name="content" />
        </section>
        <footer class="pt-2 w-full h-1/5" data-slot="card-footer">
            <slot name="footer" />
        </footer>
    </div>
 </template>